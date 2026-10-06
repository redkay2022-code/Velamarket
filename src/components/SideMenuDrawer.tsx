import React from 'react';
import {
  X,
  Store,
  ShieldCheck,
  Microscope,
  ShoppingBag,
  Smartphone,
  Monitor,
  User,
  ChevronRight,
} from 'lucide-react';
import { Currency } from '../types';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  viewMode: 'responsive' | 'mobile_preview';
  setViewMode: (m: 'responsive' | 'mobile_preview') => void;
  onOpenSellerPortal: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onNavigate: (tab: 'market' | 'sellers' | 'qc' | 'guarantee' | 'profile') => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  currency,
  setCurrency,
  viewMode,
  setViewMode,
  onOpenSellerPortal,
  onOpenCart,
  cartCount,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="w-80 max-w-[85vw] bg-[#141418] border-r border-[#26262E] text-[#A0A0AB] h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#222228] flex items-center justify-between bg-[#181820]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-[0.2em] text-[#D4AF37] uppercase">
              VELA MENU
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A0A0AB] hover:text-white rounded-full hover:bg-[#222228] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6 scrollbar-none">
          {/* User Profile Summary */}
          <div
            onClick={() => {
              onNavigate('profile');
              onClose();
            }}
            className="p-4 bg-[#18181F] hover:bg-[#1E1E26] rounded-2xl cursor-pointer transition-colors flex items-center gap-3 border border-[#26262E]"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white truncate">Sophia_Seoul</span>
                <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E0C368] font-bold px-1.5 py-0.2 rounded-full">
                  VIP
                </span>
              </div>
              <p className="text-[11px] text-[#737380] font-mono">ID: VELA_948210</p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#737380]" />
          </div>

          {/* Quick Menu List */}
          <div className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => {
                onOpenSellerPortal();
                onClose();
              }}
              className="w-full p-3 rounded-xl hover:bg-[#1E1E26] text-[#A0A0AB] hover:text-white flex items-center justify-between transition-colors text-left cursor-pointer border border-transparent hover:border-[#D4AF37]/30"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <div className="flex items-center gap-1.5">
                  <span>Admin & Atelier Studio (/admin)</span>
                  <span className="text-[9px] bg-[#D4AF37]/20 text-[#E0C368] font-bold px-1.5 py-0.5 rounded border border-[#D4AF37]/40">
                    RED Editor
                  </span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#737380]" />
            </button>

            <button
              onClick={() => {
                onNavigate('sellers');
                onClose();
              }}
              className="w-full p-3 rounded-xl hover:bg-[#1E1E26] text-[#A0A0AB] hover:text-white flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-[#737380]" />
                <span>Verified Atelier Showrooms</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#737380]" />
            </button>

            <button
              onClick={() => {
                onNavigate('qc');
                onClose();
              }}
              className="w-full p-3 rounded-xl hover:bg-[#1E1E26] text-[#A0A0AB] hover:text-white flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Microscope className="w-4 h-4 text-[#737380]" />
                <span>Pre-Shipment Micro-QC Desk</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#737380]" />
            </button>

            <button
              onClick={() => {
                onNavigate('guarantee');
                onClose();
              }}
              className="w-full p-3 rounded-xl hover:bg-[#1E1E26] text-[#A0A0AB] hover:text-white flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Triangle Transit & Customs Guarantee</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#737380]" />
            </button>

            <button
              onClick={() => {
                onOpenCart();
                onClose();
              }}
              className="w-full p-3 rounded-xl hover:bg-[#1E1E26] text-[#A0A0AB] hover:text-white flex items-center justify-between transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#737380]" />
                <span>Cart & Escrow ({cartCount} items)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#737380]" />
            </button>
          </div>

          {/* Currency Settings in Drawer */}
          <div className="pt-2 border-t border-[#222228] space-y-2">
            <span className="text-[11px] font-bold text-[#737380] uppercase tracking-wider block">
              Display Currency
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(['USD', 'KRW', 'CNY', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`py-2 px-3 rounded-xl font-bold transition-all text-center cursor-pointer border ${
                    currency === c
                      ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
                      : 'bg-[#18181F] text-[#A0A0AB] hover:text-white border-[#26262E]'
                  }`}
                >
                  {c === 'KRW' ? 'KRW (₩)' : c === 'USD' ? 'USD ($)' : c === 'CNY' ? 'CNY (¥)' : 'EUR (€)'}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Switcher in Drawer */}
          <div className="pt-2 border-t border-[#222228] space-y-2">
            <span className="text-[11px] font-bold text-[#737380] uppercase tracking-wider block">
              Display Mode
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setViewMode('mobile_preview')}
                className={`py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  viewMode === 'mobile_preview'
                    ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
                    : 'bg-[#18181F] text-[#A0A0AB] hover:text-white border-[#26262E]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </button>
              <button
                onClick={() => setViewMode('responsive')}
                className={`py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                  viewMode === 'responsive'
                    ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
                    : 'bg-[#18181F] text-[#A0A0AB] hover:text-white border-[#26262E]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Fluid Responsive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Bottom */}
        <div className="p-4 border-t border-[#222228] text-[11px] text-[#737380] text-center bg-[#181820]">
          © 2026 VELA · Verified Luxury Atelier Direct
        </div>
      </div>
    </div>
  );
};
