import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface AboutSectionProps {
  onExploreRooms: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreRooms }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#faf8f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#b79a62] uppercase">
              <span className="w-8 h-[1px] bg-[#b79a62]"></span>
              <span>WELCOME TO HOTEL RADHA KRISHNA</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] leading-tight font-normal">
              A Warm Stay in the <br />
              <span className="italic text-[#39452d]">Heart of Kandari, Bhusawal</span>
            </h2>

            <p className="text-base text-[#4c5a3d] leading-relaxed">
              Hotel Radha Krishna brings together comfortable accommodation, authentic pure vegetarian dining, and courteous hospitality in Kandari, near Bhusawal.
            </p>

            <p className="text-sm md:text-base text-[#4c5a3d]/90 leading-relaxed">
              Thoughtfully created for traveling families, pilgrim travelers, business executives, and highway motorists looking for a restful stop along the Asian Highway 46 / Varangaon Road corridor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                '100% Pure Vegetarian Cuisine',
                'Climate-Controlled AC Rooms',
                'Paved On-Site Parking',
                '24-Hour Reception Desk',
                'High-Speed Wi-Fi Throughout',
                'Adjacent to Lal Jain Mandir',
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#1c2618]">
                  <CheckCircle2 className="w-4 h-4 text-[#b79a62] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreRooms}
                className="bg-[#24301f] text-[#faf8f4] hover:bg-[#39452d] px-7 py-3 rounded text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 shadow"
              >
                <span>DISCOVER OUR HOTEL</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#b79a62]" />
              </button>
            </div>
          </div>

          {/* Right Photographic Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-[#ebe4d8]">
              <img
                src="/images/hotel_restaurant_hall.jpg"
                alt="Contemporary pure vegetarian restaurant dining hall at Hotel Radha Krishna"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141b12]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#d6be90] font-semibold">
                  Pure Veg Dining Hall
                </span>
                <p className="text-sm font-light text-stone-200">
                  Family dining and wholesome North Indian, Maharashtrian, and Chinese meals.
                </p>
              </div>
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-[#24301f] text-[#faf8f4] border border-[#b79a62] p-4 sm:p-5 rounded shadow-xl max-w-[220px]">
              <div className="flex items-center gap-2 text-[#d6be90] text-xs font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>RATED 4.0 / 5.0</span>
              </div>
              <p className="text-[11px] text-[#e9e3d7] font-light leading-snug">
                Trusted by 1,900+ Google reviewers for food &amp; hospitality.
              </p>
            </div>
          </div>
        </div>

        {/* Hotel Story Banner: MORE THAN A PLACE TO STAY */}
        <div className="mt-24 bg-[#24301f] text-[#faf8f4] rounded-xl p-8 md:p-14 relative overflow-hidden shadow-xl border border-[#39452d]">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#b79a62]/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#d6be90] uppercase">
              HOTEL STORY
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-tight">
              More Than a Place to Stay: <br />
              <span className="italic text-[#d6be90]">Lodging &amp; Dining Under One Roof</span>
            </h3>
            <p className="text-sm sm:text-base text-[#e9e3d7] font-light leading-relaxed max-w-3xl">
              Hotel Radha Krishna combines modern roadside lodging and a full-service pure vegetarian dining room under one destination. Whether you are pausing on a long highway drive, attending family events in Kandari, or visiting Bhusawal for commercial work, our staff welcomes you with attentive warmth, quiet rooms, and pure vegetarian food prepared fresh daily.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {[
                { label: 'Comfortable Rooms', sub: 'Air-conditioned' },
                { label: 'Pure Veg Food', sub: 'Authentic taste' },
                { label: 'Highway Access', sub: 'Asian Highway 46' },
                { label: 'Family Friendly', sub: 'Safe & quiet' },
                { label: 'On-Site Parking', sub: 'Spacious & secure' },
                { label: 'Room Service', sub: 'Fresh dining' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded bg-white/5 border border-white/10">
                  <div className="text-xs font-semibold text-[#d6be90]">{item.label}</div>
                  <div className="text-[10px] text-stone-300 font-light">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
