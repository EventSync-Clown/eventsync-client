"use client";

import React, { useEffect, useState } from "react";
import SessionCard from "@/app/components/client/SessionCard";
import { Search, Filter, Calendar } from "lucide-react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      try {
        const response = await fetch("http://localhost:3001/api/sessions");
        const json = await response.json();

        if (json.success) {
          setSessions(json.data);
        }
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    }

    loadSessions();
  }, []);

  // Filtrage
  const filteredSessions = sessions.filter((s) => {
    const speakerNames =
      s.speakers?.map((sp: any) => sp.speaker.name).join(" ") || "";

    return (
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speakerNames.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1d1a] flex items-center justify-center text-white">
        Chargement...
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#1a1d1a] p-8 space-y-10 relative">
      {/* Background Grids */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* --- HEADER DE LA PAGE --- */}
      <header className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-8 bg-[#c4a973]"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#c4a973]">
              Catalogue
            </span>
          </div>

          <h1 className="text-5xl font-black text-white tracking-tighter">
            Toutes les <span className="italic text-[#c4a973]">Sessions</span>
          </h1>
        </div>

        {/* BARRE DE RECHERCHE PREMIUM */}
        <div className="relative group max-w-md w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c4a973] transition-colors"
            size={18}
          />

          <input
            type="text"
            placeholder="Rechercher un atelier, un chef..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a973]/50 transition-all placeholder:text-gray-600"
          />
        </div>
      </header>

      {/* --- FILTRES RAPIDES --- */}
      <div className="relative z-10 flex flex-wrap gap-3">
        <button className="px-6 py-2 rounded-full bg-[#c4a973] text-[#1a1d1a] text-xs font-black uppercase tracking-widest">
          Tout voir
        </button>

        <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest hover:border-[#c4a973]/30 hover:text-white transition-all">
          Ateliers
        </button>

        <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest hover:border-[#c4a973]/30 hover:text-white transition-all">
          Conférences
        </button>

        <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-black uppercase tracking-widest hover:border-[#c4a973]/30 hover:text-white transition-all flex items-center gap-2">
          <Filter size={14} />
          Plus de filtres
        </button>
      </div>

      {/* --- GRILLE DE SESSIONS --- */}
      <section className="relative z-10">
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-white/5 rounded-[3rem] bg-white/[0.02]">
            <p className="text-gray-500 font-medium italic">
              Aucun résultat ne correspond à votre recherche.
            </p>
          </div>
        )}
      </section>

      {/* --- PETIT RAPPEL DATE --- */}
      <div className="fixed bottom-8 right-8 z-20 bg-[#c4a973] text-[#1a1d1a] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-xs uppercase tracking-tighter">
        <Calendar size={16} />
        14 - 16 Mai 2026
      </div>
    </div>
  );
}