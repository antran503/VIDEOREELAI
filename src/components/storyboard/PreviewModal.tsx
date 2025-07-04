import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
}

const PreviewModal = ({ open, onOpenChange, imageUrl }: PreviewModalProps) => {
  if (!imageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/80 border-none text-white sm:max-w-4xl p-4 shadow-2xl">
        <div className="aspect-video w-full flex items-center justify-center">
            <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 text-white">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;