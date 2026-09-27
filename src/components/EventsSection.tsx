import React, { useState } from 'react';
import { submitEnquiry } from '../firebase';
import { Calendar, Users, Phone, CheckCircle, Send, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useAuth } from '../context/AuthContext';

export const EventsSection: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    mobileNumber: '',
    eventType: 'Family Gathering',
    eventDate: '',
    guestsCount: 25,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitEnquiry({
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: user?.email || '',
        type: 'event_banquet',
        checkInDate: formData.eventDate,
        guestsCount: Number(formData.guestsCount),
        specialRequests: `Event: ${formData.eventType}. Note: ${formData.message}`,
        userId: user?.uid || 'guest',
        userEmail: user?.email || '',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit event enquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="events" className="py-20 md:py-28 bg-[#f5f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#24301f]/10 text-[#24301f] text-xs font-semibold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#b79a62]" />
              <span>GATHERINGS &amp; CELEBRATIONS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] font-normal leading-tight">
              Host Your Gathering in <br />
              <span className="italic text-[#39452d]">Kandari, Bhusawal</span>
            </h2>

            <p className="text-sm md:text-base text-[#4c5a3d] leading-relaxed">
              Plan your family get-together, birthday meal, wedding party halt, or corporate group dining with authentic pure vegetarian catering and warm hospitality.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: 'Family Gatherings & Anniversaries', desc: 'Comfortable seating and custom pure veg banquet thali menus.' },
                { title: 'Highway Tour Groups & Bus Halts', desc: 'Spacious dining hall with rapid service and ample bus parking.' },
                { title: 'Birthday Parties & Functions', desc: 'Delicious starters, main courses, and dessert arrangements.' },
                { title: 'Business & Commercial Meetings', desc: 'Quiet environment with Wi-Fi and tea/snack refreshments.' },
              ].map((ev, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#faf8f4] border border-[#ebe4d8]">
                  <CheckCircle className="w-4 h-4 text-[#b79a62] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1c2618]">{ev.title}</h4>
                    <p className="text-[11px] text-[#4c5a3d] font-light">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-[#4c5a3d]">
              Direct assistance with our banquet manager: <a href={`tel:${HOTEL_INFO.phoneClean}`} className="font-bold text-[#1c2618] underline">{HOTEL_INFO.phone}</a>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#faf8f4] rounded-xl border border-[#ebe4d8] p-6 sm:p-8 shadow-xl relative">
              <div className="mb-6 space-y-1">
                <span className="text-xs font-semibold tracking-widest text-[#b79a62] uppercase">
                  PLAN YOUR EVENT
                </span>
                <h3 className="font-serif text-2xl text-[#1c2618] font-bold">
                  Event &amp; Group Enquiry
                </h3>
                <p className="text-xs text-[#4c5a3d]">
                  Fill out this form and our management team will reach out with menu choices and arrangements.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#1c2618]">Enquiry Submitted</h4>
                  <p className="text-xs sm:text-sm text-[#4c5a3d] max-w-sm mx-auto">
                    Thank you, {formData.fullName}. Your request has been recorded. Our team will contact you shortly at <strong>{formData.mobileNumber}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        mobileNumber: '',
                        eventType: 'Family Gathering',
                        eventDate: '',
                        guestsCount: 25,
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-[#24301f] underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Your Name"
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
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                        Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      >
                        <option value="Family Gathering">Family Gathering</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Tour Bus Halt">Tour Bus Halt</option>
                        <option value="Corporate Meeting">Corporate Meeting</option>
                        <option value="Wedding Halt">Wedding Halt</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                        Tentative Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                        Estimated Guests
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1c2618] uppercase tracking-wider mb-1">
                      Special Requirements / Food Preferences
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Jain food preferences, breakfast timing, seating setup..."
                      className="w-full bg-[#f5f1e8] border border-[#ebe4d8] rounded p-2.5 text-xs text-[#1c2618] focus:border-[#b79a62] focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] py-3 rounded text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow"
                  >
                    {loading ? (
                      <span>SUBMITTING...</span>
                    ) : (
                      <>
                        <span>SEND EVENT ENQUIRY</span>
                        <Send className="w-3.5 h-3.5 text-[#b79a62]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
