import React, { useState } from 'react';
import { Product, Order, Currency } from '../types';
import { formatPrice } from '../utils/helpers';
import { ProductCard } from './ProductCard';
import {
  ShieldCheck,
  Microscope,
  Truck,
  Heart,
  Package,
  Settings,
  ChevronRight,
  Shield,
} from 'lucide-react';

interface UserProfileViewProps {
  orders: Order[];
  likedProducts: Product[];
  currency: Currency;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  onOpenChat: (sellerId: string, productId?: string) => void;
  onNavigateToQC: () => void;
  onNavigateToSellers: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  orders,
  likedProducts,
  currency,
  onSelectProduct,
  onAddToCart,
  onOpenChat,
  onNavigateToQC,
}) => {
  const [activeTab, setActiveTab] = useState<'liked' | 'orders' | 'guarantee'>('liked');

  const pendingQcOrders = orders.filter((o) => o.status === 'QC_READY');
  const escrowHoldingTotal = orders.reduce((sum, o) => sum + o.totalUSD, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-20 select-none text-left">
      {/* Profile Header Card */}
      <div className="bg-[#141418] rounded-3xl p-6 border border-[#222228] shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-18 h-18 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#D4AF37] text-[#0D0D0F] flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">Sophia_Seoul</h1>
                <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E0C368] font-bold px-2 py-0.5 rounded-full">
                  VIP Collector
                </span>
              </div>
              <p className="text-xs text-[#737380] font-mono">
                ID: VELA_948210 · Region: Seoul, KR
              </p>
              <p className="text-xs text-[#A0A0AB] pt-0.5">
                Master leathercraft & clone horology direct collector 👜⏱️
              </p>
            </div>
          </div>

          <div className="text-[#737380] hover:text-white p-2 cursor-pointer transition-colors">
            <Settings className="w-5 h-5" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-8 pt-3 border-t border-[#222228] text-xs text-[#A0A0AB]">
          <div>
            <span className="font-bold text-white text-sm tabular-nums mr-1">4</span>
            <span className="text-[#737380]">Following Ateliers</span>
          </div>
          <div>
            <span className="font-bold text-white text-sm tabular-nums mr-1">342</span>
            <span className="text-[#737380]">Followers</span>
          </div>
          <div>
            <span className="font-bold text-white text-sm tabular-nums mr-1">
              {likedProducts.length}
            </span>
            <span className="text-[#737380]">Saved Notes</span>
          </div>
        </div>
      </div>

      {/* Quick Orders & Escrow Status Hub */}
      <div className="bg-[#141418] rounded-3xl p-5 border border-[#222228] shadow-2xl space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span>Active Orders & Escrow Protection</span>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-[#737380] hover:text-[#D4AF37] font-normal flex items-center gap-0.5 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          {/* Pending QC Card */}
          <div
            onClick={onNavigateToQC}
            className="p-3 bg-[#181820] hover:bg-[#1E1E28] border border-[#26262E] hover:border-[#D4AF37]/50 rounded-2xl cursor-pointer transition-colors space-y-1"
          >
            <Microscope className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <span className="text-[11px] font-bold text-white block">QC Approval Queue</span>
            <span className="text-xs font-extrabold text-[#E0C368]">
              {pendingQcOrders.length} Pending
            </span>
          </div>

          {/* Escrow Vault Card */}
          <div className="p-3 bg-[#181820] border border-[#26262E] rounded-2xl space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <span className="text-[11px] font-bold text-white block">Smart Escrow Vault</span>
            <span className="text-xs font-extrabold text-[#E0C368] font-mono">
              {formatPrice(escrowHoldingTotal, currency)}
            </span>
          </div>

          {/* Triangle Customs Card */}
          <div className="p-3 bg-[#181820] border border-[#26262E] rounded-2xl space-y-1">
            <Truck className="w-5 h-5 text-[#D4AF37] mx-auto" />
            <span className="text-[11px] font-bold text-white block">Triangle Transit</span>
            <span className="text-xs font-extrabold text-[#E0C368]">
              100% Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#222228] text-xs font-bold bg-[#141418] rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'liked'
              ? 'btn-gold-gradient text-[#0D0D0F]'
              : 'text-[#737380] hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Notes ({likedProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'orders'
              ? 'btn-gold-gradient text-[#0D0D0F]'
              : 'text-[#737380] hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('guarantee')}
          className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'guarantee'
              ? 'btn-gold-gradient text-[#0D0D0F]'
              : 'text-[#737380] hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Customs Code & Escrow Vault</span>
        </button>
      </div>

      {/* Tab 1: Liked Products */}
      {activeTab === 'liked' && (
        likedProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#141418] rounded-3xl border border-[#222228]">
            <Heart className="w-10 h-10 text-[#737380] mx-auto mb-2" />
            <p className="text-xs text-[#737380]">No saved atelier notes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            {likedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                currency={currency}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onViewSeller={() => {}}
                onOpenChat={(sId, pId, e) => {
                  e.stopPropagation();
                  onOpenChat(sId, pId);
                }}
              />
            ))}
          </div>
        )
      )}

      {/* Tab 2: Orders List */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#141418] rounded-3xl p-5 border border-[#222228] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#222228] pb-3 text-xs">
                <div>
                  <span className="font-mono text-[#737380] block">Order #{order.orderNumber}</span>
                  <span className="text-[11px] text-[#737380]">{order.createdAt}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    order.status === 'QC_READY'
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#E0C368]'
                      : 'bg-[#181820] border-[#26262E] text-white'
                  }`}
                >
                  {order.status === 'QC_READY' ? 'Pending QC Approval' : 'QC Approved & Clearing'}
                </span>
              </div>

              <div className="flex gap-4">
                <img
                  src={order.items[0]?.product.images[0]}
                  alt="Order item"
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover rounded-2xl border border-[#222228] shrink-0"
                />
                <div className="flex-1 space-y-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {order.items[0]?.product.title}
                  </h4>
                  <p className="text-xs text-[#737380]">
                    Atelier: {order.items[0]?.product.sellerName}
                  </p>
                  <p className="text-xs text-[#E0C368] font-mono font-bold">
                    Total: {formatPrice(order.totalUSD, currency)}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#222228] flex items-center justify-between text-xs">
                <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                  ✓ Protected by Smart Escrow
                </span>
                {order.status === 'QC_READY' && (
                  <button
                    onClick={onNavigateToQC}
                    className="px-4 py-1.5 btn-gold-gradient text-[#0D0D0F] font-bold rounded-full cursor-pointer shadow-md active:scale-95"
                  >
                    Inspect Physical QC
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Customs & Guarantee Vault */}
      {activeTab === 'guarantee' && (
        <div className="bg-[#141418] rounded-3xl p-6 border border-[#222228] shadow-2xl space-y-5">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              Personal Customs Code & Identity
            </h3>
            <p className="text-xs text-[#737380]">
              Registered customs clearance and shipping recipient records
            </p>
          </div>

          <div className="p-4 bg-[#181820] rounded-2xl border border-[#26262E] space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#222228]">
              <span className="text-[#737380]">Recipient Name:</span>
              <span className="font-bold text-white">David Kim</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#222228]">
              <span className="text-[#737380]">Personal Customs Code:</span>
              <span className="font-mono font-bold text-[#E0C368]">P230004928172 (Verified)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#737380]">Shipping Address:</span>
              <span className="text-white">152 Teheran-ro, Suite 1400, Gangnam-gu, Seoul</span>
            </div>
          </div>

          <div className="p-4 bg-[#181820] border border-[#D4AF37]/30 rounded-2xl space-y-1.5 text-xs text-[#E0C368]">
            <p className="font-bold flex items-center gap-1.5 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              100% Free Reshipment Guarantee on Triangle Customs Transit
            </p>
            <p className="text-[#A0A0AB] leading-relaxed">
              In the unlikely event of any customs inspection delay, seizure, or tax assessment on your registered code, VELA and the atelier guarantee immediate 100% free reproduction and expedited redispatch.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
