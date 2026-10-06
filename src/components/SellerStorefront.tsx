import React, { useState } from 'react';
import { Seller, Product, Currency } from '../types';
import { ProductCard } from './ProductCard';
import {
  ShieldCheck,
  MessageSquare,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Search,
  Grid,
  FileText,
  Microscope,
} from 'lucide-react';

interface SellerStorefrontProps {
  seller: Seller;
  products: Product[];
  currency: Currency;
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  onOpenChat: (sellerId: string, productId?: string) => void;
}

export const SellerStorefront: React.FC<SellerStorefrontProps> = ({
  seller,
  products,
  currency,
  onBack,
  onSelectProduct,
  onAddToCart,
  onOpenChat,
}) => {
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(12840);
  const [profileTab, setProfileTab] = useState<'notes' | 'goods' | 'qc'>('notes');
  const [searchQuery, setSearchQuery] = useState('');

  const sellerProducts = products.filter((p) => p.sellerId === seller.id);
  const filteredProducts = sellerProducts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowToggle = () => {
    setFollowing(!following);
    setFollowersCount((prev) => (following ? prev - 1 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 select-none">
      {/* Top Return bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A0A0AB] hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <span className="text-[11px] text-[#737380]">
          Audit Status: {seller.verificationAuditDate}
        </span>
      </div>

      {/* Atelier Profile Header Card */}
      <div className="bg-[#141418] rounded-3xl overflow-hidden shadow-2xl border border-[#222228] text-left">
        {/* Banner */}
        <div className="h-44 sm:h-56 relative overflow-hidden bg-[#0D0D0F]">
          <img
            src={seller.bannerImage}
            alt={seller.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="bg-black/75 backdrop-blur-md text-[#E0C368] border border-[#D4AF37]/50 text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>On-Site Verified Atelier</span>
            </span>
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 pb-6 pt-0 relative -mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-24 h-24 rounded-full border-4 border-[#141418] shadow-lg object-cover bg-[#18181F]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    {seller.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#737380]">
                  <span className="text-[#A0A0AB] font-mono">ID: {seller.contactWeChat}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{seller.region}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleFollowToggle}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all cursor-pointer border ${
                  following
                    ? 'bg-black/60 border border-[#D4AF37] text-[#D4AF37]'
                    : 'btn-gold-gradient text-[#0D0D0F] border-transparent'
                }`}
              >
                {following ? '✓ Following' : '+ Follow'}
              </button>

              <button
                onClick={() => onOpenChat(seller.id)}
                className="px-4 py-2 text-xs font-bold rounded-full bg-[#181820] border border-[#26262E] hover:border-[#D4AF37]/50 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>

          {/* Bio & Stats */}
          <div className="mt-5 pt-4 border-t border-[#222228] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[#737380] block">Followers</span>
              <span className="font-extrabold text-white text-sm tabular-nums">
                {followersCount.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[#737380] block">Total Dispatches</span>
              <span className="font-extrabold text-white text-sm tabular-nums">
                {seller.successfulShipments.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[#737380] block">QC Pass Rate</span>
              <span className="font-extrabold text-[#E0C368] text-sm tabular-nums">
                {seller.qcPassRate}%
              </span>
            </div>
            <div>
              <span className="text-[#737380] block">Avg QC Time</span>
              <span className="font-extrabold text-white text-sm tabular-nums">
                {seller.avgQcHours} hrs
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#A0A0AB] leading-relaxed">
            {seller.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {seller.specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] text-[#E0C368] bg-black/60 border border-[#26262E] px-2.5 py-0.5 rounded-full font-medium"
              >
                #{spec}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 border-t border-[#222228] flex items-center justify-between bg-[#181820] text-xs">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setProfileTab('notes')}
              className={`py-3.5 font-bold flex items-center gap-1.5 relative cursor-pointer ${
                profileTab === 'notes' ? 'text-[#D4AF37]' : 'text-[#737380] hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Atelier Notes ({sellerProducts.length})</span>
              {profileTab === 'notes' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>

            <button
              onClick={() => setProfileTab('goods')}
              className={`py-3.5 font-bold flex items-center gap-1.5 relative cursor-pointer ${
                profileTab === 'goods' ? 'text-[#D4AF37]' : 'text-[#737380] hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Catalog</span>
              {profileTab === 'goods' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>

            <button
              onClick={() => setProfileTab('qc')}
              className={`py-3.5 font-bold flex items-center gap-1.5 relative cursor-pointer ${
                profileTab === 'qc' ? 'text-[#D4AF37]' : 'text-[#737380] hover:text-white'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>QC Inspection Archive</span>
              {profileTab === 'qc' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />
              )}
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative hidden sm:block w-48">
            <Search className="w-3.5 h-3.5 text-[#737380] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in store..."
              className="w-full text-xs pl-8 pr-3 py-1 bg-[#141418] border border-[#26262E] rounded-full text-white placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      {profileTab === 'notes' || profileTab === 'goods' ? (
        filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#141418] rounded-3xl border border-[#222228]">
            <p className="text-xs text-[#737380]">No matching atelier notes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                currency={currency}
                sellerAvatar={seller.avatar}
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
      ) : (
        /* QC Inspection Archive Tab */
        <div className="bg-[#141418] rounded-3xl p-6 border border-[#222228] space-y-6 text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#D4AF37]" />
              <span>{seller.name} Pre-Shipment Inspection Archive</span>
            </h3>
            <p className="text-xs text-[#A0A0AB]">
              Actual macro photographs, digital caliper thickness measurements, and timegrapher readings captured on the inspection bench before dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sellerProducts.flatMap((p) =>
              (p.qcSamplePhotos || []).map((qc) => (
                <div
                  key={qc.id}
                  className="bg-[#181820] border border-[#26262E] rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors"
                >
                  <img
                    src={qc.imageUrl}
                    alt={qc.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3.5 space-y-1">
                    <h4 className="text-xs font-bold text-white truncate">{qc.title}</h4>
                    <p className="text-[11px] text-[#A0A0AB] line-clamp-2">{qc.description}</p>
                    {qc.measurements && (
                      <span className="text-[10px] text-[#E0C368] font-mono block pt-1">
                        Measured: {qc.measurements}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
