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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";

const recommendedIdeas = [
  {
    title: "Whimsical - The Man Who Borrowed Luck",
    description: "A down-on-his-luck man finds a mysterious pawnshop that lets customers 'borrow'...",
  },
  {
    title: "Tragedy - Five More Minutes",
    description: "A father drives his teenage daughter to the airport, where she's leaving for college...",
  },
  {
    title: "Satire - The Like Button",
    description: "In a near-future world where people's social status is determined by how many 'likes'...",
  },
];

interface IdeaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const IdeaModal = ({ open, onOpenChange, onSuccess }: IdeaModalProps) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleNextClick = async () => {
    setIsProcessing(true);
    // Giả lập cuộc gọi API để tạo kịch bản
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    onOpenChange(false); // Đóng modal
    onSuccess(); // Điều hướng đến trang soạn thảo kịch bản
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1C1C22] border-gray-700 text-white sm:max-w-[650px] p-0 rounded-lg">
        <DialogHeader className="p-6 pb-0 relative">
          <DialogTitle className="text-lg font-medium">Write your film idea (or synopsis)</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <Textarea
            placeholder="A gritty neo-noir film set in a rain-drenched, futuristic city. A cynical detective, haunted by his past, takes on a case that leads him into the city's corrupt underbelly, uncovering a conspiracy that reaches the highest levels of power."
            className="bg-[#2A2A33] border-gray-600 min-h-[120px] resize-none focus-visible:ring-purple-500 placeholder:text-gray-500"
          />

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold">Recommended Ideas</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent border-gray-600 hover:bg-gray-700">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent border-gray-600 hover:bg-gray-700">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedIdeas.map((idea, index) => (
                <Card key={index} className="bg-[#2A2A33] border-gray-700 hover:border-purple-500 cursor-pointer rounded-lg">
                  <CardContent className="p-4">
                    <h5 className="font-bold text-sm">{idea.title}</h5>
                    <p className="text-xs text-gray-400 mt-1">{idea.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select defaultValue="US">
                <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                  <SelectValue placeholder="Select a country" />
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
                  <SelectValue placeholder="Select a language" />
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
            disabled={isProcessing}
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

export default IdeaModal;