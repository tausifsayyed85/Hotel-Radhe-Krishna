import React from 'react';
import { ArrowRight, ExternalLink, Sparkles, UtensilsCrossed } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface DiningSectionProps {
  onExploreMenu: () => void;
  onTableEnquiry: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({ onExploreMenu, onTableEnquiry }) => {
  const signatureItems = [
    {
      name: 'Paneer Tikka',
      desc: 'Spiced tandoori marinated cottage cheese char-grilled with capsicum & onion.',
      badge: 'Tandoor Specialty',
    },
    {
      name: 'Radha Krishna Special',
      desc: 'Chef’s signature double-gravy vegetable and paneer specialty.',
      badge: 'House Special',
    },
    {
      name: 'Dal Tadka (Desi Ghee)',
      desc: 'Yellow lentils tempered with fragrant cumin seeds, garlic, and dry red chillies.',
      badge: 'Guest Favourite',
    },
    {
      name: 'Veg Kolhapuri',
      desc: 'Authentic Maharashtrian spiced curry with rich coconut-chilli gravy.',
      badge: 'Local Flavours',
    },
    {
      name: 'Veg Manchurian',
      desc: 'Crispy vegetable dumplings tossed in garlic-soy Indo-Chinese sauce.',
      badge: 'Indo-Chinese',
    },
    {
      name: 'Veg Dum Biryani',
      desc: 'Slow-cooked fragrant basmati rice layered with garden vegetables & aromatic spices.',
      badge: 'Clay Pot Dum',
    },
  ];

  return (
    <section id="dining" className="py-20 md:py-28 bg-[#faf8f4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#24301f]/10 text-[#24301f] text-xs font-semibold tracking-[0.25em] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>100% PURE VEGETARIAN DINING</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#1c2618] font-normal leading-tight">
              Fresh. Comforting. <br />
              <span className="italic text-[#39452d]">Pure Vegetarian.</span>
            </h2>

            <p className="text-base text-[#4c5a3d] leading-relaxed">
              At Hotel Radha Krishna, we take immense pride in our authentic, strictly pure vegetarian culinary tradition. From hearty North Indian curries and sizzling clay-oven tandoor appetizers to regional Maharashtrian specialties and Indo-Chinese favorites, every dish is prepared with fresh ingredients and wholesome hygiene.
            </p>

            {/* Cuisines Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['North Indian', 'Maharashtrian', 'Rajasthani', 'Indo-Chinese', 'Pizza & Bites', 'Tandoor', 'Rice & Biryani'].map((cuisine, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#f5f1e8] text-[#24301f] border border-[#d6be90]/40 rounded-full text-xs font-medium"
                >
                  {cuisine}
                </span>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] px-7 py-3 rounded text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 shadow"
              >
                <span>EXPLORE FULL MENU</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#b79a62]" />
              </button>

              <a
                href={HOTEL_INFO.zomatoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 border border-[#b79a62] text-[#24301f] hover:bg-[#b79a62]/10 px-5 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <span>VIEW ON ZOMATO</span>
                <ExternalLink className="w-3 h-3 text-[#b79a62]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-[#ebe4d8]">
              <img
                src="/images/hotel_signature_food.jpg"
                alt="Signature pure vegetarian dishes at Hotel Radha Krishna Kandari Bhusawal"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Signature Dishes Cards */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8 border-b border-[#ebe4d8] pb-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase">
                FEATURED HIGHLIGHTS
              </span>
              <h3 className="font-serif text-2xl text-[#1c2618]">
                Signature Vegetarian Favourites
              </h3>
            </div>

            <button
              onClick={onExploreMenu}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#24301f] hover:text-[#b79a62] tracking-wider uppercase"
            >
              <span>See All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureItems.map((dish, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-[#faf8f4] border border-[#ebe4d8] hover:border-[#b79a62] transition-all duration-300 hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-wider text-[#b79a62] uppercase px-2 py-0.5 rounded bg-[#f5f1e8] border border-[#d6be90]/40">
                      {dish.badge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full border border-emerald-600 flex items-center justify-center p-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#1c2618] group-hover:text-[#39452d] transition-colors">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-[#4c5a3d] font-light leading-relaxed">
                    {dish.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-[#ebe4d8]/60 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">100% Pure Veg</span>
                  <button
                    onClick={onTableEnquiry}
                    className="text-xs font-semibold text-[#24301f] group-hover:text-[#b79a62] flex items-center gap-1 transition-colors uppercase tracking-wider"
                  >
                    <span>Reserve Table</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
