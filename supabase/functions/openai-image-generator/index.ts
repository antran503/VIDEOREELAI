// @ts-nocheck
/// <reference types="https://deno.land/x/deno/cli/types/deno.d.ts" />

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const OPENAI_API_URL = 'https://api.openai.com/v1/images/generations';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Get the user's prompt from the request body
    const { prompt } = await req.json();
    if (!prompt) {
      throw new Error("Prompt is required.");
    }

    // 2. Create a Supabase client with the service role key to access user profiles
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 3. Get the user's JWT from the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Authorization header is missing.");
    }
    const jwt = authHeader.replace('Bearer ', '');

    // 4. Get the user from the JWT
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(jwt);
    if (userError || !user) {
      throw new Error(`Authentication error: ${userError?.message || 'User not found.'}`);
    }

    // 5. Fetch the user's OpenAI API key from their profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('openai_api_key')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || !profile.openai_api_key) {
      throw new Error(`Failed to retrieve OpenAI API key from profile: ${profileError?.message || 'Key not found.'}. Please set it in the Settings page.`);
    }
    const openaiApiKey = profile.openai_api_key;

    // 6. Call the OpenAI DALL-E API
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3", // or "dall-e-2"
        prompt: prompt,
        n: 1,
        size: "1024x1024", // or "1792x1024", "1024x1792" for dall-e-3
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("OpenAI API Error:", errorBody);
      throw new Error(`OpenAI API request failed: ${errorBody.error.message}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    if (!imageUrl) {
      throw new Error("Image URL not found in OpenAI response.");
    }

    // 7. Return the generated image URL
    return new Response(JSON.stringify({ imageUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in Edge Function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});