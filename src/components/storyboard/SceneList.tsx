import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

interface Scene {
  id: number;
  image: string;
  status: 'loaded' | 'loading';
}

interface SceneListProps {
  scenes: Scene[];
  activeSceneId: number;
  onSelectScene: (id: number) => void;
  onAddScene: () => void;
}

const SceneList = ({ scenes, activeSceneId, onSelectScene, onAddScene }: SceneListProps) => {
  return (
    <div className="w-56 flex-shrink-0 flex flex-col gap-4 bg-[#1C1C22] p-4 rounded-lg">
      <ScrollArea className="flex-grow -mr-4 pr-4">
        <div className="space-y-4">
          {scenes.map((scene, index) => (
            <div key={scene.id} className="space-y-2 cursor-pointer" onClick={() => onSelectScene(scene.id)}>
              <p className="text-sm font-semibold text-gray-300">Scene {index + 1}</p>
              <div className={`relative rounded-md overflow-hidden border-2 ${activeSceneId === scene.id ? 'border-pink-500' : 'border-transparent'} transition-all`}>
                <img src={scene.image} alt={`Scene ${index + 1}`} className="w-full aspect-video object-cover" />
                {scene.status === 'loading' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button variant="outline" onClick={onAddScene} className="w-full border-gray-600 hover:bg-gray-700 text-white flex items-center justify-center h-20">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default SceneList;