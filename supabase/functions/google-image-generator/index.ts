/// <reference types="https://deno.land/x/deno/cli/types/deno.d.ts" />

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// IMPORTANT: This is a placeholder for Google's actual image generation API endpoint.
// You may need to update this URL based on the specific Google service you are using (e.g., Vertex AI, Imagen).
const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'; // This is for text, you'll need to find the correct image generation endpoint.

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
    // 1. Get the Google API Key from the secure environment variables
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    if (!googleApiKey) {
      throw new Error("Google API key not found in Supabase secrets.");
    }

    // 2. Get the user's prompt from the request body
    const { prompt } = await req.json();
    if (!prompt) {
      throw new Error("Prompt is required.");
    }

    // 3. Call the Google API
    // NOTE: The structure of this payload will depend on Google's specific API.
    const response = await fetch(`${GOOGLE_API_URL}?key=${googleApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Example for Gemini Text API. You need to adapt this for an Image API.
        "contents": [{
            "parts": [{
                "text": `Create a photorealistic image of: ${prompt}`
            }]
        }]
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google API Error:", errorBody);
      throw new Error(`Google API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data from Google API:", JSON.stringify(data, null, 2));

    // 4. Attempt to find an image URL in the response.
    // THIS IS A GUESS. The actual path depends on the specific Google Image API response.
    // We will log the full `data` object to help find the correct path.
    const placeholderImageUrl = "https://i.imgur.com/9yV4aG2.png";
    const imageUrl = data?.imageUrl || data?.images?.[0]?.url || data?.data?.[0]?.url || placeholderImageUrl;

    if (imageUrl === placeholderImageUrl) {
      console.warn("Could not find a valid image URL in the Google API response. Using placeholder image.");
    } else {
      console.log("Successfully extracted image URL:", imageUrl);
    }

    return new Response(JSON.stringify({ imageUrl: imageUrl }), {
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