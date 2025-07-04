import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { videoStyles } from "@/data/videoStyles";
import { ChevronRight, Video } from "lucide-react";

const VideoStylePicker = () => {
  const [selectedStyle, setSelectedStyle] = React.useState("Cinematic");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-[#2A2A33] border-gray-600 h-12">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5" />
            <span>{selectedStyle}</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-[#1C1C22] border-gray-700 text-white">
        <div className="p-4 font-semibold border-b border-gray-700">VIDEO STYLE</div>
        <ScrollArea className="h-72">
          <div className="p-4 grid grid-cols-4 gap-4">
            {videoStyles.map((style) => (
              <div 
                key={style.name} 
                className="space-y-2 cursor-pointer"
                onClick={() => setSelectedStyle(style.name)}
              >
                <img 
                  src={style.image} 
                  alt={style.name} 
                  className={`rounded-md aspect-square object-cover border-2 ${selectedStyle === style.name ? 'border-purple-500' : 'border-transparent'}`}
                />
                <p className="text-xs text-center text-gray-300">{style.name}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default VideoStylePicker;