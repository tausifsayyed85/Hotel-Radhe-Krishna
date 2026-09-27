import React, { useState } from 'react';
import { ROOM_CATEGORIES } from '../data/hotelData';
import { RoomCategory } from '../types';
import { Wind, Wifi, Tv, Bath, Utensils, Check, ArrowRight, Eye, Phone } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface RoomsSectionProps {
  onEnquireRoom: (room: RoomCategory) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onEnquireRoom }) => {
  const [selectedRoomModal, setSelectedRoomModal] = useState<RoomCategory | null>(null);

  return (
    <section id="rooms" className="py-20 md:py-28 bg-[#f5f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#b79a62] uppercase">
            STAY WITH US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] font-normal">
            Comfort for Every Journey
          </h2>
          <div className="w-12 h-[2px] bg-[#b79a62] mx-auto"></div>
          <p className="text-sm md:text-base text-[#4c5a3d]">
            Spotless air-conditioned rooms designed for highway travelers, commercial guests, and visiting families.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOM_CATEGORIES.map((room) => (
            <div
              key={room.id}
              className="bg-[#faf8f4] rounded-lg overflow-hidden border border-[#ebe4d8] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group relative"
            >
              {/* Subtle Gold Line Animation on Hover */}
              <div className="h-1 w-0 bg-[#b79a62] group-hover:w-full transition-all duration-500 ease-out"></div>

              {/* Room Image */}
              <div className="relative h-60 overflow-hidden bg-stone-200">
                <img
                  src={room.imageUrl}
                  alt={`${room.name} at Hotel Radha Krishna Kandari Bhusawal`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#1c2618]/85 backdrop-blur-sm text-[#e9e3d7] px-3 py-1 rounded text-[11px] font-medium tracking-wider uppercase border border-[#b79a62]/30">
                  {room.capacity}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-[#b79a62] uppercase">
                      AC ACCOMMODATION
                    </span>
                    <span className="text-xs text-stone-500">{room.sizeSqFt}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1c2618] font-bold group-hover:text-[#39452d] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4c5a3d] line-clamp-2 font-light">
                    {room.description}
                  </p>
                </div>

                {/* Key Amenities Strip */}
                <div className="pt-2 border-t border-[#ebe4d8] grid grid-cols-2 gap-2 text-xs text-[#1c2618]">
                  <div className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span className="text-[11px]">Split AC</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span className="text-[11px]">High-speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span className="text-[11px]">Flat TV</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span className="text-[11px]">Hot Water Bath</span>
                  </div>
                </div>

                {/* Tariff note according to strict pricing rule */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#4c5a3d] bg-[#f5f1e8] p-2.5 rounded">
                  <span className="font-medium text-[11px] uppercase tracking-wider">Tariff:</span>
                  <span className="font-semibold text-[#1c2618] text-[11px]">Contact hotel for current rate</span>
                </div>

                {/* Actions */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedRoomModal(room)}
                    className="border border-[#b79a62] text-[#24301f] hover:bg-[#b79a62]/10 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span>DETAILS</span>
                  </button>

                  <button
                    onClick={() => onEnquireRoom(room)}
                    className="bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 shadow"
                  >
                    <span>ENQUIRE</span>
                    <ArrowRight className="w-3 h-3 text-[#b79a62]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note banner */}
        <div className="mt-12 text-center text-xs text-[#4c5a3d] font-light max-w-xl mx-auto">
          * Room tariffs vary seasonally. For direct booking inquiries and immediate check-in assistance, please call our 24/7 reception desk at <a href={`tel:${HOTEL_INFO.phoneClean}`} className="font-semibold text-[#24301f] underline">{HOTEL_INFO.phone}</a>.
        </div>
      </div>

      {/* Room Details Modal */}
      {selectedRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#faf8f4] rounded-lg max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[#ebe4d8] shadow-2xl relative">
            <button
              onClick={() => setSelectedRoomModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase">
                ACCOMMODATION DETAILS
              </span>
              <h3 className="font-serif text-2xl text-[#1c2618] font-bold">
                {selectedRoomModal.name}
              </h3>
              <p className="text-xs text-[#4c5a3d]">{selectedRoomModal.subtitle}</p>
            </div>

            <div className="rounded overflow-hidden h-48 bg-stone-200">
              <img
                src={selectedRoomModal.imageUrl}
                alt={selectedRoomModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#4c5a3d] leading-relaxed">
              {selectedRoomModal.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#1c2618] uppercase tracking-wider">
                Included Amenities:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#39452d]">
                {selectedRoomModal.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#ebe4d8] flex items-center justify-between gap-4">
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#24301f] hover:text-[#b79a62]"
              >
                <Phone className="w-3.5 h-3.5 text-[#b79a62]" />
                <span>Call Front Desk</span>
              </a>

              <button
                onClick={() => {
                  const room = selectedRoomModal;
                  setSelectedRoomModal(null);
                  onEnquireRoom(room);
                }}
                className="bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] px-6 py-2.5 rounded text-xs font-semibold tracking-widest uppercase transition-colors shadow"
              >
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
