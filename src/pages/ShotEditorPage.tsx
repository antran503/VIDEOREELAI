import LeftPanel from "@/components/shot-editor/LeftPanel";
import RightPanel from "@/components/shot-editor/RightPanel";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { PlayCircle, SkipBack, SkipForward } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ShotEditorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-semibold text-white px-4">
            <PlayCircle className="h-6 w-6 text-purple-400" />
            <span>MovieReel AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="font-semibold text-gray-400 hover:text-white" onClick={() => navigate('/storyboard')}>Storyboard</Button>
            <Button variant="ghost" className="font-semibold text-white bg-gray-700">Shot Editor</Button>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white">Render</Button>
          <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">Preview</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="rounded-full flex items-center gap-2 bg-transparent hover:bg-gray-800 p-1 pr-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-300" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">ktsuthanhan</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#1C1C22] border-gray-700 text-white"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="focus:bg-gray-700">Profile</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-red-500/20 focus:text-red-400">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-lg mb-4">
            <img src="https://i.imgur.com/4YjD2M5.png" alt="Shot preview" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon"><SkipBack /></Button>
            <Button variant="ghost" size="icon" className="bg-white text-black hover:bg-gray-200 rounded-full w-12 h-12"><Play className="fill-black" /></Button>
            <Button variant="ghost" size="icon"><SkipForward /></Button>
          </div>
        </main>
        <RightPanel />
      </div>

      {/* Timeline */}
      <footer className="h-40 bg-[#1C1C22] border-t border-gray-700 p-4">
        <div className="text-center text-gray-500">Timeline Placeholder</div>
      </footer>
    </div>
  );
};

export default ShotEditorPage;