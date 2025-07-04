import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

const Dashboard = () => (
  <div className="animate-in fade-in-50">
    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
    <h3 className="text-2xl font-semibold text-white my-6">Recent Projects</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => <ProjectCard key={project.id} project={project} />)}
    </div>
  </div>
);

export default Dashboard;