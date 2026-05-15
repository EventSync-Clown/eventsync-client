"use client";

import { events, sessions } from "@/app/lib/data";
import SessionCard from "@/app/components/client/SessionCard";
import EventCard from "@/app/components/client/EventCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // On ne garde que les sessions en direct pour l'aspect "Vitrine Live"
  const liveSessions = sessions.filter(s => s.live);

  return (
    <div className="min-h-screen bg-[#1a1d1a] p-8 space-y-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#c4a973]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- SECTION 1: HERO EVENT --- */}
      <header className="relative z-10 space-y-8">
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-12 bg-[#c4a973]"></div>
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-[#c4a973]/80">À l'affiche</span>
        </div>
        
        {/* On affiche le premier événement de la liste comme vitrine */}
        {events.length > 0 && (
          <EventCard 
            title={events[0].title}
            description={events[0].description}
            location={events[0].location}
          />
        )}
      </header>

      {/* --- SECTION 2: LIVE NOW --- */}
      <section className="relative z-10">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Expériences <span className="text-[#c4a973] italic">en direct</span>
            </h2>
            <p className="text-gray-500 font-medium">Rejoignez les sessions interactives en cours.</p>
          </div>

          <Link 
            href="/client/sessions" 
            className="group flex items-center gap-3 text-[#c4a973] font-black text-xs uppercase tracking-[0.2em] hover:opacity-80 transition-all"
          >
            Découvrir tout le programme
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {liveSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {liveSessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="p-20 rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 font-bold italic">Aucune session n'est diffusée en direct pour le moment.</p>
            <Link href="/client/sessions" className="mt-4 text-[#c4a973] text-sm underline decoration-1 underline-offset-4">
              Consulter le planning complet
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}