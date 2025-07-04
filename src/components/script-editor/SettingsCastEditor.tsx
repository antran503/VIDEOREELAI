import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, PlusCircle } from "lucide-react";
import VideoStylePicker from "./VideoStylePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/data/languages";
import { narratorVoices } from "@/data/narratorVoices";

const genders = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "female-child", label: "Female (child)" },
  { value: "male-child", label: "Male (child)" },
];

const SettingsCastEditor = ({ onBack }: { onBack: () => void }) => {
  const [movieType, setMovieType] = React.useState("dialogue");
  const [isGeneratingCast, setIsGeneratingCast] = React.useState(true);
  const [castGenerated, setCastGenerated] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsGeneratingCast(false);
      setCastGenerated(true);
    }, 3000); // Simulate generation time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
        {/* Left Column: Settings */}
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="project-name">PROJECT NAME</Label>
            <Input id="project-name" defaultValue="Project" className="bg-[#2A2A33] border-gray-600" />
          </div>

          <div className="space-y-2">
            <Label>ASPECT RATIO</Label>
            <ToggleGroup type="single" defaultValue="16:9" className="w-full grid grid-cols-3 gap-2">
              <ToggleGroupItem value="16:9" className="bg-[#2A2A33] border-gray-600 data-[state=on]:bg-gradient-to-r data-[state=on]:from-pink-500 data-[state=on]:to-blue-500 data-[state=on]:text-white">
                [ 16:9 ]
              </ToggleGroupItem>
              <ToggleGroupItem value="9:16" className="bg-[#2A2A33] border-gray-600 data-[state=on]:bg-gradient-to-r data-[state=on]:from-pink-500 data-[state=on]:to-blue-500 data-[state=on]:text-white">
                [ 9:16 ]
              </ToggleGroupItem>
              <ToggleGroupItem value="1:1" className="bg-[#2A2A33] border-gray-600 data-[state=on]:bg-gradient-to-r data-[state=on]:from-pink-500 data-[state=on]:to-blue-500 data-[state=on]:text-white">
                [ 1:1 ]
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>MOVIE TYPE</Label>
            <ToggleGroup type="single" defaultValue={movieType} onValueChange={(v) => v && setMovieType(v)} className="w-full grid grid-cols-2 gap-2">
              <ToggleGroupItem value="dialogue" className="bg-[#2A2A33] border-gray-600 data-[state=on]:bg-gradient-to-r data-[state=on]:from-pink-500 data-[state=on]:to-blue-500 data-[state=on]:text-white">
                Dialogue
              </ToggleGroupItem>
              <ToggleGroupItem value="narrator" className="bg-[#2A2A33] border-gray-600 data-[state=on]:bg-gradient-to-r data-[state=on]:from-pink-500 data-[state=on]:to-blue-500 data-[state=on]:text-white">
                Narrator
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {movieType === 'narrator' && (
            <div className="space-y-4 p-4 bg-[#1C1C22]/60 rounded-lg">
              <div className="space-y-2">
                <Label>SELECT LANGUAGE</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1C22] border-gray-700 text-white max-h-[200px]">
                    {languages.map((lang) => <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>SELECT GENDER</Label>
                <Select>
                  <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                    {genders.map((gender) => <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>SELECT NARRATOR VOICE</Label>
                <Select>
                  <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                    <SelectValue placeholder="Select Narrator Voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                    {narratorVoices.map((voice) => <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>VIDEO STYLE</Label>
            <VideoStylePicker />
          </div>

          <div className="space-y-2">
            <Label>STYLE STRENGTH</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="[&>span:first-child]:h-full [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-pink-500 [&>span:first-child]:to-blue-500" />
          </div>

          <div className="space-y-2">
            <Label>CINEMATIC INSPIRATION</Label>
            <Textarea placeholder="E.g., “Tarantino, gritty, electric, stylish, noir…”" className="bg-[#2A2A33] border-gray-600 min-h-[80px] resize-none" />
          </div>
        </div>

        {/* Right Column: Cast */}
        <div className="md:col-span-2 bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Cast</h3>
            <Button variant="outline" className="bg-transparent border-gray-600 hover:bg-gray-700 text-sm h-8">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Character
            </Button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            {isGeneratingCast && (
              <div className="text-center text-gray-400">
                <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
                <p>Generating Cast</p>
              </div>
            )}
            {castGenerated && (
              <div className="text-center">
                <img src="https://i.imgur.com/4YjD2M5.png" alt="Generated Character" className="rounded-lg max-w-xs mx-auto" />
                 <p className="text-white font-semibold mt-2">Jake</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="flex justify-end items-center gap-4 mt-6">
        <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <Button className="bg-gray-400 text-gray-800 cursor-not-allowed">Next</Button>
      </footer>
    </div>
  );
};

export default SettingsCastEditor;