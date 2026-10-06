import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { Heart, Layers, Play, Tag, Award } from 'lucide-react';
import { formatPrice, getFilterStyle } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  currency?: Currency;
  sellerAvatar?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onOpenChat?: (sellerId: string, productId: string, e: React.MouseEvent) => void;
  onViewSeller: (sellerId: string, e: React.MouseEvent) => void;
  onToggleLike?: (productId: string, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency = 'KRW',
  sellerAvatar,
  onSelectProduct,
  onViewSeller,
  onToggleLike,
}) => {
  const [isLiked, setIsLiked] = useState(product.isLiked || false);
  const [likes, setLikes] = useState(product.likesCount || 120);
  const [isPopping, setIsPopping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikes((prev) => (nextLiked ? prev + 1 : prev - 1));

    if (nextLiked) {
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 600);
    } else {
      setIsPopping(false);
    }

    if (onToggleLike) onToggleLike(product.id, e);
  };

  const avatarUrl =
    sellerAvatar ||
    product.sellerAvatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80';

  // Xiaohongshu (小红书) authentic sizing:
  // User explicitly requested: "영상과 사진 크기는 다르게 하고 영상 사이즈는 더 크게 나오게"
  // - Videos: TALL and significantly LARGER (265px-365px, ~9:14 ratio) with video play & duration overlays!
  // - Photos: Natural compact proportions (160px-195px on mobile, square or 3:4 portrait)
  const getMediaAspectClass = () => {
    if (product.isVideo) {
      // Prominent tall video reel format - 50%+ larger than photos
      return 'h-[265px] sm:h-[320px] md:h-[365px] w-full';
    }

    // Photo card heights calibrated to natural aspect ratios
    if (product.aspectRatio === 'aspect-[1/1]') {
      // 1:1 Square photo
      return 'h-[160px] sm:h-[195px] md:h-[225px] w-full';
    }

    if (product.aspectRatio === 'aspect-[4/5]' || product.aspectRatio === 'aspect-[3/4]') {
      // 3:4 or 4:5 Portrait photo
      return 'h-[195px] sm:h-[230px] md:h-[260px] w-full';
    }

    // Standard photo
    return 'h-[175px] sm:h-[210px] md:h-[240px] w-full';
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-[#141418] rounded-xl sm:rounded-2xl overflow-hidden border border-[#222228] hover:border-[#D4AF37]/50 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 cursor-pointer text-left hover:-translate-y-0.5 select-none w-full"
    >
      {/* 1. Media Container with Xiaohongshu Video / Photo Sizing */}
      <div className={`relative ${getMediaAspectClass()} bg-[#0D0D0F] overflow-hidden shrink-0`}>
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          style={getFilterStyle(product.filterPreset, product.filterIntensity)}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
        />

        {/* Subtle dark gradient overlay at top and bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

        {/* Watermark / Certification Badge (If edited in Xiaohongshu Editor) */}
        {product.watermarkBadge && (
          <div
            className={`absolute z-20 pointer-events-none ${
              product.watermarkPosition === 'top-right'
                ? 'top-1.5 right-1.5 sm:top-2 sm:right-2'
                : 'top-1.5 left-1.5 sm:top-2 sm:left-2'
            }`}
          >
            <div className="bg-black/85 backdrop-blur-md border border-[#D4AF37] text-[#E0C368] text-[8.5px] sm:text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-fade-in">
              <Award className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>{product.watermarkBadge}</span>
            </div>
          </div>
        )}

        {/* Interactive Product Pins Overlay (Visible on Card Hover or Pin count indicator) */}
        {product.imagePins && product.imagePins.length > 0 && (
          <>
            {/* Subtle Tag Count Badge at Bottom Right */}
            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-20 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/20 text-[9px] text-[#E0C368] flex items-center gap-1 font-bold shadow-md">
              <Tag className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>{product.imagePins.length}</span>
            </div>

            {/* Pulsing Pin Dots on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {product.imagePins.map((pin, pIdx) => (
                <div
                  key={pin.id || pIdx}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#D4AF37] shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
                  </div>
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      pin.align === 'left' ? 'right-3' : 'left-3'
                    }`}
                  >
                    <span className="px-1.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-white/30 text-[9px] font-bold text-white whitespace-nowrap shadow-md">
                      {pin.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video Overlays & Prominent Play Indicator (Xiaohongshu Video Style) */}
        {product.isVideo && (
          <>
            {/* Center Glowing Play Button with gold glass backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/65 backdrop-blur-md border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-115 group-hover:bg-black/80 transition-all duration-300">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-[#D4AF37] ml-0.5 text-[#D4AF37]" />
              </div>
            </div>

            {/* Video Duration & Live Equalizer Badge (Top Right) */}
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/85 backdrop-blur-md text-[#E0C368] text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5 border border-[#D4AF37]/50 shadow-md">
              {/* Equalizer animation */}
              <div className="flex items-end gap-0.5 h-2.5">
                <span className="w-0.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
                <span className="w-0.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-150" />
              </div>
              <span className="font-mono">{product.videoDuration || '0:54'}</span>
            </div>

            {/* Video Badge (Top Left with Grade Tier) */}
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1">
              <span className="bg-[#D4AF37] text-[#0D0D0F] text-[8.5px] sm:text-[9.5px] font-black px-1.5 py-0.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                <Play className="w-2.5 h-2.5 fill-[#0D0D0F]" />
                REEL
              </span>
              {!product.watermarkBadge && (
                <span className="bg-black/80 backdrop-blur-md text-[#E0C368] border border-[#D4AF37]/60 text-[8.5px] sm:text-[9.5px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                  {product.tier}
                </span>
              )}
            </div>

            {/* Simulated Live Video Progress Bar on Hover */}
            {isHovered && (
              <div className="absolute bottom-0 inset-x-0 h-1 bg-black/50 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E0C368] w-full animate-[progress_3s_linear_infinite]" />
              </div>
            )}
          </>
        )}

        {/* Multi-Photo Carousel Count Pill (When not video) */}
        {!product.isVideo && (
          <>
            {/* Top Left Quality Grade Tier (only if no custom watermark) */}
            {!product.watermarkBadge && (
              <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-black/80 backdrop-blur-md text-[#E0C368] border border-[#D4AF37]/60 text-[8.5px] sm:text-[9.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-md">
                {product.tier}
              </div>
            )}

            {product.images.length > 1 && (
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-black/80 backdrop-blur-md text-[#E0C368] text-[8.5px] sm:text-[9.5px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-[#D4AF37]/40 shadow-md">
                <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37]" />
                <span>{product.images.length}P</span>
              </div>
            )}
          </>
        )}

        {/* Bottom Quick Price Overlay on the Media */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#222228] flex items-center gap-1 z-10">
          <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-[#D4AF37]">
            {formatPrice(product.priceUSD, currency)}
          </span>
        </div>
      </div>

      {/* 2. Below Media: Note Title + Seller Avatar & Heart Like */}
      <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
        {/* Title: 2 lines clamp in Xiaohongshu style so note content is readable */}
        <div>
          <h3 className="text-[11.5px] sm:text-xs md:text-[13px] font-semibold text-[#FFFFFF] line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Seller Info & Like Button */}
        <div className="flex items-center justify-between pt-1 border-t border-[#222228] text-[10px] sm:text-xs">
          {/* Seller Avatar & Name */}
          <button
            onClick={(e) => onViewSeller(product.sellerId, e)}
            className="flex items-center gap-1 sm:gap-1.5 hover:text-[#FFFFFF] transition-colors truncate max-w-[62%] group/seller cursor-pointer"
          >
            <img
              src={avatarUrl}
              alt={product.sellerName}
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full object-cover border border-[#2C2C35] shadow-xs shrink-0 group-hover/seller:border-[#D4AF37]"
            />
            <span className="text-[10px] sm:text-[11px] font-medium text-[#A0A0AB] truncate group-hover/seller:text-[#FFFFFF] transition-colors">
              {product.sellerName}
            </span>
          </button>

          {/* Like Heart Button */}
          <button
            onClick={handleLikeClick}
            aria-label="Like"
            className={`relative flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer shrink-0 pl-1 py-0.5 select-none ${
              isLiked ? 'text-[#D4AF37]' : 'text-[#737380] hover:text-[#A0A0AB]'
            }`}
          >
            {/* Pop ripple glow ring */}
            {isPopping && (
              <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/25 pointer-events-none animate-heart-sparkle" />
            )}

            {/* Floating mini heart particle */}
            {isPopping && (
              <span className="absolute -top-3.5 left-1 text-[12px] pointer-events-none animate-heart-float drop-shadow-xs select-none">
                ✨
              </span>
            )}

            <div className="relative flex items-center justify-center">
              <Heart
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${
                  isPopping
                    ? 'fill-[#D4AF37] text-[#D4AF37] animate-heart-pop'
                    : isLiked
                    ? 'fill-[#D4AF37] text-[#D4AF37] scale-105'
                    : 'hover:scale-110 transition-transform'
                }`}
              />
            </div>
            <span className={`tabular-nums text-[10px] sm:text-[11px] ${isPopping ? 'scale-110 font-bold text-[#FFFFFF]' : ''}`}>
              {likes.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
