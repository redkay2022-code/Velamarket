import React, { useState } from 'react';
import { Seller } from '../types';
import { MapPin, ArrowRight, MessageSquare, Store, Plus } from 'lucide-react';

interface SellersListViewProps {
  sellers: Seller[];
  onSelectSeller: (sellerId: string) => void;
  onOpenChat: (sellerId: string) => void;
  onOpenOnboardModal: () => void;
}

export const SellersListView: React.FC<SellersListViewProps> = ({
  sellers,
  onSelectSeller,
  onOpenChat,
  onOpenOnboardModal,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  const toggleFollow = (sellerId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowingMap((prev) => ({
      ...prev,
      [sellerId]: !prev[sellerId],
    }));
  };

  const filteredSellers = sellers.filter((s) => {
    if (selectedRegion === 'all') return true;
    return s.region.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222228] pb-5 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Global Ateliers & Master Workshops
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A0AB] max-w-2xl mt-1.5 leading-relaxed">
            Direct access to verified ateliers who passed physical on-site audits. Review real-time workshop feeds and pre-shipment micro-QC inspections before ordering.
          </p>
        </div>

        <button
          onClick={onOpenOnboardModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold btn-gold-gradient rounded-full transition-all cursor-pointer shrink-0 shadow-md active:scale-95 text-[#0D0D0F]"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Apply as Atelier</span>
        </button>
      </div>

      {/* Region Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedRegion('all')}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 border ${
            selectedRegion === 'all'
              ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
              : 'bg-[#141418] border-[#26262E] text-[#A0A0AB] hover:text-white'
          }`}
        >
          All Ateliers
        </button>
        <button
          onClick={() => setSelectedRegion('guangzhou')}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 border ${
            selectedRegion === 'guangzhou'
              ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
              : 'bg-[#141418] border-[#26262E] text-[#A0A0AB] hover:text-white'
          }`}
        >
          Guangzhou (Leather & Handbags)
        </button>
        <button
          onClick={() => setSelectedRegion('dongguan')}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 border ${
            selectedRegion === 'dongguan'
              ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
              : 'bg-[#141418] border-[#26262E] text-[#A0A0AB] hover:text-white'
          }`}
        >
          Dongguan (Master Watches & Horology)
        </button>
        <button
          onClick={() => setSelectedRegion('putian')}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 border ${
            selectedRegion === 'putian'
              ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
              : 'bg-[#141418] border-[#26262E] text-[#A0A0AB] hover:text-white'
          }`}
        >
          Putian (Footwear & 1:1 Lasts)
        </button>
        <button
          onClick={() => setSelectedRegion('hangzhou')}
          className={`px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer shrink-0 border ${
            selectedRegion === 'hangzhou'
              ? 'btn-gold-gradient border-[#D4AF37] text-[#0D0D0F]'
              : 'bg-[#141418] border-[#26262E] text-[#A0A0AB] hover:text-white'
          }`}
        >
          Hangzhou (Silk & Haute Tailoring)
        </button>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSellers.map((seller) => {
          const isFollowed = !!followingMap[seller.id];

          return (
            <div
              key={seller.id}
              onClick={() => onSelectSeller(seller.id)}
              className="bg-[#141418] border border-[#222228] rounded-3xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5 text-left"
            >
              {/* Cover Banner */}
              <div className="relative h-32 bg-[#0D0D0F] overflow-hidden">
                <img
                  src={seller.bannerImage}
                  alt={seller.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/40 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-[#D4AF37] text-[#E0C368] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {seller.badge}
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-5 relative -mt-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <div className="relative">
                      <img
                        src={seller.avatar}
                        alt={seller.name}
                        className="w-16 h-16 rounded-full border-2 border-[#D4AF37] shadow-md object-cover bg-[#18181F]"
                      />
                    </div>

                    {/* Follow button on card */}
                    <button
                      onClick={(e) => toggleFollow(seller.id, e)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer border ${
                        isFollowed
                          ? 'bg-black/60 border border-[#D4AF37] text-[#D4AF37]'
                          : 'btn-gold-gradient text-[#0D0D0F] border-transparent'
                      }`}
                    >
                      {isFollowed ? '✓ Following' : '+ Follow'}
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                      <span>{seller.name}</span>
                    </h3>
                    <p className="text-xs text-[#737380] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{seller.region}</span>
                    </p>
                  </div>

                  <p className="text-xs text-[#A0A0AB] line-clamp-2 leading-relaxed">
                    {seller.bio}
                  </p>

                  {/* Specialties chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {seller.specialties.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-[#E0C368] bg-black/60 border border-[#26262E] px-2.5 py-0.5 rounded-full font-medium"
                      >
                        #{spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Bar */}
                <div className="pt-3 border-t border-[#222228] grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-[#181820] rounded-xl border border-[#26262E]">
                    <span className="text-[10px] text-[#737380] block">Dispatches</span>
                    <span className="font-bold text-white tabular-nums">
                      {seller.successfulShipments.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-[#181820] rounded-xl border border-[#26262E]">
                    <span className="text-[10px] text-[#737380] block">QC Pass Rate</span>
                    <span className="font-bold text-[#E0C368] tabular-nums">
                      {seller.qcPassRate}%
                    </span>
                  </div>
                  <div className="p-2 bg-[#181820] rounded-xl border border-[#26262E]">
                    <span className="text-[10px] text-[#737380] block">Avg QC Time</span>
                    <span className="font-bold text-white tabular-nums">
                      {seller.avgQcHours}h
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenChat(seller.id);
                    }}
                    className="flex-1 py-2 text-xs font-bold text-[#A0A0AB] bg-[#181820] hover:text-white hover:bg-[#202028] rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#26262E]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Live 1:1 Chat</span>
                  </button>
                  <button
                    onClick={() => onSelectSeller(seller.id)}
                    className="flex-1 py-2 text-xs font-bold btn-gold-gradient text-[#0D0D0F] rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Visit Atelier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
