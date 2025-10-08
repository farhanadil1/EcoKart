import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function GridBackgroundDemo({ children }) {
  return (
    <div className="relative w-full h-fix bg-white">
      {/* Transparent Grid Overlay with top/bottom fade */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)]",
          "[mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]"
        )}
      />

      {/* Content goes on top */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
