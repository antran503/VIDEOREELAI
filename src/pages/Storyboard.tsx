import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SceneList from "@/components/storyboard/SceneList";
import ShotCard from "@/components/storyboard/ShotCard";
import { Plus, PlayCircle, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockScenes = [
  { id: 1, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' },
  { id: 2, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' },
  { id: 3, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' },
  { id: 4, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' },
  { id: 5, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' },
  { id: 6, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' },
  { id: 7, image: "https://i.imgur.com/4YjD2M5.png", status: 'loading' },
];

const mockShots = [
    { id: 1, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "A small, cramped Mumbai apartment at 5:00 AM. The alarm clock blares loudly on a cluttered bedside table. Ravi, a young man in his late 20s, groans and slams his hand on the snooze button.", mood: "Exhaustion, reluctance" },
    { id: 2, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Outside the apartment window, the city of Mumbai is already bustling. Honking cars, distant chai vendors, and the general hum of the metropolis can be heard.", mood: "Overwhelming, chaotic" },
    { id: 3, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi's phone buzzes on the bedside table. He picks it up and reads a message from his boss: *Late again yesterday. One more strike and you're out.* His expression darkens as he reads.", mood: "Frustration, resignation" },
    { id: 4, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi stands in front of a small mirror, adjusting the collar of his wrinkled shirt. His reflection shows a hollow-eyed, defeated young man. The peeling paint on the wall behind him adds to the sense of decay.", mood: "Defeat, monotony" },
    { id: 5, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi steps out of his apartment building into the morning crowds of Mumbai. The camera follows him as he merges into the crowd of commuters, his expression blank and lost.", mood: "Overwhelming, impersonal" },
];

const Storyboard = () => {
  const [activeSceneId, setActiveSceneId] = React.useState(1);
  const navigate = useNavigate();

  const activeShots = mockShots.filter(shot => shot.sceneId === activeSceneId);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-2 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold text-white px-4">
                <PlayCircle className="h-6 w-6 text-purple-400" />
                <span>MovieReel AI</span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" className="font-semibold text-white bg-gradient-to-r from-pink-500 to-blue-500">Storyboard</Button>
                <Button variant="ghost" className="font-semibold text-gray-400 hover:text-white" onClick={() => navigate('/shot-editor')}>Shot Editor</Button>
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
                    <span className="text-xs text-gray-400">
                        ktsuthanhan@gmail.com
                    </span>
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

      <div className="flex flex-grow gap-6 p-6 overflow-hidden">
        <SceneList scenes={mockScenes} activeSceneId={activeSceneId} onSelectScene={setActiveSceneId} />
        
        <div className="flex-1 flex flex-col bg-[#0F0F1A]/50 rounded-lg overflow-hidden">
            <div className="flex-grow overflow-x-auto p-4">
                <div className="flex items-stretch gap-4 h-full w-max">
                    {activeShots.map((shot, index) => (
                        <ShotCard key={shot.id} shot={shot} index={index} />
                    ))}
                    <Button variant="outline" className="w-24 flex-shrink-0 border-gray-600 hover:bg-gray-700 text-white flex-col gap-2">
                        <Plus className="h-6 w-6" />
                        <span>Add Shot</span>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Storyboard;