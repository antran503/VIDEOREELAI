import * as React from "react";
import { Loader2, Trash2, Copy, ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Scene {
  id: number;
  title: string;
  description: string;
}

const mockScenes: Scene[] = [
  {
    id: 1,
    title: "Morning Routine - A Reluctant Start",
    description: "The alarm blares at 5:00 AM in Ravi's tiny Mumbai apartment. Outside, the city is already alive with honking cars and distant chai vendors. Ravi groans, slams the clock, and stares at the peeling ceiling, dreading another day at the call center. A message from his boss warns him about being late again, adding to his stress.",
  },
  {
    id: 2,
    title: "The Commute - A Glimpse of Passion",
    description: "On the crowded train to work, Ravi leans against the door, watching the city blur past. A street performer boards at Dadar, strumming a battered guitar and singing a soulful song about life's journey. Ravi's fingers tap along, a faint spark of nostalgia in his hollow eyes.",
  },
  {
    id: 3,
    title: "The Grind - Call Center Blues",
    description: "At the office, fluorescent lights buzz overhead. Ravi's coworker, Priya, notices his exhaustion and tries to lighten the mood. The calls from angry customers and scripted apologies blur together, emphasizing the monotony of his life.",
  },
  {
    id: 4,
    title: "The Spark - A Suggestion of Change",
    description: "During lunch, Priya mentions a music competition in Bandra with decent prize money. Ravi dismisses the idea, citing his long hiatus from playing. Priya's words linger in his mind, planting the seed of possibility.",
  },
  {
    id: 5,
    title: "Rediscovery - Dusting Off The Guitar",
    description: "That night, Ravi digs out his old, dusty guitar from under the bed. His initial attempts are rusty and frustrating, but the memory of the street performer's voice inspires him to keep trying. For the first time in years, he feels a flicker of passion.",
  },
  {
    id: 6,
    title: "The Preparation - Bleeding Fingers and Late Nights",
    description: "Over the next week, Ravi practices relentlessly—before work, during breaks, and late into the night. His fingertips bleed, and his neighbors complain, but he persists, feeling more alive than he has in years.",
  },
  {
    id: 7,
    title: "The Moment - Taking the Stage",
    description: "On the night of the competition, Ravi's hands shake with nerves. Priya encourages him from the crowd. Under the spotlight, he closes his eyes and plays—not perfectly, but with raw emotion. The crowd's roar fills the air.",
  },
  {
    id: 8,
    title: "The Aftermath - A New Perspective",
    description: "Though he doesn't win, Ravi walks home with his guitar slung over his shoulder, seeing the city in a new light. Priya asks about tomorrow, and Ravi smiles, realizing this is just the beginning of a new chapter.",
  },
];

interface SceneEditorProps {
  onBack: () => void;
}

const SceneEditor = ({ onBack }: SceneEditorProps) => {
  const [isGenerating, setIsGenerating] = React.useState(true);
  const [scenes, setScenes] = React.useState<Scene[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScenes(mockScenes);
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDescriptionChange = (sceneId: number, newDescription: string) => {
    setScenes(currentScenes =>
      currentScenes.map(scene =>
        scene.id === sceneId ? { ...scene, description: newDescription } : scene
      )
    );
  };

  const handleDeleteScene = (sceneId: number) => {
    setScenes(currentScenes => currentScenes.filter(scene => scene.id !== sceneId));
  };

  const handleDuplicateScene = (sceneId: number) => {
    setScenes(currentScenes => {
      const sceneToDuplicate = currentScenes.find(scene => scene.id === sceneId);
      if (!sceneToDuplicate) return currentScenes;

      const newScene = { ...sceneToDuplicate, id: Date.now() }; // Use timestamp for unique ID
      const index = currentScenes.findIndex(scene => scene.id === sceneId);
      
      const newScenes = [...currentScenes];
      newScenes.splice(index + 1, 0, newScene);
      
      return newScenes;
    });
  };

  if (isGenerating) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-4 min-h-[50vh]">
        <div className="text-center text-gray-400">
          <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
          <p>Generating Scenes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow h-[calc(100vh-320px)]">
        <div className="space-y-6 pr-4">
          {scenes.map((scene) => (
            <div key={scene.id} className="relative group bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-6">
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700" onClick={() => handleDuplicateScene(scene.id)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700" onClick={() => handleDeleteScene(scene.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-xl font-semibold text-white">Scene {scene.id}</h3>
              <p className="text-gray-300 mt-2">
                <span className="font-medium">Title:</span> {scene.title}
              </p>
              <p className="text-gray-300 mt-4 mb-2">Description</p>
              <Textarea
                value={scene.description}
                onChange={(e) => handleDescriptionChange(scene.id, e.target.value)}
                className="border border-gray-600 rounded-md p-4 text-sm text-gray-400 bg-[#0F0F1A]/50 min-h-[100px] resize-none focus-visible:ring-purple-500"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="flex justify-end items-center gap-4 mt-6">
        <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white" onClick={onBack}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
          Start Creating Shots
        </Button>
      </footer>
    </div>
  );
};

export default SceneEditor;