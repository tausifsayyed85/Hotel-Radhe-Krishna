import React, { useState, useMemo } from 'react';
import { INITIAL_MENU_ITEMS, HOTEL_INFO } from '../data/hotelData';
import { MenuItem } from '../types';
import { Search, ExternalLink, Utensils, Info, Check, Filter } from 'lucide-react';

interface MenuSectionProps {
  onTableEnquiry: () => void;
}

const CATEGORIES = [
  'All Dishes',
  'Soups',
  'Starters',
  'Main Course',
  'Tandoor',
  'Breads',
  'Rice & Biryani',
  'Quick Bites',
  'Pizza & Chinese',
] as const;

export const MenuSection: React.FC<MenuSectionProps> = ({ onTableEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Dishes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return INITIAL_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Dishes' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#f5f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#24301f]/10 text-[#24301f] text-xs font-semibold tracking-[0.25em] uppercase">
            <Utensils className="w-3.5 h-3.5 text-[#b79a62]" />
            <span>AUTHENTIC PURE VEGETARIAN MENU</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] font-normal">
            Digital Restaurant Menu
          </h2>
          <div className="w-12 h-[2px] bg-[#b79a62] mx-auto"></div>
          <p className="text-sm md:text-base text-[#4c5a3d]">
            Carefully curated dishes from our kitchen. Prepared with 100% pure vegetarian ingredients.
          </p>
        </div>

        {/* Verification & Compliance Notice Banner */}
        <div className="bg-[#faf8f4] border border-[#ebe4d8] rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#4c5a3d]">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#b79a62] shrink-0" />
            <div>
              <span className="font-semibold text-[#1c2618]">MENU DATA SOURCE:</span> Verified against official restaurant &amp; Zomato listing records.
              <span className="block sm:inline sm:ml-1 text-stone-500 font-light">
                Prices and availability may vary seasonally. Please confirm the current price with the restaurant.
              </span>
            </div>
          </div>
          <a
            href={HOTEL_INFO.zomatoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-[#24301f] hover:text-[#b79a62] font-semibold uppercase tracking-wider shrink-0 transition-colors"
          >
            <span>View on Zomato</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-[#b79a62] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes (e.g. Paneer, Dal Tadka, Manchurian)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#faf8f4] border border-[#ebe4d8] focus:border-[#b79a62] text-sm text-[#1c2618] placeholder-[#4c5a3d]/60 focus:outline-none shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Two-Column Layout (Sticky Left Nav + Menu Items Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Navigation */}
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="bg-[#faf8f4] rounded-lg border border-[#ebe4d8] p-3 shadow-sm">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-[#ebe4d8] text-xs font-bold text-[#1c2618] uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-[#b79a62]" />
                <span>Categories</span>
              </div>

              {/* Category Pills (Horizontal scroll on mobile, vertical list on desktop) */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pt-2 no-scrollbar">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-2 rounded text-left text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 flex items-center justify-between ${
                        isActive
                          ? 'bg-[#24301f] text-[#faf8f4] font-semibold shadow-sm'
                          : 'text-[#4c5a3d] hover:bg-[#f5f1e8] hover:text-[#1c2618]'
                      }`}
                    >
                      <span>{cat}</span>
                      {isActive && <Check className="w-3 h-3 text-[#b79a62] ml-2 shrink-0 hidden lg:inline" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Table booking promotion box in sidebar */}
            <div className="hidden lg:block mt-6 p-4 rounded-lg bg-[#24301f] text-[#faf8f4] border border-[#39452d]">
              <h4 className="font-serif text-base text-[#d6be90] font-bold mb-1">
                Family &amp; Group Dining
              </h4>
              <p className="text-xs text-[#e9e3d7] font-light mb-3">
                Stopping with family or a bus tour group on Asian Highway 46? Pre-book table seating.
              </p>
              <button
                onClick={onTableEnquiry}
                className="w-full bg-[#b79a62] hover:bg-[#c5a86d] text-[#1c2618] py-2 rounded text-xs font-bold tracking-wider uppercase transition-colors"
              >
                RESERVE A TABLE
              </button>
            </div>
          </div>

          {/* Right Menu Items */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between border-b border-[#ebe4d8] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#1c2618]">
                {selectedCategory}
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="bg-[#faf8f4] rounded-lg p-12 text-center border border-[#ebe4d8] space-y-2">
                <Utensils className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-sm font-medium text-[#1c2618]">No dishes found matching "{searchQuery}"</p>
                <p className="text-xs text-stone-500">Try searching for other pure vegetarian items or clear filters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Dishes');
                  }}
                  className="mt-2 text-xs font-semibold text-[#24301f] underline"
                >
                  Reset search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg bg-[#faf8f4] border border-[#ebe4d8] hover:border-[#b79a62] transition-all duration-200 hover:shadow-sm flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {/* Pure Veg Green Dot Badge */}
                          <div className="w-3.5 h-3.5 rounded border border-emerald-600 flex items-center justify-center p-0.5 shrink-0" title="100% Pure Vegetarian">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#1c2618] group-hover:text-[#39452d] transition-colors">
                            {item.name}
                          </h4>
                        </div>

                        {/* Price tag */}
                        <div className="text-right shrink-0">
                          <span className="font-semibold text-sm text-[#24301f]">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      {item.isSignature && (
                        <span className="inline-block text-[10px] font-semibold text-[#b79a62] tracking-wider uppercase bg-[#f5f1e8] px-2 py-0.5 rounded border border-[#d6be90]/40">
                          House Specialty
                        </span>
                      )}

                      <p className="text-xs text-[#4c5a3d] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-[#ebe4d8]/60 flex items-center justify-between text-[11px] text-stone-400">
                      <span>{item.category}</span>
                      <span className="text-emerald-700 font-medium">Available</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
