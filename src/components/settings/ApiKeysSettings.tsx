import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import AddApiKeyModal from "./AddApiKeyModal";
import { showSuccess } from "@/utils/toast";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: string;
}

const initialApiKeys: ApiKey[] = [
  { id: '1', name: 'My OpenAI Key', key: 'sk-******************...**weI8', service: 'OpenAI' },
  { id: '2', name: 'ElevenLabs Main', key: 'el-******************...**9zX4', service: 'ElevenLabs' },
  { id: '3', name: 'Runware API Key', key: 'BoC1************************aEN7', service: 'Runware' },
];

const ApiKeysSettings = () => {
  const [apiKeys, setApiKeys] = React.useState(initialApiKeys);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddApiKey = (service: string, name: string, key: string) => {
    const newKey = {
      id: Date.now().toString(),
      service,
      name,
      key: `${key.substring(0, 4)}...${key.substring(key.length - 4)}`,
    };
    setApiKeys(prev => [...prev, newKey]);
    showSuccess(`API Key for ${service} has been added.`);
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
    showSuccess("API Key has been deleted.");
  };

  return (
    <>
      <AddApiKeyModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleAddApiKey}
      />
      <Card className="bg-[#1C1C22] border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage API Keys</CardTitle>
          <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-pink-500 to-purple-500">
            <Plus className="mr-2 h-4 w-4" /> Add New Key
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map(key => (
              <div key={key.id} className="flex items-center justify-between p-4 bg-[#2A2A33] rounded-lg">
                <div>
                  <p className="font-semibold">{key.name} <span className="text-xs text-gray-400 ml-2">({key.service})</span></p>
                  <p className="text-sm text-gray-500 font-mono">{key.key}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteApiKey(key.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {apiKeys.length === 0 && (
              <p className="text-center text-gray-500 py-8">No API keys added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ApiKeysSettings;