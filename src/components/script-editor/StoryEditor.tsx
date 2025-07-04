import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Loader2 } from "lucide-react";

interface StoryEditorProps {
  script: string;
  onScriptChange: (value: string) => void;
  isRewriting: boolean;
  onRewrite: () => void;
  onNext: () => void;
}

const StoryEditor = ({ script, onScriptChange, isRewriting, onRewrite, onNext }: StoryEditorProps) => {
  return (
    <>
      <div className="flex-grow bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-1 text-gray-300 leading-relaxed font-mono text-sm relative">
        <Textarea 
          value={script}
          onChange={(e) => onScriptChange(e.target.value)}
          className="w-full h-full bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-6"
          maxLength={120000}
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-500">
            {script.length}/120,000
        </div>
      </div>

      <footer className="flex justify-end items-center gap-4 mt-6">
          <Button 
            variant="outline" 
            className="border-gray-600 hover:bg-gray-700 text-white w-[110px]"
            onClick={onRewrite}
            disabled={isRewriting}
          >
            {isRewriting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Rewrite
          </Button>
          <Button 
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            onClick={onNext}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
      </footer>
    </>
  );
};

export default StoryEditor;