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

const mockScenesData = [
  { id: 1, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' as const },
  { id: 2, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' as const },
  { id: 3, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' as const },
  { id: 4, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' as const },
  { id: 5, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' as const },
  { id: 6, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' as const },
  { id: 7, image: "https://i.imgur.com/4YjD2M5.png", status: 'loading' as const },
];

const mockShotsData = [
    // Scene 1
    { id: 1, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "A small, cramped Mumbai apartment at 5:00 AM. The alarm clock blares loudly on a cluttered bedside table. Ravi, a young man in his late 20s, groans and slams his hand on the snooze button.", mood: "Exhaustion, reluctance" },
    { id: 2, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Outside the apartment window, the city of Mumbai is already bustling. Honking cars, distant chai vendors, and the general hum of the metropolis can be heard.", mood: "Overwhelming, chaotic" },
    { id: 3, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi's phone buzzes on the bedside table. He picks it up and reads a message from his boss: *Late again yesterday. One more strike and you're out.* His expression darkens as he reads.", mood: "Frustration, resignation" },
    { id: 4, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi stands in front of a small mirror, adjusting the collar of his wrinkled shirt. His reflection shows a hollow-eyed, defeated young man. The peeling paint on the wall behind him adds to the sense of decay.", mood: "Defeat, monotony" },
    { id: 5, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi steps out of his apartment building into the morning crowds of Mumbai. The camera follows him as he merges into the crowd of commuters, his expression blank and lost.", mood: "Overwhelming, impersonal" },
    
    // Scene 2
    { id: 6, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi hangs onto the overhead bar of a crowded train, staring blankly out the window as the cityscape blurs past.", mood: "Monotonous, weary" },
    { id: 7, sceneId: 2, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Close-up of Ravi's face. Dark circles under his eyes. His expression is blank but with a hint of deep exhaustion. The sounds of the train and crowd are muffled.", mood: "Fatigued, disconnected" },
    { id: 8, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "The train doors open at Dadar station. Through the crowd, a street performer with a worn-out guitar steps in. He begins tuning his instrument.", mood: "Hopeful, anticipatory" },
    { id: 9, sceneId: 2, image: "https://i.imgur.com/4YjD2M5.png", prompt: "The street performer begins singing a soulful, folk song. His voice is rich and powerful. The song's lyrics speak about life's journey. Some passengers ignore him, but a few listen intently.", mood: "Inspiring, soulful" },
    { id: 10, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi's reaction. His blank expression finally changes as he listens to the music. His fingers begin unconsciously tapping against his thigh in rhythm with the song.", mood: "Awakening, nostalgic" },
    { id: 11, sceneId: 2, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Flashback to a past - a brief glimpse of Ravi in a happier time, playing guitar in a college dorm room, laughing with friends. The image is warm and vibrant.", mood: "Happy, reminiscent" },
    { id: 12, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Back to present. Ravi's eyes now have a spark in them. He makes brief eye contact with the performer who nods at him knowingly.", mood: "Connection, realization" },

    // Scene 3 (placeholder)
    { id: 13, sceneId: 3, image: "https://i.imgur.com/4YjD2M5.png", prompt: "At the office, fluorescent lights buzz overhead. Ravi's coworker, Priya, notices his exhaustion.", mood: "Monotony" },
    { id: 14, sceneId: 3, image: "https://i.imgur.com/sCfp0kE.png", prompt: "The calls from angry customers and scripted apologies blur together.", mood: "Frustration" },

    // Scene 4 (placeholder)
    { id: 15, sceneId: 4, image: "https://i.imgur.com/4YjD2M5.png", prompt: "During lunch, Priya mentions a music competition in Bandra.", mood: "Intrigue" },
    { id: 16, sceneId: 4, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi dismisses the idea, but Priya's words linger.", mood: "Contemplation" },
    { id: 17, sceneId: 4, image: "https://i.imgur.com/4YjD2M5.png", prompt: "A shot of the competition flyer.", mood: "Opportunity" },

    // Scene 5 (placeholder)
    { id: 18, sceneId: 5, image: "https://i.imgur.com/sCfp0kE.png", prompt: "That night, Ravi digs out his old, dusty guitar from under the bed.", mood: "Nostalgia" },
    { id: 19, sceneId: 5, image: "https://i.imgur.com/4YjD2M5.png", prompt: "His initial attempts are rusty and frustrating.", mood: "Struggle" },

    // Scene 6 (placeholder)
    { id: 20, sceneId: 6, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Over the next week, Ravi practices relentlessly.", mood: "Determination" },
    { id: 21, sceneId: 6, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Close up on his bleeding fingertips.", mood: "Pain, sacrifice" },
    { id: 22, sceneId: 6, image: "https://i.imgur.com/sCfp0kE.png", prompt: "He feels more alive than he has in years.", mood: "Revitalization" },

    // Scene 7 (placeholder)
    { id: 23, sceneId: 7, image: "https://i.imgur.com/4YjD2M5.png", prompt: "On the night of the competition, Ravi's hands shake with nerves.", mood: "Anxiety" },
    { id: 24, sceneId: 7, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Priya encourages him from the crowd.", mood: "Support" },
    { id: 25, sceneId: 7, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Under the spotlight, he closes his eyes and plays with raw emotion.", mood: "Passion, release" },
];

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