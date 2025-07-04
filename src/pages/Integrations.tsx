import { Button } from "@/components/ui/button";
import { integrations } from "@/data/integrations";

const Integrations = () => (
  <div className="animate-in fade-in-50">
    <h1 className="text-3xl font-bold text-white mb-1">Integrations</h1>
    <p className="text-gray-400 mb-6">Manage Account</p>
    <div className="space-y-4 max-w-3xl">
      {integrations.map(item => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="bg-[#1C1C22] p-4 rounded-lg border border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color+'20' }}>
                <Icon className="h-6 w-6" style={{ color: item.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white font-semibold">Connect</Button>
          </div>
        );
      })}
    </div>
  </div>
);

export default Integrations;