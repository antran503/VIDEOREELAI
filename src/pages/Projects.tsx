import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface Project {
  id: number;
  name: string;
  date: string;
  scenes: number;
  image: string;
  isGenerating: boolean;
}

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.state?.startGeneration) {
      showSuccess("Shot generation has started...");
      
      const newProject: Project = {
        id: Date.now(),
        name: "Zindagi Ki Rail",
        date: "7/4/2025",
        scenes: 8,
        image: "https://i.imgur.com/4YjD2M5.png",
        isGenerating: true,
      };

      setProjects(prev => [newProject, ...prev]);

      const timer = setTimeout(() => {
        setProjects(prev => 
          prev.map(p => p.id === newProject.id ? { ...p, isGenerating: false } : p)
        );
      }, 5000);

      // Dọn dẹp trạng thái điều hướng để tránh kích hoạt lại khi làm mới
      navigate(location.pathname, { replace: true, state: {} });

      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-[#1C1C22] rounded-lg overflow-hidden group shadow-lg">
              <div className="relative">
                <img src={project.image} alt={project.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                {project.isGenerating && (
                  <div className="absolute top-2 left-2 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Generating Shot..
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white truncate">{project.name}</h3>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                  <span>{project.date}</span>
                  <span>{project.scenes} Scenes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-16 bg-[#1C1C22]/60 rounded-lg border border-gray-700">
          <p>No projects created yet.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Projects;