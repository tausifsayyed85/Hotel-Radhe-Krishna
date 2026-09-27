import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MessageSquare, Send, Calendar, Users, Home } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { submitEnquiry } from '../firebase';
import { useAuth } from '../context/AuthContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'room_booking' | 'restaurant_table' | 'event_banquet';
  initialRoomName?: string;
  initialDates?: {
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
  };
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialType = 'room_booking',
  initialRoomName = '',
  initialDates,
}) => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'room_booking' | 'restaurant_table' | 'event_banquet'>(initialType);
  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || today);
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut || tomorrow);
  const [guests, setGuests] = useState(initialDates?.guests || '2 Adults');
  const [roomPreference, setRoomPreference] = useState(initialRoomName || 'Executive AC Room');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (user.displayName) setFullName(user.displayName);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (initialType) setType(initialType);
    if (initialRoomName) setRoomPreference(initialRoomName);
    if (initialDates) {
      setCheckIn(initialDates.checkIn);
      setCheckOut(initialDates.checkOut);
      setGuests(initialDates.guests);
    }
  }, [initialType, initialRoomName, initialDates]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docId = await submitEnquiry({
        fullName,
        mobileNumber,
        email: email || user?.email || '',
        type,
        checkInDate: checkIn,
        checkOutDate: type === 'room_booking' ? checkOut : undefined,
        guestsCount: parseInt(guests) || 2,
        roomPreference: type === 'room_booking' ? roomPreference : undefined,
        specialRequests,
        userId: user?.uid || 'guest',
        userEmail: user?.email || email || '',
      });

      setSubmittedId(docId);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmittedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#faf8f4] rounded-xl max-w-xl w-full p-6 sm:p-8 border border-[#ebe4d8] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetForm}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedId ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase block">
              RESERVATION INQUIRY RECEIVED
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#1c2618] font-bold">
              Thank You, {fullName}!
            </h3>

            <p className="text-sm text-[#4c5a3d] max-w-md mx-auto leading-relaxed">
              Your inquiry has been recorded in our reservation desk under reference ID <code className="bg-[#ebe4d8] px-2 py-0.5 rounded text-xs font-mono text-[#1c2618]">{submittedId}</code>. Our team will verify room availability and contact you shortly.
            </p>

            <div className="pt-4 border-t border-[#ebe4d8] flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Hotel%20Radha%20Krishna,%20I%20just%20submitted%20reservation%20inquiry%20${submittedId}%20for%20${encodeURIComponent(fullName)}.`}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#24301f] text-[#24301f] hover:bg-[#24301f] hover:text-white px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-[#b79a62]" />
                <span>CALL DESK</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={resetForm}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase">
                HOTEL RADHA KRISHNA • RESERVATIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1c2618] font-normal">
                Plan Your Stay or Dining
              </h3>
              <p className="text-xs text-[#4c5a3d]">
                Enter your details below to check availability or request a booking.
              </p>
            </div>

            {/* Type selector */}
            <div className="flex rounded-lg bg-[#f5f1e8] p-1 border border-[#ebe4d8]">
              <button
                type="button"
                onClick={() => setType('room_booking')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors ${
                  type === 'room_booking'
                    ? 'bg-[#24301f] text-[#faf8f4] shadow-sm'
                    : 'text-[#4c5a3d] hover:text-[#1c2618]'
                }`}
              >
                Room Booking
              </button>
              <button
                type="button"
                onClick={() => setType('restaurant_table')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors ${
                  type === 'restaurant_table'
                    ? 'bg-[#24301f] text-[#faf8f4] shadow-sm'
                    : 'text-[#4c5a3d] hover:text-[#1c2618]'
                }`}
              >
                Restaurant Table
              </button>
              <button
                type="button"
                onClick={() => setType('event_banquet')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors ${
                  type === 'event_banquet'
                    ? 'bg-[#24301f] text-[#faf8f4] shadow-sm'
                    : 'text-[#4c5a3d] hover:text-[#1c2618]'
                }`}
              >
                Group / Event
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                />
              </div>

              {type === 'room_booking' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#b79a62]" />
                        <span>Check-In Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        min={today}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#b79a62]" />
                        <span>Check-Out Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        min={checkIn || today}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#b79a62]" />
                        <span>Number of Guests</span>
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      >
                        <option value="1 Adult">1 Adult</option>
                        <option value="2 Adults">2 Adults</option>
                        <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                        <option value="3 Adults">3 Adults</option>
                        <option value="4+ Family">4+ Family</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Home className="w-3 h-3 text-[#b79a62]" />
                        <span>Room Category</span>
                      </label>
                      <select
                        value={roomPreference}
                        onChange={(e) => setRoomPreference(e.target.value)}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      >
                        <option value="Executive AC Room">Executive AC Room</option>
                        <option value="Deluxe AC Room">Deluxe AC Room</option>
                        <option value="Family AC Room">Family AC Room</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      min={today}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                      Estimated Guests *
                    </label>
                    <input
                      type="text"
                      required
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder="e.g. 4 Guests / 10 Persons"
                      className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                  Special Notes or Requirements
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Late night arrival time, ground floor room preference, vegetarian diet preferences..."
                  className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow"
                >
                  {loading ? (
                    <span>PROCESSING...</span>
                  ) : (
                    <>
                      <span>SUBMIT RESERVATION INQUIRY</span>
                      <Send className="w-3.5 h-3.5 text-[#b79a62]" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Direct 24/7 Desk: {HOTEL_INFO.phone}</span>
                <span>Safe &amp; Secure</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
