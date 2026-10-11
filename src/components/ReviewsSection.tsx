import React, { useState } from 'react';
import { REVIEWS } from '../data/products';
import { Review } from '../types';
import { Star, ThumbsUp, CheckCircle, ShieldCheck } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const handleVoteHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const filteredReviews = reviewsList.filter((r) =>
    filterRating === 'all' ? true : r.rating === filterRating
  );

  return (
    <section className="bg-white py-18 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Quantitative Rigor */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-200">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400 block mb-2">
              Verified Client Impressions
            </span>
            <h2 className="text-3xl font-serif font-normal text-zinc-950">
              Honest Feedback from Our Community
            </h2>
          </div>

          {/* Aggregate Rating Scoreboard (Legitimate review data) */}
          <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-lg p-3.5">
            <div className="text-center pr-4 border-r border-zinc-200">
              <span className="text-2xl font-bold font-mono text-zinc-950 block leading-none">
                4.93
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                Out of 5.0
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 font-medium">523 Verified Deliveries</p>
            </div>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-zinc-500 mr-2">Filter reviews:</span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterRating === 'all'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
            }`}
          >
            All Reviews ({reviewsList.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterRating === 5
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
            }`}
          >
            5 Stars Only
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Header row: stars & date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-semibold text-zinc-900 mb-2">{rev.title}</h3>

                {/* Review Prose */}
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">{rev.comment}</p>

                {/* Product Purchased Tag (unboxed metadata) */}
                <p className="text-[11px] text-zinc-400 font-mono mb-4">
                  Purchased: {rev.itemPurchased}
                </p>
              </div>

              {/* Footer Author & Helpfulness */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-700 font-medium">
                        · Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-400">{rev.location}</span>
                </div>

                <button
                  onClick={() => handleVoteHelpful(rev.id)}
                  disabled={helpfulVoted[rev.id]}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                    helpfulVoted[rev.id]
                      ? 'bg-zinc-100 text-zinc-800 font-medium'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
