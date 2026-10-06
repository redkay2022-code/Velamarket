import React, { useState } from 'react';
import { Order } from '../types';
import {
  Plane,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Clock,
  MapPin,
  ExternalLink,
  Building2,
  Truck,
  Package,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface TriangularShippingTrackerProps {
  order: Order;
  onApproveQC?: () => void;
}

interface TimelineCheckpoint {
  id: string;
  stageIndex: number;
  country: string;
  countryFlag: string;
  hubName: string;
  statusTitle: string;
  detail: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
  specCode?: string;
}

export const TriangularShippingTracker: React.FC<TriangularShippingTrackerProps> = ({
  order,
  onApproveQC,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeStageFilter, setActiveStageFilter] = useState<number | null>(null);

  // Derive stage index (0: Factory QC, 1: HK/SG Hub, 2: Incheon Customs, 3: Domestic Delivery)
  let currentStage = 0;
  if (order.status === 'QC_READY') currentStage = 0;
  else if (order.status === 'QC_APPROVED') currentStage = 1;
  else if (order.status === 'IN_TRANSIT') currentStage = 2;
  else if (order.status === 'DELIVERED') currentStage = 3;

  const trackingCode = order.trackingNumber && order.trackingNumber !== 'PENDING_BUYER_APPROVAL'
    ? order.trackingNumber
    : `VELA-TRI-HK${order.orderNumber.replace(/[^0-9]/g, '').slice(-6) || '884920'}`;

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stages = [
    {
      index: 0,
      title: 'Atelier Precision QC',
      subtitle: 'Dongguan Master Workshop',
      country: 'CN',
      flag: '🇨🇳',
      icon: Building2,
      desc: '100% Caliper & Timegrapher Macro QC Inspection and Seal',
    },
    {
      index: 1,
      title: 'Freeport Transit Hub',
      subtitle: 'Hong Kong Free Trade Zone',
      country: 'HK',
      flag: '🇭🇰',
      icon: Plane,
      desc: 'Neutral port transshipment, customs relabeling & encrypted NFC seal',
    },
    {
      index: 2,
      title: 'Customs Clearance',
      subtitle: 'Cargo Terminal 2',
      country: 'KR',
      flag: '🇰🇷',
      icon: ShieldCheck,
      desc: '100% insured green-line customs clearance certificate issued',
    },
    {
      index: 3,
      title: 'Final Delivery',
      subtitle: 'Express Courier Door-to-Door',
      country: 'KR',
      flag: '📦',
      icon: Truck,
      desc: 'Premium courier delivery directly and securely to buyer',
    },
  ];

  const checkpoints: TimelineCheckpoint[] = [
    {
      id: 'cp-1',
      stageIndex: 0,
      country: 'China',
      countryFlag: '🇨🇳',
      hubName: 'Dongguan Master Atelier Lab (Guangdong)',
      statusTitle: 'Master Crafting Completed & High-Res Macro QC Photos Captured',
      detail: 'Passed microscopic stitch alignment tests and 5-position movement timegrapher calibration. High-resolution photos uploaded to buyer private viewer.',
      timestamp: '2026-10-03 14:20:15 CST',
      isCompleted: order.status !== 'PENDING_QC',
      isCurrent: order.status === 'QC_READY',
      specCode: 'BATCH-CLN4130-V4 // QC-PASS-0992',
    },
    {
      id: 'cp-2',
      stageIndex: 1,
      country: 'Hong Kong SAR',
      countryFlag: '🇭🇰',
      hubName: 'Hong Kong Kwai Chung Freeport Transit Logistics Hub',
      statusTitle: 'Arrived at Hong Kong Transit Hub & Repackaged for Triangle Flight',
      detail: 'Manifest transitioned to neutral international cargo. Encrypted authenticity hologram NFC seal applied with double-layer waterproof air cushioning.',
      timestamp: order.status === 'QC_READY' ? 'Estimated within 12h after approval' : '2026-10-03 21:40:00 HKT',
      isCompleted: currentStage >= 1 && order.status !== 'QC_READY',
      isCurrent: currentStage === 1,
      specCode: 'FLIGHT: CX-Cargo 418 // HAWB: 160-8492019',
    },
    {
      id: 'cp-3',
      stageIndex: 2,
      country: 'South Korea',
      countryFlag: '🇰🇷',
      hubName: 'Incheon International Airport Cargo Terminal 2',
      statusTitle: 'Customs Import Declaration & Clearance Certificate Issued',
      detail: 'Commercial cargo arrival from Hong Kong. Pre-cleared electronic declaration ensures zero seizure risk (100% free reshipment guarantee in effect).',
      timestamp: currentStage >= 2 ? '2026-10-04 08:30:10 KST' : 'Expected within 24h of flight departure',
      isCompleted: currentStage >= 2,
      isCurrent: currentStage === 2,
      specCode: 'CUSTOMS-ENTRY: 2026-KR-49201 // UNIPASS COMPLIANT',
    },
    {
      id: 'cp-4',
      stageIndex: 3,
      country: 'South Korea',
      countryFlag: '🇰🇷',
      hubName: 'Express Courier Central Logistics Center',
      statusTitle: 'Handed Over to Premium Courier for Final Delivery',
      detail: `Assigned to delivery courier for ${order.shippingAddress || 'Destination address'}. Verification required upon delivery.`,
      timestamp: currentStage === 3 ? '2026-10-04 13:10:00 KST' : 'Same-day courier dispatch upon clearance',
      isCompleted: currentStage === 3,
      isCurrent: currentStage === 3,
      specCode: 'DOMESTIC-TRACKING: 6892-4910-2918',
    },
  ];

  return (
    <div className="bg-[#141418] border border-[#222228] rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
      {/* 1. Header Bar: Tracking Code & 3-Country Guarantee Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#222228]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#D4AF37] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              Live Triangle Transit Flight Radar
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#E0C368] border border-[#D4AF37]/40 font-semibold">
              100% Customs Guaranteed
            </span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] font-mono tracking-tight">
              {trackingCode}
            </h3>
            <button
              onClick={handleCopyTracking}
              className="p-1.5 rounded-lg bg-[#18181F] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#FFFFFF] border border-[#26262E] transition-colors cursor-pointer"
              title="Copy tracking code"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            {copied && <span className="text-[11px] text-[#D4AF37] font-medium animate-fade-in">Copied!</span>}
          </div>
        </div>

        {/* Live Route Flow Badge */}
        <div className="flex items-center gap-2 bg-[#0D0D0F] border border-[#26262E] px-3.5 py-2 rounded-2xl text-xs">
          <span className="text-xs font-semibold text-[#A0A0AB]">Flight Route:</span>
          <div className="flex items-center gap-1.5 font-bold font-mono text-[#FFFFFF]">
            <span className="text-[#E0C368]">Dongguan (CN)</span>
            <span className="text-[#737380]">→</span>
            <span className="text-[#D4AF37]">Hong Kong (HK)</span>
            <span className="text-[#737380]">✈</span>
            <span className="text-[#E0C368]">Incheon (KR)</span>
          </div>
        </div>
      </div>

      {/* 2. Visual 4-Step Triangular Logistics Pipeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#A0A0AB]">
          <span className="font-semibold text-[#FFFFFF] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
            Triangle Transit Logistics Pipeline Progress
          </span>
          <span className="text-[11px] text-[#D4AF37] font-mono">
            {currentStage === 0 && 'STEP 1 / 4 (Atelier QC Review Stage)'}
            {currentStage === 1 && 'STEP 2 / 4 (Hong Kong Freeport Transit Stage)'}
            {currentStage === 2 && 'STEP 3 / 4 (Customs Clearance Stage)'}
            {currentStage === 3 && 'STEP 4 / 4 (Final Delivery Complete)'}
          </span>
        </div>

        {/* Interactive Stepper Visual */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {stages.map((stg) => {
            const Icon = stg.icon;
            const isPassed = currentStage > stg.index;
            const isCurrent = currentStage === stg.index;
            const isSelected = activeStageFilter === stg.index;

            return (
              <button
                key={stg.index}
                onClick={() => setActiveStageFilter(isSelected ? null : stg.index)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isCurrent
                    ? 'bg-[#181822] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]/50'
                    : isPassed
                    ? 'bg-[#111116] border-[#2C2C38] text-[#A0A0AB]'
                    : 'bg-[#0E0E12] border-[#1E1E26] opacity-60 hover:opacity-90'
                } ${isSelected ? 'ring-2 ring-[#E0C368]' : ''}`}
              >
                {/* Active pulse glow bar */}
                {isCurrent && (
                  <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B89628]" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{stg.flag}</span>
                    <span className="text-[10px] font-mono font-bold text-[#737380] uppercase">
                      STAGE 0{stg.index + 1}
                    </span>
                  </div>

                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isPassed
                        ? 'bg-[#D4AF37] text-[#0D0D0F]'
                        : isCurrent
                        ? 'bg-[#D4AF37]/20 text-[#E0C368] border border-[#D4AF37] animate-pulse'
                        : 'bg-[#1E1E26] text-[#737380]'
                    }`}
                  >
                    {isPassed ? '✓' : stg.index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-bold text-xs text-[#FFFFFF]">
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#D4AF37]' : 'text-[#737380]'}`} />
                  <span className={isCurrent ? 'text-[#D4AF37]' : ''}>{stg.title}</span>
                </div>

                <p className="text-[11px] text-[#A0A0AB] mt-1 font-medium truncate">
                  {stg.subtitle}
                </p>

                <p className="text-[10px] text-[#737380] mt-1 line-clamp-2 leading-relaxed">
                  {stg.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Real-time Checkpoints Log */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#FFFFFF] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            Live Logistics Movement History
          </span>
          <span className="text-[11px] text-[#737380]">
            Encrypted Satellite Logistics Feed
          </span>
        </div>

        <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#222228]">
          {checkpoints
            .filter((cp) => activeStageFilter === null || cp.stageIndex === activeStageFilter)
            .map((cp) => (
              <div
                key={cp.id}
                className={`relative pl-8 text-xs transition-all ${
                  cp.isCurrent
                    ? 'opacity-100'
                    : cp.isCompleted
                    ? 'opacity-85'
                    : 'opacity-40'
                }`}
              >
                {/* Node Dot */}
                <div
                  className={`absolute left-2 top-2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                    cp.isCurrent
                      ? 'bg-[#D4AF37] border-[#FFFFFF] shadow-[0_0_12px_#D4AF37]'
                      : cp.isCompleted
                      ? 'bg-[#181820] border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#141418] border-[#2C2C38]'
                  }`}
                >
                  {cp.isCompleted ? (
                    <span className="text-[8px] font-bold">✓</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#737380]" />
                  )}
                </div>

                {/* Card Container */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    cp.isCurrent
                      ? 'bg-[#181822] border-[#D4AF37]/60 shadow-lg'
                      : 'bg-[#111116] border-[#222228]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#FFFFFF]">
                      <span>{cp.countryFlag}</span>
                      <span className="text-xs">{cp.hubName}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#D4AF37]">
                      {cp.timestamp}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#E0C368]">
                    {cp.statusTitle}
                  </p>

                  <p className="text-[11px] text-[#A0A0AB] mt-1 leading-relaxed">
                    {cp.detail}
                  </p>

                  {cp.specCode && (
                    <div className="mt-2 pt-2 border-t border-[#1E1E26] flex items-center justify-between text-[10px] font-mono text-[#737380]">
                      <span>Tracking Code: {cp.specCode}</span>
                      <span className="text-[#E0C368] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 4. Protection Notice & Direct Action Footer */}
      <div className="p-4 bg-[#0D0D0F] border border-[#222228] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <p className="font-bold text-[#FFFFFF]">
              100% Customs Clearance Guarantee in Effect
            </p>
            <p className="text-[11px] text-[#A0A0AB]">
              Routing through Hong Kong neutral freeports eliminates customs seizure risks. Free reshipment or 100% refund guaranteed upon any customs delay.
            </p>
          </div>
        </div>

        {order.status === 'QC_READY' && onApproveQC && (
          <button
            onClick={onApproveQC}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full btn-gold-gradient text-xs font-bold shrink-0 transition-transform active:scale-95 cursor-pointer shadow-lg text-[#0D0D0F]"
          >
            Approve QC & Release Flight
          </button>
        )}
      </div>
    </div>
  );
};
