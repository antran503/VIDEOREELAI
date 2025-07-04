import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Download, Copy, Trash2, Pencil, Sparkles, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: string;
  scenes: number;
  image: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  onGenerateThumbnail: (projectId: string, prompt: string) => void;
  isGeneratingThumbnail: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onGenerateThumbnail, isGeneratingThumbnail }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ngăn điều hướng khi nhấp vào nút trong dropdown
    if ((e.target as HTMLElement).closest('[role="menu"]') || (e.target as HTMLElement).closest('[role="menuitem"]')) {
      return;
    }
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate('/storyboard');
  };

  return (
    <div className="bg-[#1C1C22] rounded-lg overflow-hidden group" onClick={handleCardClick}>
      <div className="relative cursor-pointer">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        
        {isGeneratingThumbnail && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}

        <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
          {project.status}
        </div>

        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1C1C22] border-gray-700 text-white">
              <DropdownMenuItem 
                className="focus:bg-gray-700"
                onClick={() => onGenerateThumbnail(project.id, `Movie poster for a film titled '${project.title}', cinematic, high detail.`)}
                disabled={isGeneratingThumbnail}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Generate Thumbnail</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-700">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Poster</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-700">
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-red-500/20 focus:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="bg-black/70 text-white hover:bg-black/90 text-xs" onClick={(e) => { e.stopPropagation(); navigate('/storyboard'); }}>
                <Pencil className="mr-1.5 h-3 w-3" />
                Edit
            </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white truncate text-lg">{project.title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-400 mt-1">
          <span>{project.date}</span>
          <span>{project.scenes} Scenes</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;