import * as React from "react";
import { Button } from "@/components/ui/button";
import { integrations as initialIntegrations } from "@/data/integrations";
import { showSuccess, showLoading, dismissToast } from "@/utils/toast";
import ApiKeyModal from "@/components/integrations/ApiKeyModal";
import CredentialsModal from "@/components/integrations/CredentialsModal";

type Integration = typeof initialIntegrations[0];

const Integrations = () => {
  const [integrations, setIntegrations] = React.useState(initialIntegrations);
  const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = React.useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = React.useState(false);

  const handleConnectClick = (integration: Integration) => {
    setSelectedIntegration(integration);
    switch (integration.id) {
      case 'facebook':
      case 'youtube':
        // Mô phỏng quy trình OAuth
        const toastId = showLoading(`Connecting to ${integration.name}...`);
        setTimeout(() => {
          setIntegrations(prev =>
            prev.map(item =>
              item.id === integration.id ? { ...item, connected: true } : item
            )
          );
          dismissToast(toastId);
          showSuccess(`Successfully connected to ${integration.name}!`);
        }, 2000);
        break;
      case 'elevenlabs':
        setIsApiKeyModalOpen(true);
        break;
      case 'syvid':
      case 'sonority':
      case 'videoreel':
        setIsCredentialsModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDisconnectClick = (integrationId: string) => {
    setIntegrations(prev =>
      prev.map(item =>
        item.id === integrationId ? { ...item, connected: false } : item
      )
    );
    const integrationName = initialIntegrations.find(i => i.id === integrationId)?.name;
    if (integrationName) {
      showSuccess(`Disconnected from ${integrationName}.`);
    }
  };

  const handleModalConnect = () => {
    if (selectedIntegration) {
      setIntegrations(prev =>
        prev.map(item =>
          item.id === selectedIntegration.id ? { ...item, connected: true } : item
        )
      );
      showSuccess(`Successfully connected to ${selectedIntegration.name}!`);
    }
  };

  return (
    <>
      <ApiKeyModal
        open={isApiKeyModalOpen}
        onOpenChange={setIsApiKeyModalOpen}
        integrationName={selectedIntegration?.name || ''}
        onConnect={handleModalConnect}
      />
      <CredentialsModal
        open={isCredentialsModalOpen}
        onOpenChange={setIsCredentialsModalOpen}
        integrationName={selectedIntegration?.name || ''}
        onConnect={handleModalConnect}
      />

      <div className="animate-in fade-in-50">
        <h1 className="text-3xl font-bold text-white mb-1">Integrations</h1>
        <p className="text-gray-400 mb-6">Manage Account</p>
        <div className="space-y-4 max-w-3xl">
          {integrations.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-[#1C1C22] p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + '20' }}>
                    <Icon className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
                {item.connected ? (
                  <Button
                    variant="outline"
                    className="border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-semibold"
                    onClick={() => handleDisconnectClick(item.id)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleConnectClick(item)}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
                  >
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Integrations;