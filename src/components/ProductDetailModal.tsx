import React, { useState, useRef } from 'react';
import { Product, Currency, Seller, NoteComment } from '../types';
import { formatPrice, safeShare, getFilterStyle } from '../utils/helpers';
import {
  X,
  ChevronLeft,
  Heart,
  MessageSquare,
  ShoppingBag,
  ShieldCheck,
  Check,
  Send,
  Award,
  ChevronRight,
  Zap,
  Share2,
  Bookmark
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  seller?: Seller;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onOpenChat: (sellerId: string, productId: string) => void;
  onViewSellerStorefront: (sellerId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  seller,
  currency,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenChat,
  onViewSellerStorefront,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPins, setShowPins] = useState(true);
  const [addedNotice, setAddedNotice] = useState(false);
  const [comments, setComments] = useState<NoteComment[]>(product.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(product.isLiked || false);
  const [likesCount, setLikesCount] = useState(product.likesCount || 120);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  // Swipe / Drag gesture state for smooth photo slide
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe && activeImageIndex < product.images.length - 1) {
      setActiveImageIndex((prev) => prev + 1);
    }
    if (isRightSwipe && activeImageIndex > 0) {
      setActiveImageIndex((prev) => prev - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCartClick = () => {
    onAddToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      onAddToCart(product);
    }
  };

  const handleToggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    setLikesCount((prev) => (next ? prev + 1 : prev - 1));
    if (next) {
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: NoteComment = {
      id: `c-new-${Date.now()}`,
      author: 'VELA VIP Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      content: newCommentText.trim(),
      timeAgo: 'Just now',
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText('');
  };

  const sellerName = seller?.name || product.sellerName || 'VS Watch Studio';
  const sellerAvatar =
    seller?.avatar ||
    product.sellerAvatar ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      {/* 
        Xiaohongshu Style Unified Vertical Scroll Modal Container:
        The entire note (photos, author, title, description, price, specs, reviews)
        flows in ONE continuous vertical scroll so the photo naturally scrolls up out of view as you read down!
      */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[94vh] sm:max-w-2xl bg-[#141418] border border-[#26262E] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#A0A0AB]">
        
        {/* ========================================================
            1. TOP STICKY HEADER: Back Button, Seller Info, +Follow, Share
           ======================================================== */}
        <div className="sticky top-0 z-30 px-4 py-3 bg-[#141418]/95 backdrop-blur-md border-b border-[#222228] flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Back / Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-full hover:bg-[#222228] text-[#A0A0AB] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Seller Avatar & Atelier Name */}
            <button
              onClick={() => {
                onClose();
                onViewSellerStorefront(product.sellerId);
              }}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <img
                src={sellerAvatar}
                alt={sellerName}
                className="w-8 h-8 rounded-full object-cover border border-[#2C2C35] group-hover:border-[#D4AF37] shrink-0"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate max-w-[130px] sm:max-w-[180px]">
                    {sellerName}
                  </span>
                  <Award className="w-3 h-3 text-[#D4AF37] shrink-0" />
                </div>
                <p className="text-[10px] text-[#A0A0AB]">{product.sellerRegion}</p>
              </div>
            </button>

            {/* Gold +Follow Button */}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`ml-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                isFollowing
                  ? 'bg-black/60 border border-[#D4AF37] text-[#D4AF37]'
                  : 'btn-gold-gradient text-[#0D0D0F]'
              }`}
            >
              {isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          </div>

          {/* Right Actions: Share & Close X */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                safeShare({ title: product.title, url: window.location.href });
              }}
              aria-label="Share"
              className="p-2 rounded-full hover:bg-[#222228] text-[#A0A0AB] hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full hover:bg-[#222228] text-[#A0A0AB] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================
            2. UNIFIED SCROLLABLE BODY
           ======================================================== */}
        <div className="flex-1 overflow-y-auto scrollbar-none space-y-4">
          
          {/* PHOTO CAROUSEL AREA */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] max-h-[520px] bg-[#0D0D0F] overflow-hidden select-none">
            {/* Top-Right: Page Counter Pill Indicator */}
            <div className="absolute top-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-white text-xs font-mono font-bold flex items-center gap-1 shadow-lg pointer-events-none">
              <span className="text-[#D4AF37]">{activeImageIndex + 1}</span>
              <span className="text-white/40">/</span>
              <span>{product.images.length}</span>
            </div>

            {/* Quality Tier or Custom Watermark Badge in Top-Left */}
            {product.watermarkBadge ? (
              <div className="absolute top-3.5 left-3.5 z-20 bg-black/85 backdrop-blur-md text-[#E0C368] border border-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-md">
                <Award className="w-3 h-3 text-[#D4AF37]" />
                <span>{product.watermarkBadge}</span>
              </div>
            ) : (
              <div className="absolute top-3.5 left-3.5 z-20 bg-black/80 backdrop-blur-md text-[#E0C368] border border-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>{product.tier}</span>
              </div>
            )}

            {/* Smooth Horizontal Touch/Swipe Image Track */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex h-full w-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-full h-full flex-shrink-0 flex items-center justify-center relative p-1"
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      style={getFilterStyle(product.filterPreset, product.filterIntensity)}
                      className="w-full h-full object-contain max-h-[520px] transition-all"
                    />

                    {/* Interactive Image Tag Pins on first slide */}
                    {showPins && product.imagePins && idx === 0 && (
                      <div className="absolute inset-0 pointer-events-none">
                        {product.imagePins.map((pin, i) => (
                          <div
                            key={pin.id || i}
                            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                          >
                            <div className="group relative flex items-center">
                              <span className="w-3.5 h-3.5 rounded-full bg-white border border-[#D4AF37] shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-ping absolute" />
                              <span className="w-3 h-3 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg relative" />
                              <div
                                className={`bg-black/85 backdrop-blur-md text-[#E0C368] border border-[#D4AF37]/50 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap shadow-md flex items-center gap-1.5 ${
                                  pin.align === 'left' ? 'mr-2 -order-1' : 'ml-2'
                                }`}
                              >
                                {pin.factory && (
                                  <span className="px-1.5 py-0.2 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[9.5px] font-bold">
                                    {pin.factory}
                                  </span>
                                )}
                                <span>{pin.label}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Slider Left & Right Arrow Buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer border border-white/15 z-10 shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer border border-white/15 z-10 shadow-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Dots indicator at bottom of photo */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                  {product.images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeImageIndex === i ? 'w-5 bg-[#D4AF37]' : 'w-1.5 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Quick Strip */}
            {product.images.length > 1 && (
              <div className="absolute bottom-0 inset-x-0 p-2 bg-black/60 backdrop-blur-xs flex items-center gap-2 overflow-x-auto scrollbar-none z-10">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#D4AF37] scale-105'
                        : 'border-[#26262E] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb ${idx}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================
              PRODUCT DETAILS
             ======================================================== */}
          <div className="px-4 sm:px-6 space-y-4">
            
            {/* Title & Introduction Text */}
            <div className="space-y-2 pt-1 text-left">
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {product.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A0AB] leading-relaxed whitespace-pre-line font-normal">
                {product.description}
              </p>

              {/* Xiaohongshu Hashtags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.hashtags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-[#E0C368] hover:text-[#D4AF37] cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & Escrow Specifications Box */}
            <div className="bg-[#18181F] p-4 rounded-2xl border border-[#26262E] space-y-3.5 shadow-lg text-left">
              {/* Price Display */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-[#A0A0AB] block uppercase tracking-wider">
                    Direct Atelier Order (Escrow Protected)
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono">
                    {formatPrice(product.priceUSD, currency)}
                  </span>
                </div>

                <span className="text-xs text-[#E0C368] font-semibold bg-black/75 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#D4AF37] shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Secure Escrow</span>
                </span>
              </div>

              {/* Detailed Specs Quick Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A0A0AB] bg-[#111115] p-3 rounded-xl border border-[#222228]">
                <div>
                  <span className="text-[#737380]">Material: </span>
                  <span className="font-medium text-white">{product.specifications.material}</span>
                </div>
                <div>
                  <span className="text-[#737380]">Hardware: </span>
                  <span className="font-medium text-white">{product.specifications.hardware}</span>
                </div>
                <div>
                  <span className="text-[#737380]">Dimensions: </span>
                  <span className="font-medium text-white">{product.specifications.dimensions}</span>
                </div>
                <div>
                  <span className="text-[#737380]">Factory Batch: </span>
                  <span className="font-medium text-[#E0C368] font-mono">{product.specifications.factoryBatch}</span>
                </div>
              </div>

              <p className="text-[10px] text-center text-[#737380]">
                · Live physical QC photos uploaded before dispatch; shipment requires your final approval.
              </p>
            </div>

            {/* Social Proof: Comments & Q&A */}
            <div className="space-y-3 pt-2 text-left pb-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>Buyer Reviews & Q&A</span>
                  <span className="text-[#A0A0AB] font-mono">({comments.length})</span>
                </h4>

                <span className="text-xs text-[#737380]">
                  100% Verified Buyer Reviews
                </span>
              </div>

              <div className="space-y-2.5">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-[#18181F] border border-[#222228] rounded-xl space-y-1.5 text-xs text-[#A0A0AB]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-5 h-5 rounded-full object-cover border border-[#2C2C35]"
                        />
                        <span className="font-semibold text-white">{comment.author}</span>
                      </div>
                      <span className="text-[10px] text-[#737380]">{comment.timeAgo}</span>
                    </div>
                    <p className="text-[#A0A0AB] pl-7 leading-relaxed">{comment.content}</p>
                    {comment.sellerReply && (
                      <div className="ml-7 mt-1.5 p-2 bg-[#111115] border-l-2 border-[#D4AF37] rounded-r-lg text-[11px] text-[#A0A0AB]">
                        <span className="font-bold text-[#E0C368]">Atelier Reply: </span>
                        <span>{comment.sellerReply}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Comment Input Form */}
              <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Ask a question or leave feedback for the atelier..."
                  className="flex-1 px-3.5 py-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-xs text-white placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 btn-gold-outline rounded-xl text-xs font-semibold flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. FIXED BOTTOM ACTION BAR
           ======================================================== */}
        <div className="sticky bottom-0 z-30 px-4 py-3 bg-[#141418]/95 backdrop-blur-md border-t border-[#222228] flex items-center gap-2.5 shrink-0 shadow-[0_-10px_25px_rgba(0,0,0,0.6)]">
          {/* 1:1 In-App Translate Chat Button */}
          <button
            onClick={() => onOpenChat(product.sellerId, product.id)}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-[#A0A0AB] hover:text-[#D4AF37] transition-colors cursor-pointer shrink-0"
            title="1:1 Live Translation Inquiry"
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-semibold">Chat</span>
          </button>

          {/* Like Heart Button */}
          <button
            onClick={handleToggleLike}
            className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 transition-colors cursor-pointer shrink-0 ${
              isLiked ? 'text-[#D4AF37]' : 'text-[#A0A0AB] hover:text-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? 'fill-[#D4AF37]' : ''} ${
                isPopping ? 'animate-heart-pop' : ''
              }`}
            />
            <span className="text-[10px] font-mono tabular-nums">{likesCount}</span>
          </button>

          {/* Wishlist / Bookmark Button */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 transition-colors cursor-pointer shrink-0 ${
              isBookmarked ? 'text-[#D4AF37]' : 'text-[#A0A0AB] hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#D4AF37]' : ''}`} />
            <span className="text-[10px] font-semibold">Save</span>
          </button>

          {/* REQUIRED TAB BUTTON: Add to Cart */}
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

          {/* REQUIRED TAB BUTTON: Buy Now */}
          <button
            onClick={handleBuyNowClick}
            className="flex-1 py-3 px-3 text-xs font-bold btn-gold-gradient rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95 truncate text-[#0D0D0F]"
          >
            <Zap className="w-4 h-4 text-[#0D0D0F]" />
            <span>Buy Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
