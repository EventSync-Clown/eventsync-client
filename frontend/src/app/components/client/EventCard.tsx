"use client";

import { MapPin, Calendar, ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  location: string;
  startDate?: string;
  endDate?: string;
};

export default function EventCard({ title, description, location, startDate, endDate }: Props) {
  return (
    <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-[3rem] p-12 group transition-all duration-500 hover:bg-white/10 shadow-2xl">
      
      {/* --- DESIGN BACKGROUND --- */}
      {/* Grille interne à la carte */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Lueur dorée en coin */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#c4a973]/10 blur-[100px] rounded-full group-hover:bg-[#c4a973]/20 transition-colors pointer-events-none"></div>

      <div className="relative z-10">
        {/* Badge de catégorie ou Statut */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-[1px] w-6 bg-[#c4a973]"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#c4a973]">Événement Vedette</span>
        </div>

        {/* Titre avec mise en avant dynamique */}
        <h2 className="text-6xl font-black text-white mb-8 leading-[0.9] tracking-tighter max-w-2xl">
          {title.split(' ').map((word, i) => 
            (word.toLowerCase() === "table" || word.toLowerCase() === "gastronomique") 
            ? <span key={i} className="text-[#c4a973] italic font-serif"> {word}</span> 
            : i === 0 ? word : ` ${word}`
          )}
        </h2>
        
        {/* Description stylisée */}
        <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-xl italic opacity-80 border-l-2 border-[#c4a973]/30 pl-6">
          "{description}"
        </p>

        {/* Pied de carte : Lieu et Date */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 transition-colors group-hover:border-[#c4a973]/30">
            <MapPin size={20} className="text-[#c4a973]" />
            <span className="font-black text-white uppercase tracking-widest text-xs">{location}</span>
          </div>

          <div className="inline-flex items-center gap-3 text-gray-500">
            <Calendar size={18} />
            <span className="font-bold text-sm">{startDate} — {endDate}</span>
          </div>

          <button className="ml-auto w-14 h-14 rounded-full bg-[#c4a973] flex items-center justify-center text-[#1a1d1a] hover:scale-110 transition-transform shadow-lg shadow-[#c4a973]/20">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}