import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Loader2, UploadCloud, Link, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryEditorProps {
  script: string;
  onScriptChange: (value: string) => void;
  isRewriting: boolean;
  onRewrite: () => void;
  onNext: () => void;
}

type InputType = 'write' | 'url' | 'upload';

const StoryEditor = ({ script, onScriptChange, isRewriting, onRewrite, onNext }: StoryEditorProps) => {
  const [inputType, setInputType] = React.useState<InputType>('write');
  const [storyGenerated, setStoryGenerated] = React.useState(false);
  const [isExtracting, setIsExtracting] = React.useState(false);

  const handleExtract = async () => {
    setIsExtracting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onScriptChange("This is a story extracted from a URL or a document. It's a placeholder to show the functionality. You can now edit it below or proceed to the next step.");
    setStoryGenerated(true);
    setIsExtracting(false);
  };

  const renderInputArea = () => {
    switch (inputType) {
      case 'url':
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <div className="w-full max-w-lg space-y-4">
              <Input 
                type="url" 
                placeholder="Enter Website URL" 
                className="bg-[#2A2A33] border-gray-600 h-12 text-center"
              />
              <Button onClick={handleExtract} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold" disabled={isExtracting}>
                {isExtracting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Extract Story
              </Button>
            </div>
            {!storyGenerated && <p className="text-gray-500 mt-8">No Story Generated Yet.</p>}
          </div>
        );
      case 'upload':
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <div className="w-full max-w-lg space-y-4">
              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="col-span-1">
                  <label className="text-xs text-gray-400 block mb-1 text-left">File Type</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="bg-[#2A2A33] border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                      <SelectItem value="txt">TXT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <div className="w-full h-24 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-purple-500 hover:text-purple-400">
                    <UploadCloud className="h-6 w-6 mb-1" />
                    <p className="text-sm">Drag and drop file or browse</p>
                    <p className="text-xs">Max file size is 5 MB</p>
                  </div>
                </div>
              </div>
              <Button onClick={handleExtract} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold" disabled={isExtracting}>
                {isExtracting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Extract Story
              </Button>
            </div>
            {!storyGenerated && <p className="text-gray-500 mt-8">No Story Generated Yet.</p>}
          </div>
        );
      case 'write':
      default:
        return (
          <div className="flex-grow bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-1 text-gray-300 leading-relaxed font-mono text-sm relative">
            <Textarea 
              value={script}
              onChange={(e) => onScriptChange(e.target.value)}
              className="w-full h-full bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-6"
              placeholder="Input anything from a full script, a few scenes, or a story..."
              maxLength={120000}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                {script.length}/120,000
            </div>
          </div>
        );
    }
  };

  const TabButton = ({ type, icon: Icon, label }: { type: InputType, icon: React.ElementType, label: string }) => (
    <Button
      onClick={() => setInputType(type)}
      className={cn(
        "w-64 h-12 text-base font-semibold transition-all duration-300",
        inputType === type
          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
          : "bg-[#2A2A33] text-gray-400 hover:bg-[#33333c] hover:text-white"
      )}
    >
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </Button>
  );

  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <TabButton type="write" icon={Pencil} label="Write Your Story" />
        <TabButton type="url" icon={Link} label="Pull Story From URL" />
        <TabButton type="upload" icon={UploadCloud} label="Upload Document" />
      </div>

      <div className="flex-grow flex flex-col">
        {(inputType !== 'write' && storyGenerated) ? (
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
        ) : renderInputArea()}
      </div>

      <footer className="flex justify-end items-center gap-4 mt-6">
          <Button 
            variant="outline" 
            className="border-gray-600 hover:bg-gray-700 text-white w-[110px]"
            onClick={onRewrite}
            disabled={isRewriting || !script}
          >
            {isRewriting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Rewrite
          </Button>
          <Button 
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            onClick={onNext}
            disabled={!script}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
      </footer>
    </>
  );
};

export default StoryEditor;