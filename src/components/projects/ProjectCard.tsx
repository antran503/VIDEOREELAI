import {
  MoreVertical,
  Download,
  Copy,
  Trash2,
  Pencil,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Project {
  id: number;
  name: string;
  date: string;
  scenes: number;
  image: string;
  status: "generating" | "awaiting";
}

interface ProjectCardProps {
  project: Project;
  onDelete: (projectId: number) => void;
  onCopy: (projectId: number) => void;
}

const ProjectCard = ({ project, onDelete, onCopy }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = project.image;
    link.download = `${project.name}-poster.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#1C1C22] rounded-lg overflow-hidden group shadow-lg relative">
      <div className="relative">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        {project.status === "generating" ? (
          <div className="absolute top-2 left-2 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin" />
            Generating Shot..
          </div>
        ) : (
          <div className="absolute top-2 left-2 bg-gray-100/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-full">
            Awaiting Customization
          </div>
        )}

        {/* More Options Dropdown */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1C1C22] border-gray-700 text-white">
              <DropdownMenuItem onClick={handleDownload} className="focus:bg-gray-700">
                <Download className="mr-2 h-4 w-4" />
                <span>Download Poster</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCopy(project.id)} className="focus:bg-gray-700">
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(project.id)} className="focus:bg-red-500/20 focus:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Edit Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8" onClick={() => navigate('/script-editor')}>
                <Pencil className="mr-2 h-3 w-3" />
                Edit
            </Button>
        </div>

        {/* Progress Dot */}
        <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white truncate">{project.name}</h3>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <span>{project.date}</span>
          <span>{project.scenes} Scenes</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;