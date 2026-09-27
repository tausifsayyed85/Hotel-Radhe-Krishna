import React from 'react';
import { GOOGLE_REVIEWS_DATA } from '../data/hotelData';
import { Star, ExternalLink, ShieldCheck, ThumbsUp } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#faf8f4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#24301f]/10 text-[#24301f] text-xs font-semibold tracking-[0.25em] uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b79a62]" />
            <span>VERIFIED GOOGLE REVIEWS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c2618] font-normal">
            What Our Guests Say
          </h2>
          <div className="w-12 h-[2px] bg-[#b79a62] mx-auto"></div>
          <p className="text-sm md:text-base text-[#4c5a3d]">
            Over 1,900+ travelers have shared their experience at Hotel Radha Krishna on Google.
          </p>
        </div>

        {/* Aggregate Google Rating Card */}
        <div className="bg-[#f5f1e8] rounded-xl border border-[#ebe4d8] p-6 sm:p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Score */}
            <div className="md:col-span-4 flex flex-col items-center justify-center sm:border-r border-[#ebe4d8] sm:pr-6 text-center">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-5xl sm:text-6xl font-bold text-[#1c2618]">
                  {GOOGLE_REVIEWS_DATA.aggregateRating.toFixed(1)}
                </span>
                <span className="text-stone-400 font-light text-2xl">/ 5.0</span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 my-2 text-[#b79a62]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <Star className="w-5 h-5 fill-current opacity-70" />
              </div>

              <span className="text-xs text-[#4c5a3d] font-medium">
                Based on <strong>~{GOOGLE_REVIEWS_DATA.totalReviews.toLocaleString()}+</strong> Google reviews
              </span>
            </div>

            {/* Right Themes */}
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-semibold tracking-wider text-[#1c2618] uppercase flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-[#b79a62]" />
                Top Verified Mentions by Guests:
              </span>
              <div className="flex flex-wrap gap-2">
                {GOOGLE_REVIEWS_DATA.recurringThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#faf8f4] border border-[#ebe4d8] text-xs font-medium text-[#24301f] rounded-full shadow-2xs"
                  >
                    ✓ {theme}
                  </span>
                ))}
              </div>
              <p className="text-xs text-stone-500 font-light pt-1">
                Verified aggregate summaries from Google Hotels profile for Hotel Radha Krishna, Kandari.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GOOGLE_REVIEWS_DATA.reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-lg bg-[#faf8f4] border border-[#ebe4d8] hover:border-[#b79a62] transition-colors shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#b79a62]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-light">{rev.date}</span>
                </div>

                <p className="text-sm text-[#39452d] italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#ebe4d8] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#1c2618]">{rev.author}</div>
                  <div className="text-[10px] text-[#4c5a3d]">{rev.verifiedVisit}</div>
                </div>

                {/* Google Badge */}
                <div className="flex items-center gap-1 text-[11px] text-stone-500">
                  <span className="font-bold text-[#b79a62]">G</span>
                  <span>Google Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS_DATA.profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 bg-[#24301f] hover:bg-[#39452d] text-[#faf8f4] px-7 py-3 rounded text-xs font-semibold tracking-widest uppercase transition-colors shadow"
          >
            <span>READ ALL GOOGLE REVIEWS</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#b79a62]" />
          </a>
        </div>
      </div>
    </section>
  );
};
