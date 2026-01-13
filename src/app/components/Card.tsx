import React from "react";

interface CardProperties {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProperties) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg mb-6 ml-3 mr-3">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
        {title}
      </h2>
      <div className="text-slate-300">{children}</div>
    </div>
  );
}
