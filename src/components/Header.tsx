import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Menu, X, User as UserIcon, LogOut, Shield, CalendarCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
  onOpenUserBookings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenAdmin, onOpenUserBookings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'ROOMS', href: '#rooms' },
    { label: 'DINING', href: '#dining' },
    { label: 'MENU', href: '#menu' },
    { label: 'AMENITIES', href: '#amenities' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className={`bg-[#1c2618] text-[#e9e3d7] text-[11px] md:text-xs transition-all duration-300 border-b border-[#39452d]/40 ${
        isScrolled ? 'h-0 overflow-hidden opacity-0 py-0 border-none' : 'py-2 px-4 md:px-8'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left Location */}
          <div className="flex items-center gap-1.5 tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#b79a62] shrink-0" />
            <span>Kandari, Bhusawal, Maharashtra</span>
          </div>

          {/* Center Brand Identity */}
          <div className="hidden lg:flex items-center gap-2 font-medium tracking-widest text-[#d6be90] text-[11px]">
            <span>PURE VEG RESTAURANT</span>
            <span className="w-1 h-1 rounded-full bg-[#b79a62]"></span>
            <span>LODGING & BOARDING</span>
          </div>

          {/* Right Phone & Auth */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="flex items-center gap-1.5 hover:text-[#d6be90] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#b79a62]" />
              <span className="font-medium tracking-wider">{HOTEL_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline-block text-[#39452d]">|</span>
            <span className="hidden sm:flex items-center gap-1 text-[#b79a62]">
              <Clock className="w-3 h-3" />
              <span>24/7 Front Desk</span>
            </span>

            {/* User Login in top bar */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#39452d]/60">
                <span className="hidden md:inline text-[11px] text-[#faf8f4] truncate max-w-[120px]">
                  {user.displayName?.split(' ')[0] || user.email}
                </span>
                {isAdmin && (
                  <button
                    onClick={onOpenAdmin}
                    className="flex items-center gap-1 bg-[#b79a62] text-[#1c2618] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider hover:bg-[#d6be90] transition-colors"
                    title="Open Hotel Management Panel"
                  >
                    <Shield className="w-2.5 h-2.5" />
                    <span>ADMIN</span>
                  </button>
                )}
                {onOpenUserBookings && (
                  <button
                    onClick={onOpenUserBookings}
                    className="text-[#d6be90] hover:text-white transition-colors"
                    title="View My Inquiries"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={signOut}
                  className="text-stone-400 hover:text-red-300 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-1 text-[#e9e3d7] hover:text-[#d6be90] pl-2 border-l border-[#39452d]/60 transition-colors"
              >
                <UserIcon className="w-3 h-3 text-[#b79a62]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 px-4 md:px-8 ${
          isScrolled
            ? 'bg-[#faf8f4]/95 backdrop-blur-md shadow-md py-3 text-[#1c2618] border-b border-[#ebe4d8]'
            : 'bg-[#24301f]/90 md:bg-[#24301f]/80 backdrop-blur-sm py-4 text-[#faf8f4]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Emblem */}
          <a href="#home" className="flex items-center gap-3 group">
            {/* Elegant Lotus Emblem */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-[#24301f] text-[#d6be90]' : 'bg-[#d6be90]/15 text-[#d6be90] border border-[#b79a62]/40'
            }`}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12 2C11.5 5 9 8 7 10C5 12 4 14.5 4 17C4 19.5 6.5 21 12 21C17.5 21 20 19.5 20 17C20 14.5 19 12 17 10C15 8 12.5 5 12 2Z" opacity="0.3"/>
                <path d="M12 6C11 8.5 9.5 11 8 12.5C7 13.5 6 15 6 17C6 18.5 7.5 19.5 12 19.5C16.5 19.5 18 18.5 18 17C18 15 17 13.5 16 12.5C14.5 11 13 8.5 12 6Z" fill="#b79a62"/>
                <circle cx="12" cy="14" r="1.5" fill="#faf8f4"/>
              </svg>
            </div>

            <div className="flex flex-col">
              <span className={`font-serif tracking-widest text-lg md:text-xl font-bold uppercase transition-colors ${
                isScrolled ? 'text-[#1c2618]' : 'text-white'
              }`}>
                Hotel Radha Krishna
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-sans text-[#b79a62] font-semibold">
                Pure Veg • Lodging &amp; Boarding
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] tracking-widest font-medium transition-colors hover:text-[#b79a62] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#b79a62] hover:after:w-full after:transition-all after:duration-300 ${
                  isScrolled ? 'text-[#39452d]' : 'text-[#e9e3d7]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Book Now */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="bg-[#24301f] text-[#faf8f4] border border-[#b79a62] hover:bg-[#39452d] px-5 py-2.5 rounded text-xs font-semibold tracking-widest uppercase transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] flex items-center gap-2 group"
            >
              <span>BOOK A ROOM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b79a62] group-hover:scale-125 transition-transform"></span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-[#b79a62] text-[#1c2618] px-3 py-1.5 rounded text-[11px] font-semibold tracking-wider uppercase sm:hidden"
            >
              BOOK
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-[#1c2618] hover:bg-stone-200' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1c2618] text-[#faf8f4] border-b border-[#39452d] shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-6 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#39452d]/60">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-wider text-[#e9e3d7] hover:text-[#b79a62] py-1.5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#b79a62] text-[#1c2618] py-3 rounded text-sm font-semibold tracking-widest uppercase transition-colors"
              >
                BOOK YOUR STAY
              </button>

              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 border border-[#39452d] text-[#e9e3d7] py-2.5 rounded text-xs tracking-wider uppercase"
              >
                <Phone className="w-3.5 h-3.5 text-[#b79a62]" />
                <span>Call +91 74474 07405</span>
              </a>

              {user ? (
                <div className="flex items-center justify-between pt-2 border-t border-[#39452d]/40 text-xs text-[#e9e3d7]">
                  <span>Signed in as {user.displayName || user.email}</span>
                  <button onClick={signOut} className="text-red-400 hover:underline">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signInWithGoogle();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 text-white py-2 rounded text-xs tracking-wider hover:bg-white/20 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#b79a62]" />
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
