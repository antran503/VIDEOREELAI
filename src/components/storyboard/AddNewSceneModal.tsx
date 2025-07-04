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
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface AddNewSceneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddScene: (title: string, description: string) => void;
}

const AddNewSceneModal = ({ open, onOpenChange, onAddScene }: AddNewSceneModalProps) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleGenerate = () => {
    if (title && description) {
      onAddScene(title, description);
      onOpenChange(false);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4 relative">
          <DialogTitle>Add New Scene</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="scene-title" className="text-sm font-medium text-gray-400 block mb-2">Enter Scene Title</label>
            <Input
              id="scene-title"
              placeholder="Enter Scene Title Here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#2A2A33] border-gray-600 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="scene-description" className="text-sm font-medium text-gray-400 block mb-2">Enter Scene Description</label>
            <Textarea
              id="scene-description"
              placeholder="Enter Scene Description Here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#2A2A33] border-gray-600 min-h-[100px] resize-none focus:ring-purple-500"
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

export default AddNewSceneModal;