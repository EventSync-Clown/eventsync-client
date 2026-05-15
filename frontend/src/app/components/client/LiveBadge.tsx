"use client";

export default function LiveBadge() {
  return (
    <div className="flex items-center gap-2 bg-es-sage/10 px-4 py-2 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-es-sage opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-es-sage"></span>
      </span>
      <span className="text-[10px] font-black text-es-sage tracking-widest uppercase">
        LIVE
      </span>
    </div>
  );
}