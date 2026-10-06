import React from 'react';
import { ShieldCheck, Truck, Microscope, Lock, RefreshCw } from 'lucide-react';

export const GuaranteeView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 select-none text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#D4AF37]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>VELA SMART PROTOCOL & GUARANTEES</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Eliminating Fraud, Seizures & Bait-and-Switch
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0AB] leading-relaxed">
          Four mandatory technological and operational pillars legally enforced to provide the safest direct marketplace between verified ateliers and international collectors.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#141418] border border-[#222228] rounded-3xl space-y-3 shadow-2xl hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center font-bold">
            <Microscope className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">1. 100% Pre-Shipment QC Approval</h3>
          <p className="text-xs text-[#A0A0AB] leading-relaxed">
            Every piece is photographed on the inspection bench with caliper measurements, macro engravings, and timegrapher readings. No package departs without explicit buyer approval.
          </p>
        </div>

        <div className="p-6 bg-[#141418] border border-[#222228] rounded-3xl space-y-3 shadow-2xl hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Decentralized Smart Escrow</h3>
          <p className="text-xs text-[#A0A0AB] leading-relaxed">
            Payment remains locked safely in smart escrow vaults. Funds are only settled to the atelier after physical delivery and final unboxing inspection by the buyer.
          </p>
        </div>

        <div className="p-6 bg-[#141418] border border-[#222228] rounded-3xl space-y-3 shadow-2xl hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">3. Insured Triangle Transit</h3>
          <p className="text-xs text-[#A0A0AB] leading-relaxed">
            Packages route through trusted Hong Kong and Singapore transit hubs. In the rare event of customs seizure or inspection loss, a 100% free reshipment or refund is guaranteed.
          </p>
        </div>

        <div className="p-6 bg-[#141418] border border-[#222228] rounded-3xl space-y-3 shadow-2xl hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">4. Physical On-Site Audits</h3>
          <p className="text-xs text-[#A0A0AB] leading-relaxed">
            Only master ateliers with verified physical production facilities, authentic raw material supply chains, and specialized precision machinery are accredited to sell.
          </p>
        </div>
      </div>

      {/* QC 6-Point Detailed Standard */}
      <div className="bg-[#141418] border border-[#222228] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <Microscope className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-lg font-bold text-white">VELA Standard 6-Point Micro-QC Inspection Code</h2>
            <p className="text-xs text-[#737380]">Mandatory inspection reports uploaded by ateliers prior to packaging</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#181820] rounded-2xl space-y-1.5 border border-[#26262E]">
            <span className="font-bold text-white block">① Stitch Spacing & Angle Alignment</span>
            <p className="text-[#A0A0AB]">Lin Câblé linen thread weight, stitches per inch, and saddle stitch lateral symmetry photographed under macro lenses.</p>
          </div>
          <div className="p-4 bg-[#181820] rounded-2xl space-y-1.5 border border-[#26262E]">
            <span className="font-bold text-white block">② Digital Caliper Measurements</span>
            <p className="text-[#A0A0AB]">Digital caliper verified measurements of leather cross-section and watch case thickness down to micron deviations.</p>
          </div>
          <div className="p-4 bg-[#181820] rounded-2xl space-y-1.5 border border-[#26262E]">
            <span className="font-bold text-white block">③ Digital Timegrapher Report</span>
            <p className="text-[#A0A0AB]">5-position daily rate deviation (±2s/day), balance wheel amplitude (290°+), and beat error (0.0ms) recorded.</p>
          </div>
          <div className="p-4 bg-[#181820] rounded-2xl space-y-1.5 border border-[#26262E]">
            <span className="font-bold text-white block">④ Typography & Foil Stamp Depth</span>
            <p className="text-[#A0A0AB]">Engraving stroke weight and depth mapping compared against authentic font kerning specifications.</p>
          </div>
          <div className="p-4 bg-[#181820] rounded-2xl space-y-1.5 border border-[#26262E]">
            <span className="font-bold text-white block">⑤ Micron Hardware Gold Plating</span>
            <p className="text-[#A0A0AB]">Vacuum ion plating thickness and protective film adhesion verified on all contact points.</p>
          </div>
          <div className="p-4 bg-[#181820] rounded-2xl space-y-1.5 border border-[#26262E]">
            <span className="font-bold text-white block">⑥ Packaging & Hologram Seals</span>
            <p className="text-[#A0A0AB]">Full packaging, authenticity guarantee cards, and tamper-evident serial security seals inspected.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
