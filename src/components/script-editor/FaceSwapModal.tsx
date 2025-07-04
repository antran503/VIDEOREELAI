import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, ImageUp } from "lucide-react";

interface FaceSwapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: { name: string; image: string } | null;
}

const FaceSwapModal = ({ open, onOpenChange, character }: FaceSwapModalProps) => {
  const [swappedImage, setSwappedImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For demonstration, we'll just use a placeholder image URL.
      // In a real app, you would upload the file and get a URL back.
      setSwappedImage("https://i.imgur.com/sCfp0kE.png");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-md p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Face Swap</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-6">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-sm mb-2">Character</p>
              <img src={character?.image} alt={character?.name} className="w-24 h-24 rounded-md object-cover" />
            </div>
            <ArrowRight className="h-6 w-6 text-gray-500" />
            <div className="text-center">
              <p className="text-sm mb-2">Swap with</p>
              <div className="w-24 h-24 rounded-md bg-[#2A2A33] flex items-center justify-center">
                <ImageUp className="h-8 w-8 text-gray-500" />
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent border-gray-600 hover:bg-gray-700" onClick={handleUploadClick}>
            Create Face Swap
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
          
          <div className="w-full h-40 bg-[#2A2A33] rounded-md flex items-center justify-center">
            {swappedImage ? (
              <img src={swappedImage} alt="Swapped face" className="w-full h-full object-contain rounded-md" />
            ) : (
              <p className="text-gray-500 text-sm">Result will appear here</p>
            )}
          </div>

          <Alert className="bg-yellow-900/30 border-yellow-700/50 text-yellow-300">
            <AlertDescription className="text-xs">
              Replacing Character will take effect from next project
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end gap-2 rounded-b-lg">
          <Button variant="destructive" className="bg-red-800/50 text-white hover:bg-red-800/80">Replace Existing Character</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Save as New Character</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FaceSwapModal;