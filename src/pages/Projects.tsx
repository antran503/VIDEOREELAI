import * as React from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects as initialProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { generateImageFromPrompt } from "@/services/runwareService";
import { showLoading, dismissToast, showSuccess, showError } from "@/utils/toast";

const Projects = () => {
  const [projects, setProjects] = React.useState(initialProjects);
  const [generatingThumbnailId, setGeneratingThumbnailId] = React.useState<string | null>(null);

  const handleGenerateThumbnail = async (projectId: string, prompt: string) => {
    setGeneratingThumbnailId(projectId);
    const toastId = showLoading("Đang tạo thumbnail với Runware...");
    try {
      const newImageUrl = await generateImageFromPrompt(prompt);
      setProjects(prev => 
        prev.map(p => p.id === projectId ? { ...p, image: newImageUrl } : p)
      );
      dismissToast(toastId);
      showSuccess("Tạo thumbnail thành công!");
    } catch (error) {
      dismissToast(toastId);
      showError("Tạo thumbnail thất bại.");
      console.error(error);
    } finally {
      setGeneratingThumbnailId(null);
    }
  };

  return (
    <div className="animate-in fade-in-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
          <Plus className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onGenerateThumbnail={handleGenerateThumbnail}
            isGeneratingThumbnail={generatingThumbnailId === project.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;