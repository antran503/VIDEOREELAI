import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { shotTypes } from "@/data/shotTypes";
import { cameraAngles } from "@/data/cameraAngles";
import { lightingOptions } from "@/data/lightingOptions";
import { Sparkles, Pencil, X, GripVertical, RefreshCw, Play, ChevronDown, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { characters as mockCharacters } from "@/data/characters";
import { generateImageFromPrompt } from "@/services/runwareService";
import { showLoading, dismissToast, showSuccess, showError } from "@/utils/toast";

const ShotCard = ({ shot, index, onUpdateShotImage }: { shot: any, index: number, onUpdateShotImage: (shotId: number, newImage: string) => void }) => {
  const navigate = useNavigate();
  const [isDialogueEnabled, setIsDialogueEnabled] = React.useState(false);
  const [selectedCharacter, setSelectedCharacter] = React.useState(mockCharacters[2]);
  const [dialogueText, setDialogueText] = React.useState("Zindagi ki rail hai, bas ek hi safar...\n(Life is a train, just one journey)");
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    if (shot.prompt.includes("street performer begins singing")) {
      setIsDialogueEnabled(true);
    }
  }, [shot.prompt]);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    const toastId = showLoading("Đang tạo ảnh với Runware...");
    try {
      const newImageUrl = await generateImageFromPrompt(shot.prompt);
      onUpdateShotImage(shot.id, newImageUrl);
      dismissToast(toastId);
      showSuccess("Tạo ảnh thành công!");
    } catch (error) {
      dismissToast(toastId);
      showError("Tạo ảnh thất bại.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-[280px] flex-shrink-0 bg-[#1C1C22] border border-gray-700 rounded-lg p-3 space-y-3 relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white bg-gray-900/50 hover:bg-gray-800">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="aspect-video bg-gray-800 rounded-md overflow-hidden relative">
        <img src={shot.image} alt={`Shot ${index + 1}`} className="w-full h-full object-cover" />
        {isGenerating && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
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
        <label className="text-xs font-semibold text-gray-400 flex items-center gap-2">
          CHARACTER DIALOGUE
          <Play className="h-3 w-3 text-gray-500" />
        </label>
        <Switch
          checked={isDialogueEnabled}
          onCheckedChange={setIsDialogueEnabled}
          className="data-[state=checked]:bg-purple-500"
        />
      </div>

      {isDialogueEnabled && (
        <div className="space-y-2 animate-in fade-in-0 zoom-in-95">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-[#2A2A33] border-gray-600 h-10 text-white"
              >
                <div className="flex items-center gap-2">
                  <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-sm font-medium">{selectedCharacter.name}</span>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[254px] p-0 bg-[#1C1C22] border-gray-700 text-white">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {mockCharacters.map((character) => (
                      <CommandItem
                        key={character.id}
                        value={character.name}
                        onSelect={() => {
                          setSelectedCharacter(character);
                          setPopoverOpen(false);
                        }}
                        className="flex items-center gap-2 cursor-pointer rounded-md m-1 aria-selected:bg-gradient-to-r aria-selected:from-pink-500 aria-selected:to-purple-500"
                      >
                        <img src={character.image} alt={character.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{character.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Textarea
            value={dialogueText}
            onChange={(e) => setDialogueText(e.target.value)}
            className="text-sm bg-[#2A2A33] border-gray-600 resize-none h-20 focus-visible:ring-purple-500"
          />
        </div>
      )}

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
        <Button variant="ghost" className="text-xs text-white hover:bg-gray-700 hover:text-white flex-1" onClick={handleGenerateImage} disabled={isGenerating}>
          <Sparkles className="mr-2 h-3 w-3 text-pink-400" /> 
          {isGenerating ? 'Đang tạo...' : 'Tạo ảnh'}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="text-xs text-white hover:bg-gray-700 hover:text-white flex-1" onClick={() => navigate('/shot-editor')}>
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