"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ThumbsUp, 
  Heart, 
  MessageSquare,
  User
} from 'lucide-react';
import LiveBadge from './LiveBadge';

interface SessionProps {
  session: any; // On utilise any temporairement pour accepter le format Prisma de ta collègue
}

export default function SessionCard({ session }: SessionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [upvotes, setUpvotes] = useState(session.upvotes || 0);

  // --- 1. RÉCUPÉRATION DU CHEF (Speaker) ---
  // Dans son Prisma, c'est session.speakers[0].speaker.name
  const mainSpeaker = session.speakers?.[0]?.speaker;

  // --- 2. CORRECTION DES DATES ---
  const formatTime = (dateStr: string) => {
    if (!dateStr) return "--:--";
    const date = new Date(dateStr);
    // Si la date est invalide, on retourne un tiret au lieu de "Invalid Date"
    if (isNaN(date.getTime())) return "--:--";
    
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('tendak_favs') || '[]');
    setIsLiked(favorites.includes(session.id));
  }, [session.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('tendak_favs') || '[]');
    let newFavorites;

    if (favorites.includes(session.id)) {
      newFavorites = favorites.filter((id: string) => id !== session.id);
      setIsLiked(false);
    } else {
      newFavorites = [...favorites, session.id];
      setIsLiked(true);
    }

    localStorage.setItem('tendak_favs', JSON.stringify(newFavorites));
    window.dispatchEvent(new Event("storage_favorites_updated"));
  };

  return (
    <div className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#c4a973]/30 transition-all duration-500 shadow-xl overflow-hidden">
      
      {/* EFFET DE LUMIÈRE AU SURVOL */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#c4a973]/5 blur-3xl group-hover:bg-[#c4a973]/10 transition-colors"></div>

      {/* HEADER : STATUT & SALLE */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col gap-1">
          {session.isLive && <LiveBadge />}
          <div className="flex items-center gap-2 mt-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#c4a973]"></div>
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
               {/* --- CORRECTION : session.room.name --- */}
               {session.room?.name || "Lieu à confirmer"}
             </span>
          </div>
        </div>
        
        <button 
          onClick={toggleFavorite}
          className={`p-3 rounded-2xl transition-all ${isLiked ? 'bg-[#c4a973] text-[#1a1d1a]' : 'bg-white/5 text-gray-400 hover:text-white'}`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="space-y-4 relative z-10">
        <h3 className="text-2xl font-black text-white leading-tight tracking-tighter group-hover:text-[#c4a973] transition-colors line-clamp-2">
          {session.title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-2 font-medium leading-relaxed italic">
          "{session.description}"
        </p>

        {/* INTERVENANT (CHEF) */}
        <div className="flex items-center gap-3 py-2">
          <div className="w-10 h-10 rounded-xl bg-[#c4a973]/10 flex items-center justify-center text-[#c4a973] border border-[#c4a973]/20 overflow-hidden">
            {mainSpeaker?.photo ? (
              <img src={mainSpeaker.photo} alt={mainSpeaker.name} className="w-full h-full object-cover" />
            ) : (
              <User size={20} />
            )}
          </div>
          <div>
            {/* --- CORRECTION : Nom du chef --- */}
            <p className="text-white text-xs font-black uppercase tracking-tighter">
              {mainSpeaker?.name || "Chef invité"}
            </p>
            <p className="text-[#5f7468] text-[10px] font-bold">Expert Gastronomie</p>
          </div>
        </div>
      </div>

      {/* FOOTER : HEURES & UPVOTES */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#c4a973]" />
            {/* --- CORRECTION : startTime et endTime --- */}
            <span className="text-xs font-bold">
              {formatTime(session.startTime)} — {formatTime(session.endTime)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <ThumbsUp size={14} className="text-[#c4a973]" />
            <span className="text-xs font-black">{upvotes}</span>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-[#c4a973] transition-colors">
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}