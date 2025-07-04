import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { languages } from "@/data/languages";
import { accents } from "@/data/accents";

interface AddVoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: { name: string; image: string } | null;
}

const AddVoiceModal = ({ open, onOpenChange }: AddVoiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4 relative">
          <DialogTitle>Add Voice</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">LANGUAGE</label>
              <Select>
                <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C22] border-gray-700 text-white max-h-[200px]">
                  {languages.map((lang) => <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">ACCENT</label>
              <Select>
                <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                  <SelectValue placeholder="Select Voice" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                  {accents.map((accent) => <SelectItem key={accent.value} value={accent.value}>{accent.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">ELEVENLABS VOICES</p>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Clr</Button>
          </div>
          <Alert className="bg-yellow-900/30 border-yellow-700/50 text-yellow-300">
            <AlertDescription className="text-xs">
              Please go to the integrations tab to connect your ElevenLabs account. <a href="#" className="underline font-semibold">Click here.</a>
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end gap-2 rounded-b-lg">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600 hover:bg-gray-700 text-white">Cancel</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVoiceModal;