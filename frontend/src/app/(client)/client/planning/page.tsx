"use client";

import React, { useState } from 'react';
import { sessions } from "@/app/lib/data";
import { Clock, MapPin, ChevronRight, User } from "lucide-react";

export default function PlanningPage() {
  const [selectedDay, setSelectedDay] = useState("14 Mai");

  return (
    <div className="min-h-screen bg-[#1a1d1a] p-8 space-y-10 relative">
      <header className="relative z-10">
        <h1 className="text-5xl font-black text-white tracking-tighter">
          Planning <span className="italic text-[#c4a973]">Global</span>
        </h1>
      </header>

      {/* SÉLECTEUR DE JOURS */}
      <div className="flex gap-4 relative z-10">
        {["14 Mai", "15 Mai", "16 Mai"].map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              selectedDay === day 
              ? 'bg-[#c4a973] text-[#1a1d1a]' 
              : 'bg-white/5 text-gray-500 border border-white/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* TIMELINE DES SESSIONS */}
      <div className="relative z-10 space-y-6 border-l-2 border-white/5 ml-4 pl-8">
        {sessions.map((session) => (
          <div key={session.id} className="relative group">
            {/* Le point sur la ligne du temps */}
            <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a1d1a] border-4 border-[#c4a973] group-hover:scale-125 transition-transform" />
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between hover:bg-white/10 transition-all">
              <div className="flex items-center gap-8">
                {/* Heure */}
                <div className="text-[#c4a973] font-black text-xl w-24">
                  {session.start}
                </div>
                
                {/* Infos */}
                <div>
                  <h3 className="text-white font-bold text-lg">{session.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-gray-500 text-xs">
                    <span className="flex items-center gap-1"><User size={12}/> {session.speaker.name}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> {session.room}</span>
                  </div>
                </div>
              </div>

              <button className="p-4 rounded-full bg-white/5 text-[#c4a973] hover:bg-[#c4a973] hover:text-[#1a1d1a] transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}