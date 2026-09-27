import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingBar } from './components/BookingBar';
import { PropertyBenefits } from './components/PropertyBenefits';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { DiningSection } from './components/DiningSection';
import { MenuSection } from './components/MenuSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { EventsSection } from './components/EventsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminPanel } from './components/AdminPanel';
import { UserBookingsModal } from './components/UserBookingsModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { RoomCategory } from './types';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [userBookingsOpen, setUserBookingsOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState<'room_booking' | 'restaurant_table' | 'event_banquet'>('room_booking');
  const [selectedRoomName, setSelectedRoomName] = useState<string>('');
  const [bookingDates, setBookingDates] = useState<{
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
  } | undefined>(undefined);

  const handleOpenGeneralBooking = () => {
    setEnquiryType('room_booking');
    setSelectedRoomName('Executive AC Room');
    setBookingModalOpen(true);
  };

  const handleCheckAvailability = (data: {
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
  }) => {
    setBookingDates(data);
    setEnquiryType('room_booking');
    setSelectedRoomName('Executive AC Room');
    setBookingModalOpen(true);
  };

  const handleEnquireRoom = (room: RoomCategory) => {
    setSelectedRoomName(room.name);
    setEnquiryType('room_booking');
    setBookingModalOpen(true);
  };

  const handleTableEnquiry = () => {
    setEnquiryType('restaurant_table');
    setBookingModalOpen(true);
  };

  const scrollToRooms = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f5f1e8] text-[#171814] flex flex-col font-sans selection:bg-[#b79a62]/30 selection:text-[#24301f]">
        {/* Two-Level Header & Navigation */}
        <Header
          onOpenBooking={handleOpenGeneralBooking}
          onOpenAdmin={() => setAdminPanelOpen(true)}
          onOpenUserBookings={() => setUserBookingsOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 03 — Full-Width Cinematic Hero */}
          <Hero onBookNow={handleOpenGeneralBooking} />

          {/* 04 — Floating Booking Bar */}
          <BookingBar onCheckAvailability={handleCheckAvailability} />

          {/* 05 — Property Benefits (5 icon strip) */}
          <PropertyBenefits />

          {/* 06 & 07 — Introduction & Hotel Story */}
          <AboutSection onExploreRooms={scrollToRooms} />

          {/* 08 — Accommodation (Verified Room Categories) */}
          <RoomsSection onEnquireRoom={handleEnquireRoom} />

          {/* 09 & 10 — Pure Veg Dining & Signature Dishes */}
          <DiningSection
            onExploreMenu={scrollToMenu}
            onTableEnquiry={handleTableEnquiry}
          />

          {/* 11 — Digital Restaurant Menu */}
          <MenuSection onTableEnquiry={handleTableEnquiry} />

          {/* 12 — Amenities Grid & Why Stay Here */}
          <AmenitiesSection />

          {/* 13 — Photo Gallery with Lightbox */}
          <GallerySection />

          {/* 14 — Google Reviews & Aggregate Data */}
          <ReviewsSection />

          {/* 15 — Events / Functions & Banquet Inquiries */}
          <EventsSection />

          {/* 16 & 17 — Location, Map, Directions & Nearby Places */}
          <LocationSection />
        </main>

        {/* 18 & 19 — Final Booking CTA & Footer */}
        <Footer onOpenBooking={handleOpenGeneralBooking} />

        {/* Sticky Mobile Action Bar */}
        <MobileBottomBar onOpenBooking={handleOpenGeneralBooking} />

        {/* Reservation / Inquiries Modal */}
        <EnquiryModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialType={enquiryType}
          initialRoomName={selectedRoomName}
          initialDates={bookingDates}
        />

        {/* Admin Management Drawer / Panel */}
        <AdminPanel
          isOpen={adminPanelOpen}
          onClose={() => setAdminPanelOpen(false)}
        />

        {/* User Bookings Modal */}
        <UserBookingsModal
          isOpen={userBookingsOpen}
          onClose={() => setUserBookingsOpen(false)}
          onNewBooking={handleOpenGeneralBooking}
        />
      </div>
    </AuthProvider>
  );
}
