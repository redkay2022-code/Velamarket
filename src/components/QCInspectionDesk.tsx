import React, { useState } from 'react';
import { Order, Currency } from '../types';
import { formatPrice } from '../utils/helpers';
import { TriangularShippingTracker } from './TriangularShippingTracker';
import {
  Microscope,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Plane,
  Truck,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';

interface QCInspectionDeskProps {
  orders: Order[];
  currency: Currency;
  onApproveQC: (orderId: string) => void;
  onRequestReQC: (orderId: string, note: string) => void;
  onOpenChatWithSeller: (sellerId: string, orderId: string) => void;
}

export const QCInspectionDesk: React.FC<QCInspectionDeskProps> = ({
  orders,
  currency,
  onApproveQC,
  onRequestReQC,
  onOpenChatWithSeller,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [activeViewTab, setActiveViewTab] = useState<'qc_viewer' | 'shipping_tracker'>('qc_viewer');
  const [reQcModalOpen, setReQcModalOpen] = useState(false);
  const [reQcReason, setReQcReason] = useState('');

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleApprove = () => {
    if (currentOrder) {
      onApproveQC(currentOrder.id);
      setActiveViewTab('shipping_tracker');
    }
  };

  const handleSubmitReQc = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentOrder && reQcReason.trim()) {
      onRequestReQC(currentOrder.id, reQcReason.trim());
      setReQcReason('');
      setReQcModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header Explainer */}
      <div className="border-b border-[#222228] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
              VELA INSPECTION & LOGISTICS LAB
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/60 border border-[#D4AF37] text-[#E0C368] font-bold">
              100% Customs Guaranteed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
            Pre-Shipment Micro-QC Inspection Lab & Logistics Radar
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A0AB] max-w-2xl mt-1.5 leading-relaxed">
            Eliminating bait-and-switch scams. Inspect microscopic caliper readings, stamping alignment, and timegrapher specs before the flight departs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#E0C368] bg-[#141418] border border-[#D4AF37]/50 px-4 py-2.5 rounded-2xl shadow-md">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>100% Free Atelier Replacement or Full Refund If Unsatisfied</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-[#141418] border border-[#222228] rounded-3xl space-y-3 shadow-md">
          <Microscope className="w-10 h-10 text-[#737380] mx-auto" />
          <h3 className="text-base font-bold text-[#FFFFFF]">No pending QC orders</h3>
          <p className="text-xs text-[#A0A0AB]">When you place an order, the atelier uploads high-res macro QC photos within 24 hours.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order list selector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A0A0AB]">
                My Orders & Shipments ({orders.length})
              </h3>
              <span className="text-[10px] text-[#737380]">Live Sync</span>
            </div>

            <div className="space-y-3">
              {orders.map((order) => {
                const isSelected = order.id === currentOrder?.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setSelectedPhotoIndex(0);
                      if (order.status === 'IN_TRANSIT' || order.status === 'DELIVERED') {
                        setActiveViewTab('shipping_tracker');
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#181822] border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.2)] ring-1 ring-[#D4AF37]'
                        : 'bg-[#141418] border-[#222228] hover:border-[#D4AF37]/40 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-[11px] text-[#A0A0AB]">{order.orderNumber}</span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          order.status === 'QC_READY'
                            ? 'bg-black/80 border-[#D4AF37] text-[#E0C368]'
                            : order.status === 'IN_TRANSIT'
                            ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] animate-pulse'
                            : order.status === 'QC_APPROVED'
                            ? 'bg-[#18181F] border-[#2C2C35] text-[#FFFFFF]'
                            : 'bg-black/60 border-emerald-500 text-emerald-400'
                        }`}
                      >
                        {order.status === 'QC_READY'
                          ? 'Pending QC Approval'
                          : order.status === 'QC_APPROVED'
                          ? 'QC Approved · Transit Hub'
                          : order.status === 'IN_TRANSIT'
                          ? '✈️ In Triangle Air Transit'
                          : 'Delivered'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#FFFFFF] line-clamp-1">
                      {order.items[0]?.product.title}
                    </h4>

                    <div className="mt-2.5 pt-2 border-t border-[#222228] flex items-center justify-between text-xs text-[#A0A0AB]">
                      <span className="text-[11px] text-[#737380]">{order.createdAt}</span>
                      <span className="font-bold text-[#FFFFFF] tabular-nums">
                        {formatPrice(order.totalUSD, currency)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QC Inspection & Tracking Interactive Stage */}
          {currentOrder && (
            <div className="lg:col-span-8 space-y-4">
              {/* Segmented Tab Switch: QC Photos vs 3-Country Shipping Tracker */}
              <div className="flex items-center bg-[#141418] p-1.5 rounded-2xl border border-[#222228] gap-1.5">
                <button
                  onClick={() => setActiveViewTab('qc_viewer')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeViewTab === 'qc_viewer'
                      ? 'btn-gold-gradient shadow-md'
                      : 'text-[#A0A0AB] hover:text-[#FFFFFF] hover:bg-[#18181F]'
                  }`}
                >
                  <Microscope className="w-4 h-4" />
                  <span>High-Res QC Inspection Viewer</span>
                  {currentOrder.status === 'QC_READY' && (
                    <span className="w-2 h-2 rounded-full bg-[#ff2442] animate-ping" />
                  )}
                </button>

                <button
                  onClick={() => setActiveViewTab('shipping_tracker')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeViewTab === 'shipping_tracker'
                      ? 'btn-gold-gradient shadow-md'
                      : 'text-[#A0A0AB] hover:text-[#FFFFFF] hover:bg-[#18181F]'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Triangle Transit Live Flight Radar</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#0D0D0F] text-[#E0C368] font-mono border border-[#D4AF37]/50">
                    via Hong Kong
                  </span>
                </button>
              </div>

              {/* View 1: Real-time 3-Country Triangular Shipping Tracker */}
              {activeViewTab === 'shipping_tracker' ? (
                <TriangularShippingTracker
                  order={currentOrder}
                  onApproveQC={handleApprove}
                />
              ) : (
                /* View 2: High-res QC Photo Carousel & Caliper Readings */
                <div className="bg-[#141418] border border-[#222228] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
                  {/* Order Status Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#222228]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#A0A0AB]">Order ID: {currentOrder.orderNumber}</span>
                        {currentOrder.escrowStatus === 'LOCKED_IN_ESCROW' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#E0C368] flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                            <span>Secured in Smart Escrow</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] mt-0.5">
                        {currentOrder.items[0]?.product.title}
                      </h3>
                      <p className="text-xs text-[#A0A0AB]">
                        Crafted by: <span className="text-[#E0C368] font-semibold">{currentOrder.items[0]?.product.sellerName}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] text-[#A0A0AB]">Shipping Method</div>
                      <div className="text-xs font-bold text-[#E0C368] bg-black/60 border border-[#D4AF37] px-3 py-1 rounded-full inline-block mt-0.5 shadow-sm">
                        Triangle Air Safe (100% Customs Insured)
                      </div>
                    </div>
                  </div>

                  {/* QC Photos Viewer */}
                  {currentOrder.qcPhotos && currentOrder.qcPhotos.length > 0 ? (
                    <div className="space-y-4">
                      {/* Big Image Viewer */}
                      <div className="relative aspect-[16/10] bg-[#0D0D0F] rounded-2xl overflow-hidden border border-[#26262E] flex items-center justify-center">
                        <img
                          src={currentOrder.qcPhotos[selectedPhotoIndex]?.imageUrl}
                          alt="QC Physical Check"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />

                        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#E0C368]">
                              QC Item #{selectedPhotoIndex + 1}: {currentOrder.qcPhotos[selectedPhotoIndex]?.title}
                            </span>
                            <span className="text-[#A0A0AB] text-[11px] font-mono">
                              Photo {selectedPhotoIndex + 1} / {currentOrder.qcPhotos.length}
                            </span>
                          </div>
                          <p className="text-xs text-[#A0A0AB]">
                            {currentOrder.qcPhotos[selectedPhotoIndex]?.description}
                          </p>
                          {currentOrder.qcPhotos[selectedPhotoIndex]?.measurements && (
                            <div className="text-xs font-mono text-[#D4AF37] bg-black/80 border border-[#D4AF37]/50 px-3 py-1 rounded-md inline-block mt-1">
                              Calibrated Measurement: {currentOrder.qcPhotos[selectedPhotoIndex]?.measurements}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* QC Photo Thumbnails */}
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {currentOrder.qcPhotos.map((photo, idx) => (
                          <button
                            key={photo.id || idx}
                            onClick={() => setSelectedPhotoIndex(idx)}
                            className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              selectedPhotoIndex === idx
                                ? 'border-[#D4AF37] shadow-lg scale-102 ring-1 ring-[#D4AF37]'
                                : 'border-[#26262E] opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={photo.imageUrl}
                              alt="QC Thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 left-1 bg-black/80 text-[#E0C368] border border-[#D4AF37]/50 text-[10px] px-1.5 rounded font-mono">
                              #{idx + 1}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center bg-[#111115] border border-[#222228] rounded-2xl space-y-2">
                      <Clock className="w-8 h-8 text-[#D4AF37] mx-auto animate-spin" />
                      <p className="text-sm font-semibold text-[#FFFFFF]">QC photography in progress at the atelier</p>
                      <p className="text-xs text-[#A0A0AB]">Ultra-high resolution measurement photos are uploaded within 24 hours.</p>
                    </div>
                  )}

                  {/* Action Buttons: Approve vs Request Re-QC */}
                  <div className="pt-4 border-t border-[#222228] space-y-3">
                    {currentOrder.status === 'QC_READY' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setReQcModalOpen(true)}
                          className="px-4 py-3 text-xs font-bold btn-gold-outline rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                          <span>Request Additional Photos / Replace Item</span>
                        </button>
                        <button
                          onClick={handleApprove}
                          className="px-4 py-3 text-xs font-bold btn-gold-gradient rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 text-[#0D0D0F]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0D0D0F]" />
                          <span>Approve QC & Release for Triangle Flight</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 bg-[#111116] border border-[#D4AF37]/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                          <div>
                            <p className="font-bold text-[#FFFFFF]">QC Inspection Approved by Buyer.</p>
                            <p className="text-[#A0A0AB]">
                              Air transit label generated. Safe transit underway through Hong Kong customs clearance hub.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveViewTab('shipping_tracker')}
                          className="px-4 py-2 rounded-xl btn-gold-gradient text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer text-[#0D0D0F]"
                        >
                          <span>View Live Flight Radar</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0D0D0F]" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-[#A0A0AB] px-1">
                      <span>Need to communicate directly with the artisan?</span>
                      <button
                        onClick={() => onOpenChatWithSeller(currentOrder.items[0]?.product.sellerId || '', currentOrder.id)}
                        className="text-[#D4AF37] hover:text-[#FFFFFF] hover:underline font-bold cursor-pointer"
                      >
                        Open 1:1 Live Translated Chat
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Re-QC Request Modal */}
      {reQcModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141418] border border-[#26262E] rounded-3xl p-6 max-w-lg w-full space-y-4 text-left shadow-2xl">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#FFFFFF]">Request Additional QC / Item Replacement</h3>
            </div>
            <p className="text-xs text-[#A0A0AB]">
              Specify any concerns (stitching deviation, scratches, alignment). The atelier will take additional micro-photos or replace with a new 1:1 master grade item.
            </p>
            <form onSubmit={handleSubmitReQc} className="space-y-4">
              <textarea
                value={reQcReason}
                onChange={(e) => setReQcReason(e.target.value)}
                rows={4}
                required
                placeholder="e.g., Please provide a closer macro shot of the 6 o'clock index and date magnifier alignment."
                className="w-full p-3 bg-[#0D0D0F] border border-[#26262E] rounded-xl text-xs text-[#FFFFFF] placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReQcModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold btn-gold-outline rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold btn-gold-gradient rounded-xl cursor-pointer text-[#0D0D0F]"
                >
                  Submit Request to Atelier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
