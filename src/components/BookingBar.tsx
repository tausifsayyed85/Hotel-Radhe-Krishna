import React, { useState } from 'react';
import { Calendar, Users, Home, Phone, ArrowRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface BookingBarProps {
  onCheckAvailability: (bookingData: {
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
  }) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onCheckAvailability }) => {
  // Default to today and tomorrow
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState('2 Adults');
  const [rooms, setRooms] = useState('1 Room');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      guests,
      rooms,
    });
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 -mt-16 md:-mt-12 z-30">
      <div className="bg-[#faf8f4] rounded-lg shadow-xl border border-[#ebe4d8] p-4 md:p-6 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
          {/* Check-In */}
          <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#ebe4d8] pr-3 pb-2 sm:pb-0">
            <span className="text-[11px] font-semibold tracking-widest text-[#4c5a3d] uppercase flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#b79a62]" />
              Check-In
            </span>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-[#1c2618] font-medium text-sm focus:outline-none cursor-pointer"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col border-b sm:border-b-0 lg:border-r border-[#ebe4d8] pr-3 pb-2 sm:pb-0">
            <span className="text-[11px] font-semibold tracking-widest text-[#4c5a3d] uppercase flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#b79a62]" />
              Check-Out
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-[#1c2618] font-medium text-sm focus:outline-none cursor-pointer"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-[#ebe4d8] pr-3 pb-2 sm:pb-0">
            <span className="text-[11px] font-semibold tracking-widest text-[#4c5a3d] uppercase flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-[#b79a62]" />
              Guests
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-[#1c2618] font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="1 Adult">1 Adult</option>
              <option value="2 Adults">2 Adults</option>
              <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
              <option value="3 Adults">3 Adults</option>
              <option value="4+ Family">4+ Family Group</option>
            </select>
          </div>

          {/* Rooms */}
          <div className="flex flex-col pr-3 pb-2 sm:pb-0">
            <span className="text-[11px] font-semibold tracking-widest text-[#4c5a3d] uppercase flex items-center gap-1.5 mb-1">
              <Home className="w-3.5 h-3.5 text-[#b79a62]" />
              Rooms
            </span>
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full bg-transparent text-[#1c2618] font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="1 Room">1 AC Room</option>
              <option value="2 Rooms">2 AC Rooms</option>
              <option value="3+ Rooms">3+ AC Rooms</option>
            </select>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col gap-1.5">
            <button
              type="submit"
              className="w-full bg-[#24301f] text-[#faf8f4] hover:bg-[#39452d] border border-[#b79a62]/80 px-4 py-3 rounded text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow hover:shadow-md group"
            >
              <span>CHECK AVAILABILITY</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#b79a62] group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="text-[11px] text-center text-[#4c5a3d] hover:text-[#b79a62] flex items-center justify-center gap-1 transition-colors"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>Or call {HOTEL_INFO.phone}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
