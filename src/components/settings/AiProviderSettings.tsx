import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { showLoading, dismissToast, showSuccess, showError } from "@/utils/toast";
import { Loader2 } from "lucide-react";

const AiProviderSettings = () => {
  const [provider, setProvider] = React.useState("openai");
  const [groqApiKey, setGroqApiKey] = React.useState("");
  const [openaiApiKey, setOpenaiApiKey] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('ai_provider, groq_api_key, openai_api_key')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          showError("Could not load your AI settings.");
        } else if (data) {
          setProvider(data.ai_provider || 'openai');
          setGroqApiKey(data.groq_api_key || '');
          setOpenaiApiKey(data.openai_api_key || '');
        }
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = showLoading("Saving settings...");
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          ai_provider: provider,
          groq_api_key: groqApiKey,
          openai_api_key: openaiApiKey,
        })
        .eq('id', user.id);

      if (error) {
        dismissToast(toastId);
        showError(`Failed to save settings: ${error.message}`);
      } else {
        dismissToast(toastId);
        showSuccess("AI settings saved successfully!");
      }
    } else {
      dismissToast(toastId);
      showError("You must be logged in to save settings.");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <Card className="bg-[#1C1C22] border-gray-700 text-white max-w-2xl">
      <CardHeader>
        <CardTitle>AI Provider Configuration</CardTitle>
        <CardDescription>
          Choose your preferred AI model for content generation and provide the necessary API keys.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="ai-provider">AI Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger id="ai-provider" className="w-[280px] bg-[#2A2A33] border-gray-600">
              <SelectValue placeholder="Select a provider" />
            </SelectTrigger>
            <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="groq">Groq</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="groq-key">Groq API Key</Label>
          <Input
            id="groq-key"
            type="password"
            value={groqApiKey}
            onChange={(e) => setGroqApiKey(e.target.value)}
            placeholder="gsk_..."
            className="bg-[#2A2A33] border-gray-600"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="openai-key">OpenAI API Key</Label>
          <Input
            id="openai-key"
            type="password"
            value={openaiApiKey}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            placeholder="sk-..."
            className="bg-[#2A2A33] border-gray-600"
          />
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="bg-gradient-to-r from-pink-500 to-purple-500">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiProviderSettings;