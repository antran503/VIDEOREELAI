import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  status: string;
  scenes: number;
  image: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1C1C22] rounded-lg overflow-hidden group cursor-pointer" onClick={() => navigate('/storyboard')}>
      <div className="relative">
        <img src={project.image} alt={project.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
          {project.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white truncate">{project.title}</h3>
        <p className="text-sm text-gray-400">{project.scenes} Scenes</p>
      </div>
    </div>
  );
};

export default ProjectCard;