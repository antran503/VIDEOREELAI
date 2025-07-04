import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [projectToDelete, setProjectToDelete] = React.useState<number | null>(null);
  
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
        status: "generating",
      };

      setProjects(prev => [newProject, ...prev]);

      const timer = setTimeout(() => {
        setProjects(prev => 
          prev.map(p => p.id === newProject.id ? { ...p, status: "awaiting" } : p)
        );
      }, 5000);

      navigate(location.pathname, { replace: true, state: {} });

      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const handleOpenDeleteDialog = (projectId: number) => {
    setProjectToDelete(projectId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProject = () => {
    if (projectToDelete) {
      setProjects(prev => prev.filter(p => p.id !== projectToDelete));
      setProjectToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCopyProject = (projectId: number) => {
    const projectToCopy = projects.find(p => p.id === projectId);
    if (projectToCopy) {
      const newProject: Project = {
        ...projectToCopy,
        id: Date.now(),
        name: `${projectToCopy.name} (Copy)`,
      };
      setProjects(prev => [newProject, ...prev]);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white" onClick={() => navigate('/')}>
          <Plus className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onDelete={handleOpenDeleteDialog}
              onCopy={handleCopyProject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-16 bg-[#1C1C22]/60 rounded-lg border border-gray-700">
          <p>No projects created yet.</p>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1C1C22] border-gray-700 text-white">
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 mb-4">
                <Trash className="h-6 w-6 text-red-500" />
            </div>
            <AlertDialogTitle className="text-center">Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-400">
              This action cannot be undone. This will permanently delete the project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel className="border-gray-600 hover:bg-gray-700 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject} className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Projects;