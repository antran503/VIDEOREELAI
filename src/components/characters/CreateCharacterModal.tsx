import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles } from "lucide-react";
import { generateImageFromPrompt } from "@/services/runwareService";
import { showLoading, dismissToast, showSuccess, showError } from "@/utils/toast";

interface CreateCharacterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCharacterCreated: (name: string, image: string, prompt: string) => void;
}

const CreateCharacterModal = ({ open, onOpenChange, onCharacterCreated }: CreateCharacterModalProps) => {
  const [name, setName] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    if (!name || !prompt) {
      showError("Vui lòng nhập tên và mô tả cho nhân vật.");
      return;
    }
    setIsGenerating(true);
    const toastId = showLoading("Đang tạo nhân vật với Runware...");
    try {
      const imageUrl = await generateImageFromPrompt(prompt);
      onCharacterCreated(name, imageUrl, prompt);
      dismissToast(toastId);
      showSuccess("Nhân vật đã được tạo thành công!");
      onOpenChange(false);
      setName("");
      setPrompt("");
    } catch (error) {
      dismissToast(toastId);
      showError("Tạo nhân vật thất bại.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-lg p-0 rounded-lg">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Create New Character</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="char-name" className="text-sm font-medium text-gray-400 block mb-2">Character Name</Label>
            <Input
              id="char-name"
              placeholder="e.g., Jake, the grizzled detective"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2A2A33] border-gray-600 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="char-prompt" className="text-sm font-medium text-gray-400 block mb-2">Character Description (Prompt)</Label>
            <Textarea
              id="char-prompt"
              placeholder="A detailed description of the character's appearance, style, and mood. For example: 'A close-up portrait of a grizzled detective, 40s, with a tired but determined look. Five o'clock shadow, wearing a trench coat in a dimly lit, rainy alley. Cinematic, noir style.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-[#2A2A33] border-gray-600 min-h-[120px] resize-none focus:ring-purple-500"
            />
          </div>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end rounded-b-lg">
          <Button onClick={handleGenerate} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-32" disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Sparkles className="mr-2 h-4 w-4" /> Generate</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCharacterModal;