import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1c2618]/95 backdrop-blur-md border-t border-[#39452d] px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
      <a
        href={`tel:${HOTEL_INFO.phoneClean}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded bg-white/10 hover:bg-white/20 text-[#e9e3d7] text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-[#b79a62]" />
        <span>CALL</span>
      </a>

      <a
        href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Hotel%20Radha%20Krishna,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
        target="_blank"
        rel="noreferrer noopener"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WHATSAPP</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded bg-[#b79a62] hover:bg-[#c5a86d] text-[#1c2618] text-xs font-bold uppercase tracking-wider transition-colors shadow"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>BOOK</span>
      </button>
    </div>
  );
};
