import * as React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SceneList from "@/components/storyboard/SceneList";
import ShotCard from "@/components/storyboard/ShotCard";
import { Plus } from "lucide-react";

const mockScenes = [
  { id: 1, name: "Scene 1" },
  { id: 2, name: "Scene 2" },
  { id: 3, name: "Scene 3" },
  { id: 4, name: "Scene 4" },
  { id: 5, name: "Scene 5" },
  { id: 6, name: "Scene 6" },
  { id: 7, name: "Scene 7" },
];

const mockShots = [
    { id: 1, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "A man, disheveled, is startled awake by his alarm clock. The room is small and cluttered.", mood: "Exhaustion, reluctance" },
    { id: 2, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Outside the apartment window, the bustling streets of Mumbai are already teeming with life. Honking cars, distant chai vendors.", mood: "Overwhelming, chaotic" },
    { id: 3, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi's phone buzzes on the bedside table. He glances at it, a message from his boss: 'Late again yesterday. One more strike and you're out.'", mood: "Frustration, resignation" },
    { id: 4, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi stands in front of a cheap mirror, adjusting the collar of his wrinkled shirt. His reflection shows a hollow-eyed, defeated young man.", mood: "Defeat, repository" },
    { id: 5, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi steps out of his apartment building into the morning crowds of Mumbai. The camera follows him as he merges into the crowd of commuters.", mood: "Overwhelming, impersonal" },
];

const Storyboard = () => {
  const [activeSceneId, setActiveSceneId] = React.useState(1);
  const navigate = useNavigate();

  const activeShots = mockShots.filter(shot => shot.sceneId === activeSceneId);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full text-white">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="font-semibold text-white bg-gray-700">Storyboard</Button>
            <Button variant="ghost" className="font-semibold text-gray-400 hover:text-white" onClick={() => navigate('/shot-editor')}>Shot Editor</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white">Render</Button>
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">Preview</Button>
          </div>
        </header>

        <div className="flex flex-grow gap-4 overflow-hidden">
          <SceneList scenes={mockScenes} activeSceneId={activeSceneId} onSelectScene={setActiveSceneId} />
          
          <div className="flex-1 flex flex-col bg-[#0F0F1A]/50 rounded-lg">
            <ScrollArea className="h-full w-full">
                <div className="flex items-start gap-4 p-4">
                    {activeShots.map((shot, index) => (
                        <ShotCard key={shot.id} shot={shot} index={index} />
                    ))}
                    <Button variant="outline" className="h-full w-24 flex-shrink-0 border-gray-600 hover:bg-gray-700 text-white flex-col gap-2">
                        <Plus className="h-6 w-6" />
                        <span>Add Shot</span>
                    </Button>
                </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Storyboard;