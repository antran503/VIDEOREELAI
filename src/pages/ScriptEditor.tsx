import * as React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import StoryEditor from "@/components/script-editor/StoryEditor";
import SettingsCastEditor from "@/components/script-editor/SettingsCastEditor";
import SceneEditor from "@/components/script-editor/SceneEditor";

const mockScript = `The alarm blared at 5:00 AM, but Jake was already awake, staring at the cracked ceiling of his tiny apartment. His phone buzzed—another text from his boss: "I'll ask again, you're on thin ice." He exhaled, tossing it aside. The gym bag by the door hadn't moved in weeks.

The diner was half-empty, the smell of burnt coffee thick in the air. Jake slumped into his usual booth, avoiding his reflection in the greasy window. Maria, the waitress who'd served him every morning for a year, slid a black coffee and a tired smile across the table.

"You look like hell," she said.

"Feel like it," Jake muttered, stirring sugar he didn't want.

Maria leaned on the counter, arms crossed. "You gonna keep wasting your life, or you got a plan?"

Jake scoffed. "What's the point? Nothing changes."

She pulled a folded newspaper from her apron—a job listing circled in red. "Construction Foreman. Union wages. Benefits."

"Jimmy's hiring. Says he'll take you if you show up sober and on time."

Jake's fingers tightened around the mug. "Why are you helping me?"

Maria's smile faded. "Because someone did it for me once."`;

type Tab = "story" | "settings" | "scene";

const ScriptEditor = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>("story");
  const [script, setScript] = React.useState(mockScript);
  const [isRewriting, setIsRewriting] = React.useState(false);
  const [isGeneratingScenes, setIsGeneratingScenes] = React.useState(false);

  const handleRewrite = async () => {
    setIsRewriting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setScript(prev => prev + "\n\n[AI REWRITE] A new path opened up, one Jake never considered. Maria's simple act of kindness was the spark he needed. He picked up the paper.");
    setIsRewriting(false);
  };

  const handleGenerateScenes = async () => {
    setIsGeneratingScenes(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setActiveTab('scene');
    setIsGeneratingScenes(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full text-white">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Craft Your Movie: Story, Characters & Scenes | Project
          </h1>
        </header>

        <div className="flex items-center gap-4 mb-6 border-b border-gray-700">
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("story")}
              className={`font-semibold rounded-none pb-3 hover:bg-transparent ${activeTab === 'story' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              STORY
            </Button>
            <ChevronRight className="h-5 w-5 text-gray-600" />
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab("settings")}
              className={`font-semibold rounded-none pb-3 hover:bg-transparent ${activeTab === 'settings' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              SETTINGS & CAST
            </Button>
            <ChevronRight className="h-5 w-5 text-gray-600" />
            <Button 
              variant="ghost" 
              onClick={() => activeTab === 'scene' && setActiveTab("scene")}
              className={`font-semibold rounded-none pb-3 hover:bg-transparent ${activeTab === 'scene' ? 'text-white border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              SCENE
            </Button>
        </div>

        <div className="flex-grow flex flex-col">
          {activeTab === 'story' && (
            <StoryEditor 
              script={script}
              onScriptChange={setScript}
              isRewriting={isRewriting}
              onRewrite={handleRewrite}
              onNext={() => setActiveTab('settings')}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsCastEditor 
              onBack={() => setActiveTab('story')} 
              onNext={handleGenerateScenes}
              isGenerating={isGeneratingScenes}
            />
          )}

          {activeTab === 'scene' && (
            <SceneEditor onBack={() => setActiveTab('settings')} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScriptEditor;