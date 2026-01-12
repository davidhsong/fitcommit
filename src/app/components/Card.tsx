import React from "react";

interface CardProperties {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProperties) {
  return (
    <div className="">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
