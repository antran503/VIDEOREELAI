import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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

const ScriptEditor = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full text-white">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Craft Your Movie: Story, Characters & Scenes | Project
          </h1>
        </header>

        <div className="flex items-center gap-4 mb-6 border-b border-gray-700">
            <Button variant="ghost" className="text-white font-semibold border-b-2 border-purple-500 rounded-none pb-3 hover:bg-transparent">STORY</Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white">SETTINGS & CAST</Button>
            <ChevronRight className="h-5 w-5 text-gray-600" />
            <Button variant="ghost" className="text-gray-400 hover:text-white" disabled>SCENE</Button>
        </div>

        <div className="flex-grow bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-6 text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm relative">
            {mockScript}
            <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                {mockScript.length}/120.000
            </div>
        </div>

        <footer className="flex justify-end items-center gap-4 mt-6">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white">Rewrite</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Next <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default ScriptEditor;