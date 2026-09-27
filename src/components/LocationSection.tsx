import React from 'react';
import { HOTEL_INFO, NEARBY_PLACES } from '../data/hotelData';
import { MapPin, Phone, MessageSquare, Navigation, ExternalLink, Compass } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#faf8f4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#b79a62] uppercase">
            FIND US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] font-normal">
            Prime Highway Location
          </h2>
          <div className="w-12 h-[2px] bg-[#b79a62] mx-auto"></div>
          <p className="text-sm md:text-base text-[#4c5a3d]">
            Conveniently situated along the Asian Highway 46 / Varangaon Road corridor in Kandari, Bhusawal.
          </p>
        </div>

        {/* Location Grid: Left Info, Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Details */}
          <div className="lg:col-span-5 bg-[#f5f1e8] rounded-xl border border-[#ebe4d8] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b79a62] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>HOTEL ADDRESS</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#1c2618]">
                Hotel Radha Krishna
              </h3>

              <div className="text-sm text-[#4c5a3d] space-y-1 leading-relaxed">
                <p className="font-medium text-[#1c2618]">{HOTEL_INFO.address.street},</p>
                <p>{HOTEL_INFO.address.landmark},</p>
                <p>{HOTEL_INFO.address.city},</p>
                <p>{HOTEL_INFO.address.state} {HOTEL_INFO.address.pincode}, {HOTEL_INFO.address.country}</p>
              </div>

              <div className="pt-2 border-t border-[#ebe4d8] space-y-2 text-xs text-[#1c2618]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#b79a62]" />
                  <a href={`tel:${HOTEL_INFO.phoneClean}`} className="hover:text-[#b79a62] font-semibold text-sm">
                    {HOTEL_INFO.phone}
                  </a>
                </div>
                <div className="text-stone-500 text-[11px] pl-6">
                  Front desk &amp; reservations available 24 hours a day
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4">
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] py-3 rounded text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Navigation className="w-3.5 h-3.5 text-[#b79a62]" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="border border-[#24301f] text-[#24301f] hover:bg-[#24301f] hover:text-white py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#b79a62]" />
                  <span>CALL HOTEL</span>
                </a>

                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Hotel%20Radha%20Krishna,%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20dining.`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Map */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#ebe4d8] shadow-md min-h-[380px] bg-stone-200">
            <iframe
              src={HOTEL_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Radha Krishna Location Map"
            ></iframe>
          </div>
        </div>

        {/* Nearby Places Section */}
        <div className="pt-12 border-t border-[#ebe4d8]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase">
                EXPLORE NEARBY
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1c2618]">
                Key Local Sights &amp; Landmarks
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-[#4c5a3d]">
              <Compass className="w-4 h-4 text-[#b79a62]" />
              <span>Verified local distances</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEARBY_PLACES.map((place, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#f5f1e8] border border-[#ebe4d8] hover:border-[#b79a62] transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-[#b79a62] uppercase tracking-wider">
                    {place.type}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#1c2618]">
                    {place.name}
                  </h4>
                  <p className="text-xs text-[#4c5a3d] font-light leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ebe4d8] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1c2618]">
                    {place.distance}
                  </span>
                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[#24301f] hover:text-[#b79a62] text-xs flex items-center gap-1 font-semibold uppercase tracking-wider"
                  >
                    <span>Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
