import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integrationName: string;
  onConnect: (name: string, apiKey: string) => void;
}

const ApiKeyModal = ({ open, onOpenChange, integrationName, onConnect }: ApiKeyModalProps) => {
  const [name, setName] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");

  const handleConnectClick = () => {
    if (name && apiKey) {
      onConnect(name, apiKey);
      onOpenChange(false);
      setName("");
      setApiKey("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-md p-0 rounded-lg">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{integrationName}</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-400 block mb-2">Enter Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="Enter Name" />
          </div>
          <div>
            <Label htmlFor="api-key" className="text-sm font-medium text-gray-400 block mb-2">Enter API Key</Label>
            <Input id="api-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="Enter API Key" />
          </div>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end rounded-b-lg">
          <Button onClick={handleConnectClick} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;