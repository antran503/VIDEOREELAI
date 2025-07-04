import { supabase } from '@/integrations/supabase/client';

/**
 * Generates an image from a prompt by calling a secure Supabase Edge Function for OpenAI DALL-E.
 * @param prompt - The text description of the image to generate.
 * @returns A promise that resolves to the URL of the generated image.
 */
export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  console.log(`Requesting DALL-E image generation for prompt: "${prompt}"`);

  const { data, error } = await supabase.functions.invoke('openai-image-generator', {
    body: { prompt },
  });

  if (error) {
    console.error("Error invoking Supabase function:", error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }

  if (data.error) {
    console.error("Error from Edge Function:", data.error);
    throw new Error(`Failed to generate image: ${data.error}`);
  }

  if (!data.imageUrl) {
    console.error("Invalid response from function:", data);
    throw new Error("Function did not return a valid image URL.");
  }
  
  console.log(`Received image URL: ${data.imageUrl}`);
  return data.imageUrl;
};