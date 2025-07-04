import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface AddNewShotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddShot: (prompt: string) => void;
}

const AddNewShotModal = ({ open, onOpenChange, onAddShot }: AddNewShotModalProps) => {
  const [prompt, setPrompt] = React.useState("");

  const handleGenerate = () => {
    if (prompt) {
      onAddShot(prompt);
      onOpenChange(false);
      setPrompt("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4 relative">
          <DialogTitle>Add New Shot</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="shot-prompt" className="text-sm font-medium text-gray-400 block mb-2">Enter Shot Prompt</label>
            <Textarea
              id="shot-prompt"
              placeholder="Enter Prompt Here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-[#2A2A33] border-gray-600 min-h-[120px] resize-none focus:ring-purple-500"
            />
          </div>
        </div>
        <DialogFooter className="p-6 pt-0">
          <Button onClick={handleGenerate} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewShotModal;