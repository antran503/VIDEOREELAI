import { NavLink, useLocation } from "react-router-dom";
import { Home, FolderKanban, Users, CalendarDays, Settings, PlayCircle } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b border-gray-700 px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-white">
          <PlayCircle className="h-6 w-6 text-purple-400" />
          <span>MovieReel AI</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
          <SidebarLink to="/" icon={<Home className="h-5 w-5" />}>
            Dashboard
          </SidebarLink>
          <SidebarLink to="/projects" icon={<FolderKanban className="h-5 w-5" />} extraActivePaths={["/script-editor"]}>
            Projects
          </SidebarLink>
          <SidebarLink to="/characters" icon={<Users className="h-5 w-5" />}>
            Characters
          </SidebarLink>
          <SidebarLink to="/schedule" icon={<CalendarDays className="h-5 w-5" />}>
            Content Schedule
          </SidebarLink>
          <SidebarLink to="/integration" icon={<Settings className="h-5 w-5" />}>
            Integration
          </SidebarLink>
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, children, extraActivePaths = [] }: { to: string; icon: React.ReactNode; children: React.ReactNode; extraActivePaths?: string[] }) => {
  const location = useLocation();
  const isActive = location.pathname === to || extraActivePaths.some(path => location.pathname.startsWith(path));

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={
        `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white ${
          isActive ? "bg-[#E54660] text-white" : "hover:bg-gray-800"
        }`
      }
    >
      {icon}
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

export default Sidebar;