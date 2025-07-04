import * as React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, FileText, PlayCircle } from "lucide-react";
import IdeaModal from "@/components/IdeaModal";

const Dashboard = () => {
  const [isIdeaModalOpen, setIsIdeaModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleIdeaSuccess = () => {
    navigate('/script-editor');
  };

  return (
    <>
      <IdeaModal 
        open={isIdeaModalOpen} 
        onOpenChange={setIsIdeaModalOpen}
        onSuccess={handleIdeaSuccess}
      />
      <div className="animate-in fade-in-50 space-y-10">
        {/* Welcome Section */}
        <div className="relative h-64 rounded-lg overflow-hidden p-8 flex flex-col justify-center items-start text-white bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/aF4aYxT.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="relative z-10 max-w-xl">
            <h1 className="text-5xl font-bold leading-tight">WELCOME TO <br/><span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">MovieReel AI</span></h1>
            <p className="mt-4 text-gray-200 max-w-lg">
              Here, you can create, edit, and manage your AI-generated movies with ease. Access powerful tools, customize scenes, and bring your vision to life effortlessly. Whether you're making short clips or full-length videos, everything you need is at your fingertips. Let's make movie magic!
            </p>
            <Button className="mt-6 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-full px-6 py-5 text-base">
              <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo Video
            </Button>
          </div>
        </div>

        {/* How to start Section */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">How would you like to start?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1C1C22] border-gray-700 p-6 flex items-center gap-6 hover:border-purple-500 transition-colors">
              <div className="bg-gray-800 p-4 rounded-lg">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Start with an idea</h3>
                <p className="text-gray-400 mt-1 text-sm">Instantly turn any idea or simple prompt to a fully realized project</p>
                <Button onClick={() => setIsIdeaModalOpen(true)} className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-md">
                  Write prompt ✨
                </Button>
              </div>
            </Card>
            <Card className="bg-[#1C1C22] border-gray-700 p-6 flex items-center gap-6 hover:border-pink-500 transition-colors">
              <div className="bg-gray-800 p-4 rounded-lg">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Start with a script</h3>
                <p className="text-gray-400 mt-1 text-sm">Input your script, or a synopsis, to generate them precisely as written</p>
                <Button onClick={() => navigate('/script-editor')} className="mt-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-md">
                  Input Scripts 🪄
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;