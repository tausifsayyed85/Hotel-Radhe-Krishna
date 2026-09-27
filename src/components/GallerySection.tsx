import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/hotelData';
import { GalleryPhoto } from '../types';
import { Camera, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) =>
    activeFilter === 'all' ? true : photo.category === activeFilter
  );

  const filters = [
    { label: 'ALL PHOTOS', value: 'all' },
    { label: 'EXTERIOR & PROPERTY', value: 'exterior' },
    { label: 'ROOMS', value: 'rooms' },
    { label: 'RESTAURANT', value: 'restaurant' },
    { label: 'VEGETARIAN FOOD', value: 'food' },
  ];

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#f5f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-16 shadow-xl border border-[#ebe4d8]">
          <div className="h-64 sm:h-80 md:h-96 relative">
            <img
              src="/HOTEL OVERVIEW.png"
              alt="Hotel Radha Krishna property overview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/hotel-overview.png')) {
                  target.src = '/hotel-overview.png';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141b12] via-[#141b12]/50 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#d6be90] uppercase mb-1">
                HOTEL RADHA KRISHNA GALLERY
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#faf8f4] font-normal tracking-wide">
                A PLACE TO STAY. A PLACE TO DINE. A PLACE TO GATHER.
              </h2>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#b79a62] uppercase">
            VISUAL TOUR
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1c2618] font-normal">
            Property Photo Gallery
          </h3>
          <p className="text-xs text-[#4c5a3d]">
            Authentic photography of our hotel facade, guest rooms, pure veg restaurant, and kitchen specialties.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeFilter === filter.value
                  ? 'bg-[#24301f] text-[#faf8f4] shadow-sm'
                  : 'bg-[#faf8f4] text-[#4c5a3d] border border-[#ebe4d8] hover:border-[#b79a62]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative rounded-lg overflow-hidden border border-[#ebe4d8] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-[#faf8f4]"
            >
              <div className="h-64 sm:h-72 overflow-hidden bg-stone-200">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#1c2618]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 text-[#d6be90]">
                    <Camera className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#d6be90] font-medium mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Property Photo</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold">{photo.title}</h4>
                  <p className="text-xs text-stone-200 line-clamp-2 mt-1">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredPhotos[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden sm:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden sm:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="relative rounded-lg overflow-hidden max-h-[75vh] flex items-center justify-center bg-black/40">
              <img
                src={filteredPhotos[activeLightboxIndex].imageUrl}
                alt={filteredPhotos[activeLightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain mx-auto rounded shadow-2xl"
              />
            </div>
            <div className="text-white space-y-1">
              <h4 className="font-serif text-xl font-bold text-[#d6be90]">
                {filteredPhotos[activeLightboxIndex].title}
              </h4>
              <p className="text-sm text-stone-300 max-w-xl mx-auto">
                {filteredPhotos[activeLightboxIndex].caption}
              </p>
              <div className="text-xs text-stone-400 pt-1">
                {activeLightboxIndex + 1} of {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
