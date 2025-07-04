import * as React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlayCircle, Volume2, Maximize, ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { useNavigate } from "react-router-dom";

interface CreatePostScheduleProps {
  onBack: () => void;
}

const CreatePostSchedule = ({ onBack }: CreatePostScheduleProps) => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in-50">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-4 hover:bg-gray-800">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-white">Content Schedule</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Video Player */}
        <div className="lg:col-span-2 bg-[#1C1C22] border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
          <div className="w-full aspect-video bg-black rounded-md flex items-center justify-center relative">
            <PlayCircle className="h-20 w-20 text-gray-600" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-black/30 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <PlayCircle className="h-6 w-6 cursor-pointer" />
                    <span className="text-sm">00:00 / 00:00</span>
                </div>
                <div className="flex items-center gap-4">
                    <Volume2 className="h-6 w-6 cursor-pointer" />
                    <Maximize className="h-6 w-6 cursor-pointer" />
                </div>
            </div>
          </div>
        </div>

        {/* Right side: Form */}
        <div className="bg-[#1C1C22] border border-gray-700 rounded-lg p-6 space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">SELECT VIDEO</label>
            <Select>
              <SelectTrigger className="w-full bg-[#2A2A33] border-gray-600 focus:ring-purple-500">
                <SelectValue placeholder="Select Video" />
              </SelectTrigger>
              <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">ADD CAPTION</label>
            <Textarea
              placeholder="Finding beauty in the simplest moments. ✨ Sometimes, a change in the main perspective is all you need to unlock creativity. #New"
              className="bg-[#2A2A33] border-gray-600 min-h-[120px] resize-none focus-visible:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">SELECT PLATFORM (You can select multiple platforms)</label>
            <Alert className="bg-yellow-900/30 border-yellow-700/50 text-yellow-300">
              <AlertDescription className="text-xs">
                Please go to the integrations tab to connect your account. <a onClick={() => navigate('/integrations')} className="underline font-semibold cursor-pointer">Click here.</a>
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 border-gray-600 hover:bg-gray-700 text-white">Schedule</Button>
            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white">Post Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostSchedule;