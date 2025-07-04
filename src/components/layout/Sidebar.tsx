import { NavLink } from "react-router-dom";
import { LayoutDashboard, Clapperboard, Users, CalendarDays, Plug, PlayCircle, Settings } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: Clapperboard },
  { to: "/characters", label: "Characters", icon: Users },
  { to: "/schedule", label: "Content Schedule", icon: CalendarDays },
  { to: "/integrations", label: "Integration", icon: Plug },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => (
  <aside className="w-60 flex-shrink-0 bg-[#16161A] p-4 flex flex-col">
    <div className="flex items-center gap-2 font-semibold text-white px-2 mb-8 h-10">
        <PlayCircle className="h-7 w-7 text-purple-400" />
        <span className="text-lg">MovieReel AI</span>
    </div>
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;