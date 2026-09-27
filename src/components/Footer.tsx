import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { MapPin, Phone, MessageSquare, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <>
      {/* FINAL CTA SECTION */}
      <section className="bg-[#1c2618] text-[#faf8f4] py-20 border-t border-[#39452d] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#39452d]/40 to-transparent pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#d6be90] uppercase block">
            WELCOME TO BHUSAWAL
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight">
            Your Next Stay Starts Here.
          </h2>

          <p className="text-sm sm:text-base text-[#e9e3d7] font-light max-w-2xl mx-auto leading-relaxed">
            Comfortable air-conditioned rooms, authentic pure vegetarian dining, and attentive highway hospitality in Kandari, Bhusawal.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#b79a62] hover:bg-[#c5a86d] text-[#1c2618] px-8 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            >
              BOOK YOUR STAY
            </button>

            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="inline-flex items-center gap-2 border border-[#d6be90]/60 hover:border-white text-white hover:bg-white/10 px-6 py-3.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#b79a62]" />
              <span>CALL HOTEL: {HOTEL_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Hotel%20Radha%20Krishna,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#141b12] text-[#e9e3d7] pt-16 pb-24 md:pb-12 border-t border-[#39452d]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#39452d]/60">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#b79a62]/20 border border-[#b79a62] flex items-center justify-center text-[#d6be90]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2C11.5 5 9 8 7 10C5 12 4 14.5 4 17C4 19.5 6.5 21 12 21C17.5 21 20 19.5 20 17C20 14.5 19 12 17 10C15 8 12.5 5 12 2Z" opacity="0.3"/>
                    <path d="M12 6C11 8.5 9.5 11 8 12.5C7 13.5 6 15 6 17C6 18.5 7.5 19.5 12 19.5C16.5 19.5 18 18.5 18 17C18 15 17 13.5 16 12.5C14.5 11 13 8.5 12 6Z" fill="#b79a62"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wider">
                    HOTEL RADHA KRISHNA
                  </h3>
                  <p className="text-[10px] text-[#b79a62] font-semibold tracking-widest uppercase">
                    PURE VEG RESTAURANT • LODGING &amp; BOARDING
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
                Authentic highway hospitality on Asian Highway 46 in Kandari, Bhusawal. Offering comfortable air-conditioned lodging, delicious pure vegetarian meals, ample parking, and 24/7 service.
              </p>

              <div className="flex items-center gap-3 text-xs text-[#d6be90]">
                <ShieldCheck className="w-4 h-4" />
                <span>4.0 / 5.0 Google Rating (1,900+ Reviews)</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white">
                EXPLORE
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><a href="#home" className="hover:text-[#b79a62] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#b79a62] transition-colors">About Us</a></li>
                <li><a href="#rooms" className="hover:text-[#b79a62] transition-colors">Rooms &amp; Tariff</a></li>
                <li><a href="#dining" className="hover:text-[#b79a62] transition-colors">Pure Veg Dining</a></li>
                <li><a href="#menu" className="hover:text-[#b79a62] transition-colors">Digital Menu</a></li>
                <li><a href="#amenities" className="hover:text-[#b79a62] transition-colors">Amenities</a></li>
                <li><a href="#gallery" className="hover:text-[#b79a62] transition-colors">Photo Gallery</a></li>
                <li><a href="#reviews" className="hover:text-[#b79a62] transition-colors">Guest Reviews</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white">
                PROPERTY ADDRESS
              </h4>
              <div className="text-xs text-stone-400 space-y-1.5 leading-relaxed">
                <p className="text-white font-medium">Hotel Radha Krishna</p>
                <p>Asian Highway, 46, Varangaon Road,</p>
                <p>Near Lal Jain Mandir, Sakari Phata,</p>
                <p>Kandari, Maharashtra 425201, India</p>
              </div>

              <div className="pt-2 text-xs space-y-1">
                <div className="text-white font-medium">Phone Support:</div>
                <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-[#b79a62] hover:underline block font-semibold">
                  {HOTEL_INFO.phone}
                </a>
                <span className="text-[11px] text-stone-500">Front Desk: Open 24/7</span>
              </div>
            </div>

            {/* Direct Connect & Integrations */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white">
                ONLINE PROFILES
              </h4>
              <div className="space-y-2 text-xs">
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 text-stone-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span>Google Maps &amp; Reviews</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>

                <a
                  href={HOTEL_INFO.zomatoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 text-stone-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-red-400 text-xs">Z</span>
                    <span>Zomato Restaurant Listing</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Hotel%20Radha%20Krishna`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between p-2.5 rounded bg-white/5 hover:bg-white/10 text-stone-300 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Direct Desk</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              &copy; 2026 Hotel Radha Krishna. All Rights Reserved. Kandari, Bhusawal.
            </div>

            <div className="flex items-center gap-6">
              <span>Pure Vegetarian Dining</span>
              <span>•</span>
              <span>Lodging &amp; Boarding</span>
              <span>•</span>
              <a href="#contact" className="hover:text-stone-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
