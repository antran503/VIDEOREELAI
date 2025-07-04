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

interface CredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  integrationName: string;
  onConnect: (email: string, pass: string) => void;
}

const CredentialsModal = ({ open, onOpenChange, integrationName, onConnect }: CredentialsModalProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleConnectClick = () => {
    if (email && password) {
      onConnect(email, password);
      onOpenChange(false);
      setEmail("");
      setPassword("");
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-400 block mb-2">Email Address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="Enter Email" />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-400 block mb-2">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="Password" />
          </div>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end rounded-b-lg">
          <Button onClick={handleConnectClick} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CredentialsModal;