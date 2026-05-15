"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Ticket, 
  Heart, 
  LogOut,
  Users
} from 'lucide-react';

const menuItems = [
  {
    group: "Principal",
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/client/dashboard' },
      { name: 'Planning', icon: CalendarDays, href: '/client/planning' },
    ]
  },
  {
    group: "Événements",
    items: [
      { name: 'Sessions', icon: Ticket, href: '/client/sessions' },
      { name: 'Favoris', icon: Heart, href: '/client/favorites' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-[#1a1d1a] border-r border-white/10 flex flex-col relative overflow-hidden shrink-0">
      
      {/* Effet de grille inversée (comme sur l'image) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Logo Section */}
      <div className="p-8 relative z-10 flex flex-col items-center gap-4">
        <div className="w-32 h-32 relative">
          <Image 
            src="/Tendak_anina_logo-removebg-preview.png" 
            alt="Tendak Anina" 
            fill 
            className="object-contain"
          />
        </div>
        <p className="text-[#c4a973] font-black uppercase italic tracking-tighter text-xl">
          Tendak'Anina
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 relative z-10 overflow-y-auto">
        {menuItems.map((group) => (
          <div key={group.group} className="space-y-2">
            <p className="px-4 text-[10px] uppercase tracking-[0.3em] text-[#c4a973]/50 font-black">
              {group.group}
            </p>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-[#c4a973] text-[#1a1d1a] shadow-lg shadow-[#c4a973]/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <item.icon size={20} className={isActive ? 'text-[#1a1d1a]' : 'group-hover:text-[#c4a973]'} />
                  <span className="text-sm font-bold">{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bouton Quitter */}
      <div className="p-6 border-t border-white/5 relative z-10">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all group">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
            <LogOut size={16} />
          </div>
          <span className="font-black text-[10px] uppercase tracking-widest">Quitter</span>
        </button>
      </div>
    </aside>
  );
}