"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, LayoutDashboard, Calendar, Github } from "lucide-react";

export default function Sidebar() {
  return (
    <nav className="w-56 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-80 mb-4">
        <div className="font-bold text-xl text-blue-400 flex items-center gap-2">
          <Github size={24} />
          FitCommit
        </div>
      </div>

      <div>
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors"
        >
          <Dumbbell size={20} />
          <span>Log Workout</span>
        </Link>
      </div>

      <div>
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
      </div>

      <div>
        <Link
          href="/calendar"
          className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-lg transition-colors"
        >
          <Calendar size={20} />
          <span>Calendar</span>
        </Link>
      </div>
    </nav>
  );
}
