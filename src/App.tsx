import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Seller, Product, Order, CartItem, Currency } from './types';
import { INITIAL_SELLERS, INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { XiaohongshuSubNav, SubCategoryTag } from './components/XiaohongshuSubNav';
import { ProductCard } from './components/ProductCard';
import { XiaohongshuMasonryFeed } from './components/XiaohongshuMasonryFeed';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShortVideoReelModal } from './components/ShortVideoReelModal';
import { SellerStorefront } from './components/SellerStorefront';
import { QCInspectionDesk } from './components/QCInspectionDesk';
import { SellersListView } from './components/SellersListView';
import { GuaranteeView } from './components/GuaranteeView';
import { CartDrawer } from './components/CartDrawer';
import { BilingualChatModal } from './components/BilingualChatModal';
import { SellerDashboardModal } from './components/SellerDashboardModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { UserProfileView } from './components/UserProfileView';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckCircle2, Wifi, Battery } from 'lucide-react';

export default function App() {
  // Global State
  const [sellers, setSellers] = useState<Seller[]>(INITIAL_SELLERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }
  ]);
  const [currency, setCurrency] = useState<Currency>('KRW');

  // Navigation State
  const [currentTab, setCurrentTab] = useState<'market' | 'sellers' | 'qc' | 'guarantee' | 'profile'>('market');
  const [homeSubTab, setHomeSubTab] = useState<'following' | 'explore'>('explore');
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  // Requested SubCategory Horizontal Scroll Tag State: news, same_day, new_releases, VS, APS, day_date, daytona, cartier
  const [activeSubTag, setActiveSubTag] = useState<SubCategoryTag>('all');

  // View Mode: 'responsive' (fluid full-width responsive web app) or 'mobile_preview' (Xiaohongshu phone frame simulator)
  const [viewMode, setViewMode] = useState<'responsive' | 'mobile_preview'>('responsive');
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileScreen = windowWidth < 768;

  // Support direct /admin URL path or #admin hash navigation
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/admin') || hash.includes('admin')) {
        setSellerModalOpen(true);
      }
    };
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);
    return () => {
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('hashchange', handleRoute);
    };
  }, []);

  // Drawers and Modals
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'priceLow'>('popular');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVideoReelProduct, setSelectedVideoReelProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [sellerModalOpen, setSellerModalOpen] = useState(false);

  const handleProductSelect = (p: Product) => {
    if (p.isVideo) {
      setSelectedVideoReelProduct(p);
    } else {
      setSelectedProduct(p);
    }
  };

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatSellerId, setChatSellerId] = useState<string>(sellers[0].id);
  const [chatProductId, setChatProductId] = useState<string | undefined>(undefined);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Infinite Scroll State for Xiaohongshu Waterfall Feed
  const [feedLimit, setFeedLimit] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setFeedLimit((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 600);
  }, [isLoadingMore]);

  // Reset infinite scroll limit whenever category or search filter changes
  useEffect(() => {
    setFeedLimit(8);
  }, [activeSubTag, homeSubTab, searchQuery, sortBy]);

  // IntersectionObserver for Desktop and Mobile Viewport Infinite Scroll
  useEffect(() => {
    if (currentTab !== 'market') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [currentTab, handleLoadMore]);

  // Phone frame scroll listener for inner scrollable frame
  const handlePhoneScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 300) {
      handleLoadMore();
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`'${product.title}' added to cart.`);
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setCurrentTab('qc');
    showToast(`Order confirmed! Order #${newOrder.orderNumber} - Redirected to Pre-Shipment QC Desk.`);
  };

  // QC Actions
  const handleApproveQC = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: 'QC_APPROVED',
              qcApprovedAt: '2026-10-04 Live Approved',
              trackingNumber: `KR-TRI-${Math.floor(100000 + Math.random() * 900000)}`,
            }
          : order
      )
    );
    showToast('QC physical inspection approved! Triangle transit customs clearance label issued.');
  };

  const handleRequestReQC = (orderId: string, note: string) => {
    showToast(`Correction/exchange request translated and transmitted to atelier: "${note}"`);
  };

  // Chat Trigger
  const handleOpenChat = (sellerId: string, productId?: string) => {
    setChatSellerId(sellerId);
    setChatProductId(productId);
    setChatOpen(true);
  };

  // Seller storefront navigation
  const handleViewSeller = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewSeller = (newSeller: Seller) => {
    setSellers((prev) => [newSeller, ...prev]);
    showToast(`New atelier '${newSeller.name}' application approved!`);
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New item '${newProduct.title}' published to atelier store!`);
  };

  // Like toggling on a product
  const handleToggleLike = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newLiked = !p.isLiked;
          return {
            ...p,
            isLiked: newLiked,
            likesCount: newLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  // Filtered Products for Marketplace based on subcategory tags: news, same_day, new_releases, VS, APS, day_date, daytona, cartier
  const filteredProducts = products
    .filter((p) => {
      // If on 'Following' tab, show followed items
      if (homeSubTab === 'following') {
        const isFollowed = p.sellerId === 'seller-baiyun' || p.sellerId === 'seller-clean-watch' || p.isLiked;
        if (!isFollowed) return false;
      }

      // Filter by requested Horizontal Scroll Tags: news, same_day, new_releases, VS, APS, day_date, daytona, cartier
      if (activeSubTag === 'news') {
        const isNews = p.id.includes('news') || p.category === 'accessories' || p.hashtags.some(h => h.toLowerCase().includes('news'));
        if (!isNews) return false;
      } else if (activeSubTag === 'same_day') {
        const isReady = p.leadTimeDays === 0 || p.hashtags.some(h => h.includes('ReadyToShip') || h.includes('SameDay'));
        if (!isReady) return false;
      } else if (activeSubTag === 'new_releases') {
        const isNew = p.hashtags.some(h => h.includes('NewRelease') || h.includes('NewArrival')) || p.id.includes('aps') || p.id.includes('cartier') || p.id.includes('vs');
        if (!isNew) return false;
      } else if (activeSubTag === 'VS') {
        const isVS = p.title.includes('VS') || p.hashtags.some(h => h.includes('VS'));
        if (!isVS) return false;
      } else if (activeSubTag === 'APS') {
        const isAPS = p.title.includes('APS') || p.hashtags.some(h => h.includes('APS'));
        if (!isAPS) return false;
      } else if (activeSubTag === 'day_date') {
        const isDD = p.title.includes('Day-Date') || p.title.includes('DayDate') || p.hashtags.some(h => h.includes('DayDate'));
        if (!isDD) return false;
      } else if (activeSubTag === 'daytona') {
        const isDT = p.title.includes('Daytona') || p.title.includes('Cosmograph') || p.id.includes('daytona') || p.hashtags.some(h => h.includes('Daytona'));
        if (!isDT) return false;
      } else if (activeSubTag === 'cartier') {
        const isCartier = p.title.includes('Cartier') || p.title.includes('Santos') || p.hashtags.some(h => h.includes('Cartier'));
        if (!isCartier) return false;
      }

      // Filter by search query
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hashtags.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.specifications.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.likesCount - a.likesCount;
      if (sortBy === 'priceLow') return a.priceUSD - b.priceUSD;
      return b.reviewCount - a.reviewCount;
    });

  const activeSellerForStorefront = sellers.find((s) => s.id === selectedSellerId);
  const activeChatSeller = sellers.find((s) => s.id === chatSellerId) || sellers[0];
  const activeChatProduct = products.find((p) => p.id === chatProductId);
  const pendingQcOrdersCount = orders.filter((o) => o.status === 'QC_READY').length;
  const likedProducts = products.filter((p) => p.isLiked);

  // Dynamic infinite scroll waterfall product stream with diverse aspect ratios & videos
  const displayedProducts: Product[] = React.useMemo(() => {
    if (filteredProducts.length === 0) return [];
    const list: Product[] = [];
    for (let i = 0; i < feedLimit; i++) {
      const base = filteredProducts[i % filteredProducts.length];
      const cycle = Math.floor(i / filteredProducts.length);
      if (cycle === 0) {
        list.push(base);
      } else {
        list.push({
          ...base,
          id: `${base.id}-inf-${cycle}-${i}`,
          likesCount: base.likesCount + cycle * 43,
        });
      }
    }
    return list;
  }, [filteredProducts, feedLimit]);

  // Core render for both fluid responsive and phone simulator
  const renderAppContent = (isInsidePhoneFrame = false) => (
    <div className={`flex flex-col min-h-full ${isInsidePhoneFrame ? 'pb-16' : 'pb-24 lg:pb-8'}`}>
      {/* If viewing an individual seller storefront */}
      {selectedSellerId && activeSellerForStorefront ? (
        <SellerStorefront
          seller={activeSellerForStorefront}
          products={products}
          currency={currency}
          onBack={() => setSelectedSellerId(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onOpenChat={(sId, pId) => handleOpenChat(sId, pId)}
        />
      ) : (
        <>
          {/* Tab 1: Marketplace / Xiaohongshu Pure Photo & Video Feed */}
          {currentTab === 'market' && (
            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 space-y-2.5 sm:space-y-3.5">
              {/* Search query notice if searching */}
              {searchQuery && (
                <div className="flex items-center justify-between px-3.5 py-2 bg-[#141418] rounded-full border border-[#222228] text-xs">
                  <span className="text-[#A0A0AB]">
                    Search Results: <strong className="text-[#D4AF37]">"{searchQuery}"</strong> ({filteredProducts.length} atelier notes)
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#E0C368] hover:text-[#D4AF37] underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* IMMEDIATELY: PHOTO & VIDEO WATERFALL (Authentic Xiaohongshu Masonry Layout) */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#141418] border border-[#222228] rounded-3xl space-y-3">
                  <p className="text-sm font-semibold text-[#FFFFFF]">No matching atelier posts found.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveSubTag('all');
                      setHomeSubTab('explore');
                    }}
                    className="px-5 py-2 text-xs font-bold btn-gold-gradient rounded-full"
                  >
                    View All Feed
                  </button>
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  {/* Xiaohongshu Staggered 2-Column Waterfall (Videos larger & taller, photos compact) */}
                  <XiaohongshuMasonryFeed
                    products={displayedProducts}
                    sellers={sellers}
                    currency={currency}
                    isInsidePhoneFrame={isInsidePhoneFrame}
                    onSelectProduct={(p) => handleProductSelect(p)}
                    onAddToCart={handleAddToCart}
                    onToggleLike={handleToggleLike}
                    onOpenChat={(sId, pId) => handleOpenChat(sId, pId)}
                    onViewSeller={(sId) => handleViewSeller(sId)}
                  />

                  {/* Infinite Scroll Sentinel & VELA Luxury Loading Spinner */}
                  <div ref={sentinelRef} className="py-8 flex flex-col items-center justify-center gap-3">
                    {isLoadingMore ? (
                      <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#141418] border border-[#D4AF37]/50 shadow-xl text-xs font-bold text-[#E0C368]">
                        <span className="w-4 h-4 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                        <span>✦ Loading real-time photo & video feed...</span>
                      </div>
                    ) : (
                      <button
                        onClick={handleLoadMore}
                        className="px-5 py-2 rounded-full bg-[#141418] border border-[#26262E] hover:border-[#D4AF37]/50 text-xs font-medium text-[#A0A0AB] hover:text-[#FFFFFF] transition-all cursor-pointer hover:bg-[#181820]"
                      >
                        + Load More Atelier Notes
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: All Verified Sellers & Ateliers */}
          {currentTab === 'sellers' && (
            <SellersListView
              sellers={sellers}
              onSelectSeller={handleViewSeller}
              onOpenChat={handleOpenChat}
              onOpenOnboardModal={() => setSellerModalOpen(true)}
            />
          )}

          {/* Tab 3: QC Inspection Desk */}
          {currentTab === 'qc' && (
            <QCInspectionDesk
              orders={orders}
              currency={currency}
              onApproveQC={handleApproveQC}
              onRequestReQC={handleRequestReQC}
              onOpenChatWithSeller={handleOpenChat}
            />
          )}

          {/* Tab 4: Platform Guarantees */}
          {currentTab === 'guarantee' && <GuaranteeView />}

          {/* Tab 5: My Profile (Xiaohongshu "我" Tab) */}
          {currentTab === 'profile' && (
            <UserProfileView
              orders={orders}
              likedProducts={likedProducts}
              currency={currency}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onOpenChat={handleOpenChat}
              onNavigateToQC={() => setCurrentTab('qc')}
              onNavigateToSellers={() => setCurrentTab('sellers')}
            />
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0F] text-[#A0A0AB] font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#141418] text-[#FFFFFF] text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-[#D4AF37] animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. EXACT FIRST LINE: Hamburger icon (☰), Following, Explore, and Search (🔍) */}
      <Navbar
        homeSubTab={homeSubTab}
        setHomeSubTab={(tab) => {
          setSelectedSellerId(null);
          setCurrentTab('market');
          setHomeSubTab(tab);
        }}
        onOpenSideMenu={() => setIsSideMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setSellerModalOpen(true)}
      />

      {/* 2. RIGHT BELOW THE FIRST MENU BAR: Horizontal subcategory navigation */}
      {currentTab === 'market' && !selectedSellerId && (
        <XiaohongshuSubNav
          activeTag={activeSubTag}
          onSelectTag={(tag) => {
            setActiveSubTag(tag);
            setSelectedSellerId(null);
            setCurrentTab('market');
          }}
        />
      )}

      {/* VIEWPORT CONTROLLER:
          If viewMode === 'mobile_preview' on desktop, display in a gorgeous authentic iPhone / Xiaohongshu Phone Simulator Frame!
          If on actual mobile device or viewMode === 'responsive', render full fluid responsive web app!
      */}
      {viewMode === 'mobile_preview' ? (
        <div className="flex-1 py-6 px-4 flex flex-col items-center justify-center bg-[#08080A]">
          <div className="text-center mb-3 space-y-1">
            <span className="text-xs font-bold text-[#E0C368] bg-black/60 border border-[#D4AF37]/40 px-3.5 py-1 rounded-full inline-block">
              ✦ VELA Haute Curation Mobile View
            </span>
          </div>

          {/* Authentic Phone Hardware Frame */}
          <div className="relative w-full max-w-[400px] h-[820px] bg-[#0D0D0F] rounded-[50px] shadow-[0_25px_80px_rgba(0,0,0,0.8)] border-[10px] border-[#1C1C24] flex flex-col overflow-hidden">
            {/* Phone Top Notch / Dynamic Island & Status Bar */}
            <div className="h-10 bg-[#0D0D0F] border-b border-[#222228] flex items-center justify-between px-6 shrink-0 select-none z-30">
              <span className="text-xs font-bold text-[#FFFFFF] font-mono">09:41</span>
              <div className="w-20 h-4 bg-[#141418] rounded-full border border-[#222228]" />
              <div className="flex items-center gap-1.5 text-[#A0A0AB]">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Scrollable Phone App Body with Infinite Scroll Support */}
            <div
              onScroll={handlePhoneScroll}
              className="flex-1 overflow-y-auto relative bg-[#0D0D0F] scrollbar-none"
            >
              {renderAppContent(true)}
            </div>

            {/* Mobile Bottom Navigation Bar Inside Frame */}
            <MobileBottomNav
              currentTab={currentTab}
              setCurrentTab={(tab) => {
                setSelectedSellerId(null);
                setCurrentTab(tab);
              }}
              onOpenCreate={() => setSellerModalOpen(true)}
              pendingQcCount={pendingQcOrdersCount}
              cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              onOpenCart={() => setCartOpen(true)}
            />
          </div>
        </div>
      ) : (
        /* Full Fluid Responsive Web App */
        <div className="flex-1 bg-[#0D0D0F]">
          {renderAppContent(false)}

          {/* Mobile Bottom Nav (visible on mobile viewports automatically) */}
          <div className="lg:hidden">
            <MobileBottomNav
              currentTab={currentTab}
              setCurrentTab={(tab) => {
                setSelectedSellerId(null);
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCreate={() => setSellerModalOpen(true)}
              pendingQcCount={pendingQcOrdersCount}
              cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              onOpenCart={() => setCartOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Hamburger Slide-out Drawer */}
      <SideMenuDrawer
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        currency={currency}
        setCurrency={setCurrency}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenSellerPortal={() => setSellerModalOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onNavigate={(tab) => {
          setSelectedSellerId(null);
          setCurrentTab(tab);
        }}
      />

      {/* Xiaohongshu Search Modal Sheet */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectTag={(tag) => {
          setSelectedSellerId(null);
          setCurrentTab('market');
          setHomeSubTab('explore');
          setActiveSubTag('all');
        }}
      />

      {/* Product Detail Note Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          seller={sellers.find((s) => s.id === selectedProduct.sellerId)}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => handleAddToCart(p)}
          onBuyNow={(p) => {
            handleAddToCart(p);
            setSelectedProduct(null);
            setCartOpen(true);
          }}
          onOpenChat={(sId, pId) => {
            setSelectedProduct(null);
            handleOpenChat(sId, pId);
          }}
          onViewSellerStorefront={(sId) => handleViewSeller(sId)}
        />
      )}

      {/* Short-form Vertical Video Reel Modal */}
      {selectedVideoReelProduct && (
        <ShortVideoReelModal
          initialProduct={selectedVideoReelProduct}
          videoProducts={products.filter((p) => p.isVideo)}
          sellers={sellers}
          currency={currency}
          onClose={() => setSelectedVideoReelProduct(null)}
          onOpenProductDetail={(p) => {
            setSelectedVideoReelProduct(null);
            setSelectedProduct(p);
          }}
          onAddToCart={(p) => handleAddToCart(p)}
          onBuyNow={(p) => {
            handleAddToCart(p);
            setSelectedVideoReelProduct(null);
            setCartOpen(true);
          }}
          onOpenChat={(sId, pId) => {
            setSelectedVideoReelProduct(null);
            handleOpenChat(sId, pId);
          }}
          onViewSellerStorefront={(sId) => {
            setSelectedVideoReelProduct(null);
            handleViewSeller(sId);
          }}
        />
      )}

      {/* Cart & Escrow Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Bilingual AI Translated Chat Modal */}
      {chatOpen && activeChatSeller && (
        <BilingualChatModal
          seller={activeChatSeller}
          product={activeChatProduct}
          onClose={() => setChatOpen(false)}
        />
      )}

      {/* Seller Dashboard & Onboarding Modal */}
      {sellerModalOpen && (
        <SellerDashboardModal
          sellers={sellers}
          onAddNewSeller={handleAddNewSeller}
          onAddNewProduct={handleAddNewProduct}
          onClose={() => setSellerModalOpen(false)}
        />
      )}
    </div>
  );
}
