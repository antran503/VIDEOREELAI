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
import { Textarea } from "@/components/ui/textarea";

interface AddPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string, text: string) => void;
}

const AddPromptModal = ({ open, onOpenChange, onSave }: AddPromptModalProps) => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const handleSaveClick = () => {
    if (title && text) {
      onSave(title, text);
      onOpenChange(false);
      setTitle("");
      setText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-lg p-0 rounded-lg">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Add New Prompt</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-400 block mb-2">Prompt Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-[#2A2A33] border-gray-600" placeholder="e.g., Cinematic Shot Style" />
          </div>
          <div>
            <Label htmlFor="prompt-text" className="text-sm font-medium text-gray-400 block mb-2">Prompt Text</Label>
            <Textarea id="prompt-text" value={text} onChange={(e) => setText(e.target.value)} className="bg-[#2A2A33] border-gray-600 min-h-[150px]" placeholder="Enter your prompt text here..." />
          </div>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end rounded-b-lg">
          <Button onClick={handleSaveClick} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Save Prompt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPromptModal;