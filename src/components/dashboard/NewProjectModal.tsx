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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Loader2 } from "lucide-react";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const NewProjectModal = ({ open, onOpenChange, onSuccess }: NewProjectModalProps) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [projectName, setProjectName] = React.useState("");

  const handleNextClick = async () => {
    if (!projectName) {
        return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onOpenChange(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-md p-0 rounded-lg">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-lg font-medium">Enter Name of Project</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <Input
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-[#2A2A33] border-gray-600 h-12 focus-visible:ring-purple-500 placeholder:text-gray-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select defaultValue="US">
                <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C22] border-gray-700 text-white max-h-[200px]">
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select defaultValue="en">
                <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C22] border-gray-700 text-white max-h-[200px]">
                  {languages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>{language.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="bg-[#16161A] p-4 flex justify-end rounded-b-lg">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600 hover:bg-gray-700 text-white" disabled={isProcessing}>Cancel</Button>
          <Button 
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold w-[90px]"
            onClick={handleNextClick}
            disabled={isProcessing || !projectName}
          >
            {isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;