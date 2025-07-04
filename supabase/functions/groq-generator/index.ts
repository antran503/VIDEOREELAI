/// <reference types="https://deno.land/x/deno/cli/types/deno.d.ts" />

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Groq } from "npm:groq-sdk";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, userApiKey } = await req.json();

    if (!prompt) {
      throw new Error("Prompt is required.");
    }
    if (!userApiKey) {
      throw new Error("Groq API key is required.");
    }

    const groq = new Groq({ apiKey: userApiKey });

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192", // You can change this to other models like 'mixtral-8x7b-32768'
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("Error in Groq Edge Function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});