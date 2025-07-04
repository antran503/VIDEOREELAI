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

interface AddApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (service: string, name: string, key: string) => void;
}

const AddApiKeyModal = ({ open, onOpenChange, onSave }: AddApiKeyModalProps) => {
  const [service, setService] = React.useState("");
  const [name, setName] = React.useState("");
  const [apiKey, setApiKey] = React.useState("");

  const handleSaveClick = () => {
    if (service && name && apiKey) {
      onSave(service, name, apiKey);
      onOpenChange(false);
      setService("");
      setName("");
      setApiKey("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-md p-0 rounded-lg">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Add New API Key</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="service" className="text-sm font-medium text-gray-400 block mb-2">Service (e.g., OpenAI)</Label>
            <Input id="service" value={service} onChange={(e) => setService(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="Service Name" />
          </div>
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-400 block mb-2">Key Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="e.g., My Personal Key" />
          </div>
          <div>
            <Label htmlFor="api-key" className="text-sm font-medium text-gray-400 block mb-2">API Key</Label>
            <Input id="api-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="Enter your API key" />
          </div>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end rounded-b-lg">
          <Button onClick={handleSaveClick} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddApiKeyModal;