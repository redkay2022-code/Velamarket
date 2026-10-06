import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product, Currency, Seller } from '../types';
import { formatPrice, safeShare } from '../utils/helpers';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Disc,
  Play,
  Pause,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Zap,
  Award,
  Send,
  MessageSquare,
  Sparkles,
  Layers
} from 'lucide-react';

interface ShortVideoReelModalProps {
  initialProduct: Product;
  videoProducts: Product[];
  sellers: Seller[];
  currency: Currency;
  onClose: () => void;
  onOpenProductDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onOpenChat: (sellerId: string, productId: string) => void;
  onViewSellerStorefront: (sellerId: string) => void;
}

export const ShortVideoReelModal: React.FC<ShortVideoReelModalProps> = ({
  initialProduct,
  videoProducts,
  sellers,
  currency,
  onClose,
  onOpenProductDetail,
  onAddToCart,
  onBuyNow,
  onOpenChat,
  onViewSellerStorefront,
}) => {
  // Ensure we have at least one product
  const productsList = videoProducts.length > 0 ? videoProducts : [initialProduct];

  const initialIdx = Math.max(
    0,
    productsList.findIndex((p) => p.id === initialProduct.id)
  );

  const [currentIndex, setCurrentIndex] = useState(initialIdx);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});
  const [newCommentText, setNewCommentText] = useState('');

  const currentProduct = productsList[currentIndex] || initialProduct;
  const currentSeller =
    sellers.find((s) => s.id === currentProduct.sellerId) || {
      id: currentProduct.sellerId,
      name: currentProduct.sellerName,
      chineseName: 'Official Atelier',
      badge: 'Verified Factory',
      region: currentProduct.sellerRegion || 'Guangdong',
      establishedYear: 2017,
      rating: 4.98,
      reviewCount: 1200,
      successfulShipments: 4500,
      qcPassRate: 99.8,
      avgQcHours: 20,
      bio: 'VELA Verified Master Atelier Direct Studio',
      chineseBio: 'Official Verified Atelier',
      avatar:
        currentProduct.sellerAvatar ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      bannerImage: currentProduct.images[0],
      specialties: ['1:1 Master Edition', 'Triangle Transit Guaranteed'],
      contactWeChat: 'VELA_OFFICIAL',
      verificationAuditDate: '2026-10-01 VELA VERIFIED On-site Audit'
    };

  const isLiked = likedMap[currentProduct.id] ?? currentProduct.isLiked ?? false;
  const likesCount = likesCountMap[currentProduct.id] ?? currentProduct.likesCount ?? 120;
  const isBookmarked = bookmarkedMap[currentProduct.id] ?? false;
  const isFollowing = followingMap[currentSeller.id] ?? false;

  // Touch & Swipe navigation for vertical scroll
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const isWheeling = useRef(false);

  const goToNextProduct = useCallback(() => {
    if (currentIndex < productsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start for endless feed experience
      setCurrentIndex(0);
    }
  }, [currentIndex, productsList.length]);

  const goToPrevProduct = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(productsList.length - 1);
    }
  }, [currentIndex, productsList.length]);

  // Keyboard navigation (ArrowDown / ArrowUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        goToNextProduct();
      } else if (e.key === 'ArrowUp') {
        goToPrevProduct();
      } else if (e.key === 'Escape') {
        if (isDetailDrawerOpen) {
          setIsDetailDrawerOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextProduct, goToPrevProduct, isDetailDrawerOpen, onClose]);

  // Mouse wheel scroll to next/prev product (debounce 400ms)
  const handleWheel = (e: React.WheelEvent) => {
    if (isWheeling.current || isDetailDrawerOpen) return;
    if (Math.abs(e.deltaY) > 40) {
      isWheeling.current = true;
      if (e.deltaY > 0) {
        goToNextProduct();
      } else {
        goToPrevProduct();
      }
      setTimeout(() => {
        isWheeling.current = false;
      }, 450);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current || isDetailDrawerOpen) return;
    const distance = touchStartY.current - touchEndY.current;
    // Swipe Up -> Next product
    if (distance > 50) {
      goToNextProduct();
    }
    // Swipe Down -> Prev product
    if (distance < -50) {
      goToPrevProduct();
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isLiked;
    setLikedMap((prev) => ({ ...prev, [currentProduct.id]: next }));
    setLikesCountMap((prev) => ({
      ...prev,
      [currentProduct.id]: next ? likesCount + 1 : likesCount - 1
    }));
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedMap((prev) => ({ ...prev, [currentProduct.id]: !isBookmarked }));
  };

  const handleToggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowingMap((prev) => ({ ...prev, [currentSeller.id]: !isFollowing }));
  };

  const handleAddToCartClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(currentProduct);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNowClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onBuyNow(currentProduct);
  };

  return (
    <div
      onWheel={handleWheel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in select-none p-0 sm:p-4"
    >
      {/* 
        Container:
        If right detail drawer is open on desktop, expand container width so video & detail panel sit side by side!
      */}
      <div
        className={`relative w-full h-full sm:max-h-[880px] sm:rounded-[36px] bg-[#08080B] border border-[#222228] overflow-hidden flex transition-all duration-300 shadow-[0_25px_90px_rgba(0,0,0,0.98)] ${
          isDetailDrawerOpen
            ? 'sm:max-w-[840px]'
            : 'sm:max-w-[420px]'
        }`}
      >
        {/* ========================================================
            LEFT/CENTER: Continuous Vertical Video Reels Feed
           ======================================================== */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative flex-1 w-full h-full flex flex-col overflow-hidden bg-[#0D0D0F]"
        >
          {/* Vertical Transition Container */}
          <div
            className="w-full h-full transition-transform duration-500 ease-out relative"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {productsList.map((prod, idx) => (
              <div
                key={prod.id}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full h-full flex-shrink-0 relative overflow-hidden bg-[#0D0D0F] flex items-center justify-center cursor-pointer"
                style={{ height: '100%' }}
              >
                {/* 9:16 Video / Media Visual */}
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Dark Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95 pointer-events-none" />

                {/* Pause icon overlay */}
                {!isPlaying && idx === currentIndex && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37] flex items-center justify-center shadow-2xl animate-fade-in">
                      <Play className="w-8 h-8 fill-[#D4AF37] text-[#D4AF37] ml-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Animated Video Progress Scrubber */}
          {isPlaying && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-10 pointer-events-none">
              <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E0C368] animate-[progress_15s_linear_infinite]" />
            </div>
          )}

          {/* ========================================================
              TOP TRANSPARENT OVERLAY: Back, Seller Profile, +Follow, Close
             ======================================================== */}
          <div className="absolute top-0 inset-x-0 z-30 pt-4 sm:pt-6 px-4 flex items-center justify-between text-white pointer-events-auto">
            <div className="flex items-center gap-2">
              {/* Back Button */}
              <button
                onClick={onClose}
                aria-label="Back"
                className="p-2 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Seller Avatar & Name */}
              <div
                onClick={() => {
                  onClose();
                  onViewSellerStorefront(currentSeller.id);
                }}
                className="flex items-center gap-2 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
              >
                <img
                  src={currentSeller.avatar}
                  alt={currentSeller.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#D4AF37] shrink-0"
                />
                <span className="text-xs font-bold text-white max-w-[110px] truncate">
                  {currentSeller.name}
                </span>
              </div>

              {/* Gold +Follow Button */}
              <button
                onClick={handleToggleFollow}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md ${
                  isFollowing
                    ? 'bg-black/70 border border-[#D4AF37] text-[#D4AF37]'
                    : 'btn-gold-gradient text-[#0D0D0F]'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow'}
              </button>
            </div>

            {/* Top Right: Close button only (counting number removed as requested) */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white transition-all cursor-pointer shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ========================================================
              VERTICAL SWIPE / NAVIGATION PILL BUTTONS
             ======================================================== */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
            <button
              onClick={goToPrevProduct}
              aria-label="Previous product"
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white hover:text-[#D4AF37] transition-all cursor-pointer shadow-lg"
              title="Previous (Swipe up)"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={goToNextProduct}
              aria-label="Next product"
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white hover:text-[#D4AF37] transition-all cursor-pointer shadow-lg"
              title="Next (Swipe down)"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* ========================================================
              ★ NEATLY ALIGNED RIGHT-SIDE ACTION RAIL (NO OVERLAPS) ★
              1. Like (Heart + Count)
              2. Chat (MessageSquare -> 1:1 Real-time Chat)
              3. Save (Bookmark)
              4. Share
              5. Details (Gold Button)
              6. Atelier Sound (Spinning Vinyl Disc)
             ======================================================== */}
          <div className="absolute right-3 bottom-24 sm:bottom-28 z-30 flex flex-col items-center gap-3 select-none text-white pointer-events-auto">
            {/* 1. Like */}
            <button
              onClick={handleToggleLike}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md border transition-all ${
                  isLiked
                    ? 'bg-[#D4AF37]/25 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-black/55 border-white/15 hover:bg-black/75 group-hover:scale-105'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-transform ${
                    isLiked
                      ? 'fill-[#D4AF37] text-[#D4AF37] scale-110'
                      : 'text-white'
                  }`}
                />
              </div>
              <span className="text-[10px] font-mono font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-white">
                {likesCount.toLocaleString()}
              </span>
            </button>

            {/* 2. Chat (1:1 Real-time translated chat) */}
            <button
              onClick={() => {
                onClose();
                onOpenChat(currentSeller.id, currentProduct.id);
              }}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="1:1 Live Translated Chat with Atelier"
            >
              <div className="w-11 h-11 rounded-2xl bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:scale-105 group-hover:border-[#D4AF37]/50 transition-all">
                <MessageSquare className="w-5 h-5 text-white group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <span className="text-[10px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-white">
                Chat
              </span>
            </button>

            {/* 3. Bookmark (Save) */}
            <button
              onClick={handleToggleBookmark}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Save to Wishlist"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md border transition-all ${
                  isBookmarked
                    ? 'bg-[#D4AF37]/25 border-[#D4AF37]'
                    : 'bg-black/55 border-white/15 hover:bg-black/75 group-hover:scale-105'
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 transition-transform ${
                    isBookmarked
                      ? 'fill-[#D4AF37] text-[#D4AF37]'
                      : 'text-white'
                  }`}
                />
              </div>
              <span className="text-[10px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-white">
                Save
              </span>
            </button>

            {/* 4. Share */}
            <button
              onClick={() => {
                safeShare({ title: currentProduct.title, url: window.location.href });
              }}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              title="Share"
            >
              <div className="w-11 h-11 rounded-2xl bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:scale-105 transition-all">
                <Share2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-white">
                Share
              </span>
            </button>

            {/* 5. Details (Gold Action Button) */}
            {!isDetailDrawerOpen && (
              <button
                onClick={() => setIsDetailDrawerOpen(true)}
                className="flex flex-col items-center gap-1 group cursor-pointer mt-0.5"
                title="Open Details"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#997205] text-[#0D0D0F] flex items-center justify-center shadow-[0_4px_16px_rgba(212,175,55,0.45)] border border-white/40 group-hover:scale-105 active:scale-95 transition-all">
                  <ChevronLeft className="w-5 h-5 text-[#0D0D0F] stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] font-bold text-[#E0C368] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] tracking-tight whitespace-nowrap">
                  Details
                </span>
              </button>
            )}

            {/* 6. Atelier Sound Vinyl Disc */}
            <div className="w-10 h-10 rounded-full bg-black/70 border border-[#D4AF37]/60 flex items-center justify-center shadow-lg animate-spin [animation-duration:6s] mt-0.5">
              <Disc className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>

          {/* ========================================================
              BOTTOM OVERLAY: Floating Product Card Tab & Quick Buttons
             ======================================================== */}
          <div className="mt-auto relative z-20 p-4 pb-6 space-y-3 pointer-events-auto">
            {/* Title & Description Excerpt */}
            <div className="space-y-1.5 max-w-[78%] text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/80 border border-[#D4AF37] text-[#E0C368]">
                  VELA VERIFIED
                </span>
                <span className="text-[10px] text-white/70 font-mono">
                  {currentProduct.specifications.factoryBatch}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 drop-shadow-md">
                {currentProduct.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed drop-shadow-sm font-normal">
                {currentProduct.description}
              </p>
              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 text-[11px] font-medium text-[#E0C368]">
                {currentProduct.hashtags?.slice(0, 3).map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Floating Semi-transparent Product Bar with Price & 'Details ▶' */}
            <div className="p-3 bg-black/80 backdrop-blur-xl border border-[#D4AF37]/50 rounded-2xl shadow-2xl flex items-center justify-between gap-2.5 text-left">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentProduct.images[0]}
                  alt="thumb"
                  className="w-11 h-11 rounded-xl object-cover border border-[#2C2C35] shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#A0A0AB] block font-semibold truncate">
                    {currentProduct.title}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white font-mono">
                    {formatPrice(currentProduct.priceUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Cart & Dedicated Right 'Details ▶' */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleAddToCartClick}
                  className="p-2.5 rounded-xl border border-white/20 bg-black/60 text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                  title="Add to Cart"
                >
                  {addedNotice ? (
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => setIsDetailDrawerOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl btn-gold-gradient text-xs font-extrabold text-[#0D0D0F] flex items-center gap-1 cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
                >
                  <span>Details ▶</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            ★ RIGHT-SIDE DEDICATED SLIDE-OVER DETAIL TAB / DRAWER ★
           ======================================================== */}
        {isDetailDrawerOpen && (
          <div className="absolute inset-y-0 right-0 z-40 w-full sm:w-[420px] bg-[#141418] border-l border-[#26262E] shadow-2xl flex flex-col text-[#A0A0AB] animate-slide-in-right">
            {/* Drawer Header */}
            <div className="px-4 py-3.5 bg-[#18181F] border-b border-[#26262E] flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Atelier Master Specifications
                </h3>
              </div>
              <button
                onClick={() => setIsDetailDrawerOpen(false)}
                aria-label="Close details"
                className="p-1.5 rounded-full hover:bg-[#222228] text-[#A0A0AB] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content inside Right Drawer */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-none text-left">
              {/* Atelier Storefront Quick Link */}
              <div className="flex items-center justify-between p-3 bg-[#18181F] rounded-2xl border border-[#222228]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentSeller.avatar}
                    alt={currentSeller.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-white">
                        {currentSeller.name}
                      </span>
                      <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <span className="text-[10px] text-[#A0A0AB]">
                      {currentSeller.region} · {currentSeller.badge}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onViewSellerStorefront(currentSeller.id);
                  }}
                  className="px-2.5 py-1 text-[11px] font-bold btn-gold-outline rounded-full cursor-pointer"
                >
                  Visit Atelier
                </button>
              </div>

              {/* Title & Full Intro */}
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-white leading-snug">
                  {currentProduct.title}
                </h4>
                <p className="text-xs text-[#A0A0AB] leading-relaxed whitespace-pre-line font-normal">
                  {currentProduct.description}
                </p>
                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentProduct.hashtags?.map((tag, idx) => (
                    <span key={idx} className="text-[11px] font-medium text-[#E0C368]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Escrow Guarantee Box */}
              <div className="p-3.5 bg-[#18181F] rounded-2xl border border-[#26262E] space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#A0A0AB] uppercase tracking-wider block font-semibold">
                      Direct Atelier Price
                    </span>
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {formatPrice(currentProduct.priceUSD, currency)}
                    </span>
                  </div>
                  <span className="text-xs text-[#E0C368] font-bold bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#D4AF37]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>100% Secure Escrow</span>
                  </span>
                </div>
                <p className="text-[10px] text-[#737380]">
                  · VELA Escrow Guarantee: Payment is securely held until you review and approve physical macro QC inspection photos.
                </p>
              </div>

              {/* Micro Specifications Grid */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-white flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Precision Atelier Specifications</span>
                </h5>
                <div className="grid grid-cols-1 gap-2 text-xs bg-[#111115] p-3 rounded-2xl border border-[#222228]">
                  <div className="flex justify-between py-1 border-b border-[#1E1E24]">
                    <span className="text-[#737380]">Material</span>
                    <span className="font-semibold text-white text-right max-w-[200px]">
                      {currentProduct.specifications.material}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1E1E24]">
                    <span className="text-[#737380]">Hardware / Movement</span>
                    <span className="font-semibold text-white text-right max-w-[200px]">
                      {currentProduct.specifications.hardware}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1E1E24]">
                    <span className="text-[#737380]">Dimensions</span>
                    <span className="font-semibold text-white text-right">
                      {currentProduct.specifications.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1E1E24]">
                    <span className="text-[#737380]">Factory Batch</span>
                    <span className="font-mono font-bold text-[#E0C368]">
                      {currentProduct.specifications.factoryBatch}
                    </span>
                  </div>
                  {currentProduct.specifications.timegrapherSpec && (
                    <div className="flex justify-between py-1">
                      <span className="text-[#737380]">Timegrapher Reading</span>
                      <span className="font-mono text-[#D4AF37] text-right font-semibold">
                        {currentProduct.specifications.timegrapherSpec}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* QC Inspection Desk Previews */}
              {currentProduct.qcSamplePhotos && currentProduct.qcSamplePhotos.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Live Atelier QC Inspection Samples</span>
                  </h5>
                  <div className="space-y-2">
                    {currentProduct.qcSamplePhotos.map((qc) => (
                      <div
                        key={qc.id}
                        className="p-2.5 bg-[#18181F] rounded-xl border border-[#222228] flex items-center gap-2.5"
                      >
                        <img
                          src={qc.imageUrl}
                          alt={qc.title}
                          className="w-12 h-12 rounded-lg object-cover border border-[#2C2C35] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {qc.title}
                          </span>
                          <span className="text-[10px] text-[#A0A0AB] block truncate">
                            {qc.description}
                          </span>
                          {qc.measurements && (
                            <span className="text-[10px] text-[#D4AF37] font-mono font-semibold block">
                              {qc.measurements}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="space-y-2 pt-1 pb-4">
                <h5 className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Buyer Q&A & Reviews</span>
                  <span className="text-[#A0A0AB] font-mono font-normal">
                    ({currentProduct.comments?.length || 0})
                  </span>
                </h5>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {currentProduct.comments?.map((c) => (
                    <div
                      key={c.id}
                      className="p-2.5 bg-[#18181F] border border-[#222228] rounded-xl text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{c.author}</span>
                        <span className="text-[10px] text-[#737380]">{c.timeAgo}</span>
                      </div>
                      <p className="text-[#A0A0AB]">{c.content}</p>
                      {c.sellerReply && (
                        <div className="p-1.5 bg-[#111115] border-l-2 border-[#D4AF37] rounded-r text-[11px] text-[#A0A0AB]">
                          <span className="font-bold text-[#E0C368]">Atelier Reply: </span>
                          <span>{c.sellerReply}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fixed Action Footer Inside Right Drawer */}
            <div className="p-3.5 bg-[#18181F] border-t border-[#26262E] flex items-center gap-2 shrink-0">
              {/* 1:1 Chat Inquiry */}
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(currentSeller.id, currentProduct.id);
                }}
                className="p-3 rounded-xl border border-[#2C2C35] bg-[#111115] hover:bg-[#1A1A22] text-[#A0A0AB] hover:text-white transition-colors cursor-pointer shrink-0"
                title="1:1 Live Translation Inquiry"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCartClick}
                className="flex-1 py-3 px-3 text-xs font-bold btn-gold-outline rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer truncate"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                    <span className="truncate">Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Instant Buy */}
              <button
                onClick={handleBuyNowClick}
                className="flex-1 py-3 px-3 text-xs font-bold btn-gold-gradient rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95 truncate text-[#0D0D0F]"
              >
                <Zap className="w-4 h-4 text-[#0D0D0F]" />
                <span>Instant Buy</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
