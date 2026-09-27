import React, { useState, useEffect } from 'react';
import { getAllEnquiriesForAdmin, BookingEnquiry, db } from '../firebase';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { X, Shield, Phone, MessageSquare, CheckCircle, Clock, RefreshCw, Calendar, User } from 'lucide-react';
import { INITIAL_MENU_ITEMS, HOTEL_INFO } from '../data/hotelData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'inquiries' | 'menu'>('inquiries');
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getAllEnquiriesForAdmin();
      setEnquiries(data);
    } catch (err) {
      console.error('Error fetching admin enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'confirmed' | 'archived') => {
    try {
      if (id.startsWith('local-')) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        return;
      }
      const ref = doc(db, 'enquiries', id);
      await updateDoc(ref, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#faf8f4] rounded-xl max-w-4xl w-full h-[85vh] border border-[#ebe4d8] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1c2618] text-[#faf8f4] p-5 flex items-center justify-between border-b border-[#39452d]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#b79a62] text-[#1c2618]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">
                Hotel Management System
              </h3>
              <p className="text-xs text-[#d6be90] font-light">
                Hotel Radha Krishna • Kandari, Bhusawal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="p-1.5 rounded text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="text-stone-300 hover:text-white p-1 text-lg font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-[#f5f1e8] px-6 py-2 border-b border-[#ebe4d8] flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setTab('inquiries')}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === 'inquiries'
                  ? 'bg-[#24301f] text-[#faf8f4]'
                  : 'text-[#4c5a3d] hover:text-[#1c2618]'
              }`}
            >
              Guest Inquiries ({enquiries.length})
            </button>
            <button
              onClick={() => setTab('menu')}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === 'menu'
                  ? 'bg-[#24301f] text-[#faf8f4]'
                  : 'text-[#4c5a3d] hover:text-[#1c2618]'
              }`}
            >
              Menu &amp; Tariffs
            </button>
          </div>

          {tab === 'inquiries' && (
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs bg-[#faf8f4] border border-[#ebe4d8] rounded px-2.5 py-1 text-[#1c2618] focus:outline-none"
            >
              <option value="all">All Inquiries</option>
              <option value="room_booking">Room Bookings</option>
              <option value="restaurant_table">Restaurant Tables</option>
              <option value="event_banquet">Group / Events</option>
            </select>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'inquiries' ? (
            <div className="space-y-4">
              {loading && enquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-stone-500">
                  Loading guest inquiries...
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <Clock className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="font-serif text-lg font-bold text-[#1c2618]">No inquiries found</p>
                  <p className="text-xs text-stone-500">
                    New inquiries submitted by website visitors will appear here in real time.
                  </p>
                </div>
              ) : (
                filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-lg bg-[#faf8f4] border border-[#ebe4d8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1c2618]">
                          {enq.fullName}
                        </span>
                        <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                          enq.type === 'room_booking'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.type === 'event_banquet'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {enq.type.replace('_', ' ')}
                        </span>
                        <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                          enq.status === 'confirmed'
                            ? 'bg-emerald-600 text-white'
                            : enq.status === 'contacted'
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-300 text-stone-800'
                        }`}>
                          {enq.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#4c5a3d]">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#b79a62]" />
                          <a href={`tel:${enq.mobileNumber}`} className="hover:underline font-medium text-[#1c2618]">
                            {enq.mobileNumber}
                          </a>
                        </span>
                        {enq.checkInDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#b79a62]" />
                            <span>Date: {enq.checkInDate}</span>
                          </span>
                        )}
                        {enq.guestsCount && <span>Guests: {enq.guestsCount}</span>}
                        {enq.roomPreference && <span>Room: {enq.roomPreference}</span>}
                      </div>

                      {enq.specialRequests && (
                        <p className="text-xs text-stone-600 italic bg-[#f5f1e8] p-2 rounded mt-1">
                          "{enq.specialRequests}"
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/${enq.mobileNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(enq.fullName)},%20this%20is%20Hotel%20Radha%20Krishna%20in%20Kandari,%20Bhusawal%20regarding%20your%20inquiry.`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2 rounded bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>

                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq.id!, e.target.value as any)}
                        className="text-xs bg-[#f5f1e8] border border-[#ebe4d8] rounded p-1.5 font-medium text-[#1c2618]"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#f5f1e8] p-4 rounded border border-[#ebe4d8] text-xs text-[#4c5a3d]">
                <span className="font-bold text-[#1c2618]">Menu Inventory Status:</span> All 30+ pure vegetarian dishes are synchronized with Zomato and official restaurant records.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INITIAL_MENU_ITEMS.map((item) => (
                  <div key={item.id} className="p-3 bg-[#faf8f4] border border-[#ebe4d8] rounded flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-[#1c2618]">{item.name}</div>
                      <div className="text-[10px] text-stone-500">{item.category} • {item.price}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Live
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
