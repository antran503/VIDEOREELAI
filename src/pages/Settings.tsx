import ApiKeysSettings from "@/components/settings/ApiKeysSettings";
import AiProviderSettings from "@/components/settings/AiProviderSettings";
import PromptsSettings from "@/components/settings/PromptsSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="animate-in fade-in-50">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg bg-[#1C1C22] border border-gray-700">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="prompts">My Prompts</TabsTrigger>
          <TabsTrigger value="ai-provider">AI Provider</TabsTrigger>
        </TabsList>
        <TabsContent value="api-keys" className="mt-6">
          <ApiKeysSettings />
        </TabsContent>
        <TabsContent value="prompts" className="mt-6">
          <PromptsSettings />
        </TabsContent>
        <TabsContent value="ai-provider" className="mt-6">
          <AiProviderSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;