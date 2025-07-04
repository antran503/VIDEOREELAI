import * as React from "react";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
];

const SceneEditor = () => {
  const [isGenerating, setIsGenerating] = React.useState(true);
  const [scenes, setScenes] = React.useState<Scene[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScenes(mockScenes);
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
    <ScrollArea className="h-[calc(100vh-250px)]">
      <div className="space-y-6 pr-4">
        {scenes.map((scene) => (
          <div key={scene.id} className="bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white">Scene {scene.id}</h3>
            <p className="text-gray-300 mt-2">
              <span className="font-medium">Title:</span> {scene.title}
            </p>
            <p className="text-gray-300 mt-4 mb-2">Description</p>
            <div className="border border-gray-600 rounded-md p-4 text-sm text-gray-400 bg-[#0F0F1A]/50">
              {scene.description}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SceneEditor;