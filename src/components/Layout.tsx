import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Bell, User } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Sidebar Fixed to Left */}
      <Sidebar />

      {/* 2. Main Content Area */}
      {/* We add a left margin (ml-64) to offset the fixed sidebar width */}
      <div className="flex-1 flex flex-col min-h-screen ml-64 transition-all duration-300">
        
        {/* Global Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">SAdmin</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}