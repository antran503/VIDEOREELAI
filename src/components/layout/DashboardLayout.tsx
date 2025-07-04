import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-[#0F0F1A]">
      <div className="hidden border-r border-gray-800 bg-[#1C1C22] md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#2A214D] md:rounded-tl-3xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;