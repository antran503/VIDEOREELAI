import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

interface Scene {
  id: number;
  name: string;
}

interface SceneListProps {
  scenes: Scene[];
  activeSceneId: number;
  onSelectScene: (id: number) => void;
}

const SceneList = ({ scenes, activeSceneId, onSelectScene }: SceneListProps) => {
  return (
    <div className="w-48 flex-shrink-0 flex flex-col gap-4">
      <ScrollArea className="bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-2 flex-grow">
        <div className="space-y-2">
          {scenes.map((scene, index) => (
            <Button
              key={scene.id}
              variant={activeSceneId === scene.id ? "secondary" : "ghost"}
              className={`w-full justify-start h-16 text-left flex items-start p-2 ${activeSceneId === scene.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              onClick={() => onSelectScene(scene.id)}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Scene {index + 1}</span>
                <p className="text-xs font-normal line-clamp-2">
                  {/* Placeholder for scene description */}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700 text-white">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SceneList;