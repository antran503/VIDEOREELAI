import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => (
  <div className="flex h-screen bg-[#0F0F1A] text-white">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto px-8 pb-8">
        <Outlet />
      </main>
    </div>
  </div>
);

export default MainLayout;