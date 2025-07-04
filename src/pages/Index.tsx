import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Play, Lightbulb, FileText, Sparkles } from "lucide-react";
import IdeaModal from "@/components/IdeaModal";

const Index = () => {
  const [isIdeaModalOpen, setIsIdeaModalOpen] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-8 md:p-12 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-thin tracking-widest" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>WELCOME TO</h1>
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 mb-4">MovieReel</h2>
          <p className="max-w-2xl mb-6 text-gray-300">
            Here, you can create, edit, and manage your AI-generated movies with ease. Access powerful tools, customize scenes, and bring your vision to life effortlessly. Whether you're making short clips or full-length videos, everything you need is at your fingertips. Let's make movie magic!
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-full px-6 py-3">
            <Play className="mr-2 h-4 w-4" /> Watch Demo Video
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-white mb-4">How would you like to start?</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#1C1C22]/60 border-gray-700 text-white">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg mt-1">
                        <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-lg">Start with an idea</h4>
                        <p className="text-sm text-gray-400 mb-4">Instantly turn any idea or simple prompt to a fully realized project.</p>
                        <Button onClick={() => setIsIdeaModalOpen(true)} className="bg-gradient-to-r from-pink-500 to-purple-400 text-white rounded-md">
                            Write prompt <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1C1C22]/60 border-gray-700 text-white">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg mt-1">
                        <FileText className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-lg">Start with a script</h4>
                        <p className="text-sm text-gray-400 mb-4">Input your script, or a synopsis, to generate them precisely as written.</p>
                        <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-md">
                            Input Script <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-white my-4">Recent Projects</h3>
        <div className="text-center text-gray-400 py-8 bg-[#1C1C22]/60 rounded-lg border border-gray-700">
          <p>No projects created yet.</p>
        </div>
      </div>
      
      <IdeaModal open={isIdeaModalOpen} onOpenChange={setIsIdeaModalOpen} />
    </DashboardLayout>
  );
};

export default Index;