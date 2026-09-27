import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { ArrowDown, Utensils, Wind, Wifi, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow }) => {
  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-[96vh] flex items-center justify-center overflow-hidden pt-24 pb-28">
      {/* Background Image with Authentic Hotel Radha Krishna Architecture */}
      <div className="absolute inset-0 z-0">
        <img
          src="/HOTEL OVERVIEW.png"
          alt="Front exterior of Hotel Radha Krishna in Kandari, Bhusawal illuminated at dusk"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/hotel-overview.png')) {
              target.src = '/hotel-overview.png';
            }
          }}
        />
        {/* Cinematic gradient overlay balancing readability and architectural realism */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141b12]/85 via-[#141b12]/60 to-[#141b12]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141b12] via-transparent to-[#141b12]/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf8f4]/10 backdrop-blur-md border border-[#b79a62]/40 text-[#d6be90] text-xs font-medium tracking-[0.25em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b79a62] animate-pulse"></span>
            <span>HOTEL RADHA KRISHNA • BHUSAWAL, MAHARASHTRA</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#faf8f4] leading-[1.1] tracking-tight">
            A Comfortable Stay. <br />
            <span className="italic font-light text-[#d6be90]">A Pure Vegetarian</span> <br />
            Dining Experience.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#e9e3d7] font-light max-w-2xl leading-relaxed">
            Stay, dine, and relax at Hotel Radha Krishna — your welcoming highway hospitality destination on the Varangaon Road corridor in Kandari, near Bhusawal.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onBookNow}
              className="bg-[#b79a62] hover:bg-[#c5a86d] text-[#1c2618] px-8 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              BOOK YOUR STAY
            </button>
            <a
              href="#about"
              className="inline-flex items-center justify-center border border-[#e9e3d7]/60 hover:border-white text-white hover:bg-white/10 px-7 py-3.5 rounded text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              EXPLORE HOTEL
            </a>
          </div>

          {/* Quick Highlight Pills */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#e9e3d7] text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#b79a62] shrink-0" />
              <span>PURE VEG DINING</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#b79a62] shrink-0" />
              <span>AC ROOMS</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#b79a62] shrink-0" />
              <span>HIGH-SPEED WI-FI</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b79a62] shrink-0" />
              <span>SECURE PARKING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#benefits"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-[11px] tracking-widest text-[#d6be90] hover:text-white uppercase transition-colors"
      >
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};
