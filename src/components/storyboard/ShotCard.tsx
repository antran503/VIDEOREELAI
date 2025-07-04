import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { shotTypes } from "@/data/shotTypes";
import { cameraAngles } from "@/data/cameraAngles";
import { lightingOptions } from "@/data/lightingOptions";
import { Sparkles, Pencil, X, GripVertical, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShotCard = ({ shot, index }: { shot: any, index: number }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[280px] flex-shrink-0 bg-[#1C1C22] border border-gray-700 rounded-lg p-3 space-y-3 relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white bg-gray-900/50 hover:bg-gray-800">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="aspect-video bg-gray-800 rounded-md overflow-hidden relative">
        <img src={shot.image} alt={`Shot ${index + 1}`} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <GripVertical className="h-3 w-3" />
            <span>{index + 1}</span>
        </div>
      </div>
      <div className="space-y-1 relative">
        <label className="text-xs font-semibold text-gray-400">PROMPT</label>
        <Textarea
          defaultValue={shot.prompt}
          className="text-xs bg-[#2A2A33] border-gray-600 resize-none h-20 focus-visible:ring-purple-500"
        />
        <Button variant="ghost" size="icon" className="absolute top-6 right-1 h-7 w-7 text-gray-400 hover:text-white">
            <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400">SHOT TYPE</label>
        <Select>
          <SelectTrigger className="bg-[#2A2A33] border-gray-600 h-8 text-xs">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
            {shotTypes.map(opt => <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-400">CHARACTER DIALOGUE</label>
        <Switch className="data-[state=checked]:bg-purple-500" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400">CAMERA ANGLES</label>
        <Select>
          <SelectTrigger className="bg-[#2A2A33] border-gray-600 h-8 text-xs">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
            {cameraAngles.map(opt => <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400">LIGHTING</label>
        <Select>
          <SelectTrigger className="bg-[#2A2A33] border-gray-600 h-8 text-xs">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
            {lightingOptions.map(opt => <SelectItem key={opt.value} value={opt.value} className="text-xs">{opt.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold text-gray-400">MOOD</label>
        <Textarea
          defaultValue={shot.mood}
          className="text-xs bg-[#2A2A33] border-gray-600 resize-none h-10 focus-visible:ring-purple-500"
        />
      </div>
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-700">
        <Button variant="ghost" className="text-xs text-white hover:bg-gray-700 hover:text-white">
          <Sparkles className="mr-2 h-3 w-3 text-pink-400" /> Generate Video
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="text-xs text-white hover:bg-gray-700 hover:text-white" onClick={() => navigate('/shot-editor')}>
              <Pencil className="mr-2 h-3 w-3" /> Shot editor
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white border-black">
            <p>Modify specific details of the shot.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ShotCard;