import React from 'react';
import { AMENITIES_LIST } from '../data/hotelData';
import { Wind, Wifi, Car, Clock, Utensils, Shirt, Navigation, HeartHandshake } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Wind,
  Wifi,
  Car,
  Clock,
  Utensils,
  Shirt,
  Navigation,
  HeartHandshake,
};

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="py-20 md:py-28 bg-[#faf8f4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#b79a62] uppercase">
            PROPERTY COMFORTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] font-normal">
            Hotel Amenities &amp; Services
          </h2>
          <div className="w-12 h-[2px] bg-[#b79a62] mx-auto"></div>
          <p className="text-sm md:text-base text-[#4c5a3d]">
            Everything necessary for a relaxing overnight rest or dining refreshment on the Asian Highway 46 corridor.
          </p>
        </div>

        {/* Amenities 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_LIST.map((amenity, idx) => {
            const IconComponent = iconMap[amenity.iconName] || Wind;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-[#f5f1e8] border border-[#ebe4d8] hover:border-[#b79a62] transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-[#faf8f4] border border-[#ebe4d8] flex items-center justify-center text-[#24301f] group-hover:bg-[#24301f] group-hover:text-[#d6be90] transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1c2618] group-hover:text-[#39452d] transition-colors">
                    {amenity.title}
                  </h3>
                  <p className="text-xs text-[#4c5a3d] font-light leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Stay Here (Editorial 3-Block Section) */}
        <div className="mt-24 pt-16 border-t border-[#ebe4d8]">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#b79a62] uppercase">
              WHY GUESTS CHOOSE US
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1c2618]">
              Everything You Need, Close at Hand
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f5f1e8] p-8 rounded-lg border border-[#ebe4d8] relative overflow-hidden space-y-4">
              <span className="font-serif text-5xl font-light text-[#b79a62]/30 select-none block">
                01
              </span>
              <h4 className="font-serif text-xl font-bold text-[#1c2618]">
                COMFORT
              </h4>
              <p className="text-sm text-[#4c5a3d] font-light leading-relaxed">
                Individual split air conditioning units, clean bedding, 24/7 hot water, and quiet insulated highway glazing ensure every guest wakes up rested and refreshed.
              </p>
            </div>

            <div className="bg-[#f5f1e8] p-8 rounded-lg border border-[#ebe4d8] relative overflow-hidden space-y-4">
              <span className="font-serif text-5xl font-light text-[#b79a62]/30 select-none block">
                02
              </span>
              <h4 className="font-serif text-xl font-bold text-[#1c2618]">
                DINING
              </h4>
              <p className="text-sm text-[#4c5a3d] font-light leading-relaxed">
                A dedicated 100% pure vegetarian kitchen serving freshly cooked North Indian, Maharashtrian, and Chinese meals directly in the dining hall or via room service.
              </p>
            </div>

            <div className="bg-[#f5f1e8] p-8 rounded-lg border border-[#ebe4d8] relative overflow-hidden space-y-4">
              <span className="font-serif text-5xl font-light text-[#b79a62]/30 select-none block">
                03
              </span>
              <h4 className="font-serif text-xl font-bold text-[#1c2618]">
                CONVENIENCE
              </h4>
              <p className="text-sm text-[#4c5a3d] font-light leading-relaxed">
                Direct highway access on Asian Highway 46, ample paved car parking, high-speed Wi-Fi, 24/7 reception desk, and proximity to Bhusawal Junction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
