import React from 'react';

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] min-h-screen w-full bg-black">
      {/* Vercel Grid from background.txt */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
