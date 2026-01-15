"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, LayoutDashboard, Calendar, Github } from "lucide-react";

export default function Sidebar() {
  return (
    <nav className="w-48 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 h-screen fixed left-0 top-0">
      <div className="font-bold text-xl mb-6 text-blue-400">FitCommit</div>
      <Link href="/" className="">
        Log Workout
      </Link>

      <Link href="/dashboard" className="">
        Dashboard
      </Link>

      <Link href="/calendar" className="">
        Calendar
      </Link>
    </nav>
  );
}
