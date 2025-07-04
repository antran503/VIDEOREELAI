import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Projects = () => (
  <div className="animate-in fade-in-50">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">Projects</h1>
      <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
        <Plus className="mr-2 h-4 w-4" /> Create New Project
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => <ProjectCard key={project.id} project={project} />)}
    </div>
  </div>
);

export default Projects;