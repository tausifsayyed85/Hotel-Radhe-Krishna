import React from 'react';
import { Wind, Wifi, Car, UtensilsCrossed, Clock } from 'lucide-react';

export const PropertyBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Wind,
      title: 'AIR CONDITIONING',
      desc: 'Comfortable climate-controlled rooms',
    },
    {
      icon: Wifi,
      title: 'WI-FI CONNECTIVITY',
      desc: 'High-speed wireless internet',
    },
    {
      icon: Car,
      title: 'ON-SITE PARKING',
      desc: 'Convenient paved vehicle parking',
    },
    {
      icon: UtensilsCrossed,
      title: 'PURE VEG DINING',
      desc: '100% pure vegetarian restaurant',
    },
    {
      icon: Clock,
      title: '24/7 FRONT DESK',
      desc: 'Assistance whenever you need it',
    },
  ];

  return (
    <section id="benefits" className="pt-20 pb-12 bg-[#f5f1e8] border-b border-[#ebe4d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-[#faf8f4] border border-[#ebe4d8] hover:border-[#b79a62]/50 transition-all duration-300 hover:shadow-sm group"
              >
                <div className="w-12 h-12 rounded-full bg-[#f5f1e8] border border-[#d6be90]/40 flex items-center justify-center text-[#24301f] group-hover:bg-[#24301f] group-hover:text-[#d6be90] transition-colors mb-3">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <h2 className="font-serif text-xs md:text-sm font-bold tracking-wider text-[#1c2618] uppercase mb-1">
                  {item.title}
                </h2>
                <p className="text-xs text-[#4c5a3d] font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
