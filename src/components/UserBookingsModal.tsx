import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserEnquiries, BookingEnquiry } from '../firebase';
import { X, CalendarCheck, Clock, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface UserBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewBooking: () => void;
}

export const UserBookingsModal: React.FC<UserBookingsModalProps> = ({
  isOpen,
  onClose,
  onNewBooking,
}) => {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?.uid) {
      setLoading(true);
      getUserEnquiries(user.uid)
        .then((data) => setEnquiries(data))
        .finally(() => setLoading(false));
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#faf8f4] rounded-xl max-w-lg w-full p-6 sm:p-8 border border-[#ebe4d8] shadow-2xl relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase">
            MY RESERVATIONS &amp; INQUIRIES
          </span>
          <h3 className="font-serif text-2xl text-[#1c2618] font-bold">
            Guest Inquiries
          </h3>
          <p className="text-xs text-[#4c5a3d]">
            Tracking status for {user?.displayName || user?.email}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 text-center text-xs text-stone-500">
              Loading your inquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <CalendarCheck className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-serif text-lg font-bold text-[#1c2618]">No inquiries yet</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                You haven't submitted any room or dining inquiries with this account yet.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="mt-2 bg-[#24301f] text-[#faf8f4] px-5 py-2 rounded text-xs font-semibold tracking-wider uppercase"
              >
                Plan a Stay
              </button>
            </div>
          ) : (
            enquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-lg bg-[#f5f1e8] border border-[#ebe4d8] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c2618] uppercase tracking-wider">
                    {enq.type.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                    enq.status === 'confirmed'
                      ? 'bg-emerald-600 text-white'
                      : enq.status === 'contacted'
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-300 text-stone-800'
                  }`}>
                    {enq.status}
                  </span>
                </div>

                {enq.checkInDate && (
                  <div className="flex items-center gap-1.5 text-xs text-[#4c5a3d]">
                    <Calendar className="w-3.5 h-3.5 text-[#b79a62]" />
                    <span>Check-in: {enq.checkInDate}</span>
                    {enq.checkOutDate && <span>• Check-out: {enq.checkOutDate}</span>}
                  </div>
                )}

                {enq.roomPreference && (
                  <div className="text-xs text-[#1c2618] font-medium">
                    Room: {enq.roomPreference}
                  </div>
                )}

                <div className="text-[11px] text-stone-500 pt-1 flex items-center justify-between border-t border-[#ebe4d8]">
                  <span>Ref: {enq.id?.substring(0, 8)}...</span>
                  <a href={`tel:${HOTEL_INFO.phoneClean}`} className="text-[#24301f] hover:underline font-semibold">
                    Call Hotel for Update
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-[#ebe4d8] mt-4 flex items-center justify-between">
          <span className="text-xs text-[#4c5a3d]">Questions?</span>
          <a
            href={`tel:${HOTEL_INFO.phoneClean}`}
            className="flex items-center gap-1 text-xs font-semibold text-[#24301f] hover:text-[#b79a62]"
          >
            <Phone className="w-3 h-3 text-[#b79a62]" />
            <span>{HOTEL_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
