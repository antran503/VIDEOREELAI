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
import AddNewSceneModal from "@/components/storyboard/AddNewSceneModal";
import AddNewShotModal from "@/components/storyboard/AddNewShotModal";
import PreviewModal from "@/components/storyboard/PreviewModal";
import { showSuccess } from "@/utils/toast";
import { mockScenesData, mockShotsData } from "@/data/storyboardData";

const Storyboard = () => {
  const [activeSceneId, setActiveSceneId] = React.useState(1);
  const [scenes, setScenes] = React.useState(mockScenesData);
  const [shots, setShots] = React.useState(mockShotsData);
  
  const [isAddSceneModalOpen, setAddSceneModalOpen] = React.useState(false);
  const [isAddShotModalOpen, setAddShotModalOpen] = React.useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = React.useState(false);
  
  const navigate = useNavigate();

  const activeShots = shots.filter(shot => shot.sceneId === activeSceneId);

  const handleAddScene = (title: string, description: string) => {
    const newScene = {
      id: Date.now(),
      image: "https://i.imgur.com/sCfp0kE.png", // Placeholder image
      status: 'loaded' as const,
    };
    setScenes(prev => [...prev, newScene]);
    showSuccess(`Scene "${title}" created! Description: ${description}`);
  };

  const handleAddShot = (prompt: string) => {
    const newShot = {
      id: Date.now(),
      sceneId: activeSceneId,
      image: "https://i.imgur.com/4YjD2M5.png", // Placeholder image
      prompt: prompt,
      mood: "New Mood",
    };
    setShots(prev => [...prev, newShot]);
    showSuccess(`New shot added to Scene ${activeSceneId}`);
  };

  return (
    <>
      <AddNewSceneModal 
        open={isAddSceneModalOpen} 
        onOpenChange={setAddSceneModalOpen} 
        onAddScene={handleAddScene} 
      />
      <AddNewShotModal 
        open={isAddShotModalOpen} 
        onOpenChange={setAddShotModalOpen} 
        onAddShot={handleAddShot} 
      />
      <PreviewModal 
        open={isPreviewModalOpen} 
        onOpenChange={setPreviewModalOpen} 
        imageUrl={activeShots[0]?.image || ''}
      />

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
              <Button onClick={() => setPreviewModalOpen(true)} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">Preview</Button>
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
          <SceneList 
            scenes={scenes} 
            activeSceneId={activeSceneId} 
            onSelectScene={setActiveSceneId} 
            onAddScene={() => setAddSceneModalOpen(true)}
          />
          
          <div className="flex-1 flex flex-col bg-[#0F0F1A]/50 rounded-lg overflow-hidden">
              <div className="flex-grow overflow-x-auto p-4">
                  <div className="flex items-stretch gap-4 h-full w-max">
                      {activeShots.map((shot, index) => (
                          <ShotCard key={shot.id} shot={shot} index={index} />
                      ))}
                      <Button onClick={() => setAddShotModalOpen(true)} variant="outline" className="w-24 flex-shrink-0 border-gray-600 hover:bg-gray-700 text-white flex-col gap-2">
                          <Plus className="h-6 w-6" />
                          <span>Add Shot</span>
                      </Button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Storyboard;