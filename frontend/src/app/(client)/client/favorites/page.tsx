"use client";

import React, { useEffect, useState } from 'react';
import { sessions } from "@/app/lib/data";
import SessionCard from "@/app/components/client/SessionCard";
import { HeartOff } from "lucide-react";

export default function FavoritesPage() {
  const [favoriteSessions, setFavoriteSessions] = useState<any[]>([]);

  useEffect(() => {
    // 1. Récupérer les IDs stockés
    const favIds = JSON.parse(localStorage.getItem('tendak_favs') || '[]');
    
    // 2. Filtrer le tableau 'sessions' pour ne garder que ceux qui sont dans les favoris
    const filtered = sessions.filter(s => favIds.includes(s.id));
    setFavoriteSessions(filtered);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1d1a] p-8 space-y-10 relative">
      <header className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-[2px] w-8 bg-[#c4a973]"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#c4a973]">Ma Sélection</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter">
          Mes <span className="italic text-[#c4a973]">Favoris</span>
        </h1>
      </header>

      <section className="relative z-10">
        {favoriteSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteSessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-white/[0.02] text-center">
            <HeartOff size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-500 font-medium italic">Vous n'avez pas encore de sessions favorites.</p>
          </div>
        )}
      </section>
    </div>
  );
}