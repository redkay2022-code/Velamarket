import React from 'react';
import { XCircle, CheckCircle, ShieldCheck, AlertOctagon } from 'lucide-react';

export const TrustComparisonSection: React.FC = () => {
  return (
    <section className="bg-[#0D0D0F] py-14 border-t border-[#222228] select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 text-[#E0C368] border border-[#D4AF37]/40 rounded-full text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Buyer Protection Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Unregulated Social DM Direct Transfers vs VELA Verified Smart Escrow
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0AB]">
            Completely eliminating post-deposit disappearance, bait-and-switch substitutions, and customs destruction.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left: Instagram / TikTok DM Risks */}
          <div className="bg-[#141418] border border-rose-900/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-950 border border-rose-800 flex items-center justify-center">
                <AlertOctagon className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Risks of Direct Social DM Transfers</h3>
                <p className="text-xs text-rose-400/80 font-medium">Sending wire or crypto directly to unverified private sellers</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#A0A0AB]">
              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Post-Payment Account Deletion & Ghosting</strong>
                  <span>Once crypto or wire transfers are completed, fraudulent sellers block accounts with zero recovery recourse.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Bait-and-Switch Low Grade Delivery</strong>
                  <span>Promotional videos showcase artisanal pieces, while packages contain cheap plastic alternatives without pre-shipment QC.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Total Loss on Customs Interception</strong>
                  <span>Sellers claim bad luck upon customs seizure, refusing replacements and passing 100% loss to the buyer.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Language Barrier & Miscommunication</strong>
                  <span>Poor translation causing wrong sizing, specification mismatches, and complete radio silence post-payment.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: VELA Verified Platform */}
          <div className="bg-[#141418] border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-black/60 border border-[#D4AF37] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">VELA Verified Atelier Network</h3>
                <p className="text-xs text-[#E0C368] font-medium">Decentralized Smart Escrow + Pre-Shipment Micro-QC</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#A0A0AB]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">100% Decentralized Smart Escrow</strong>
                  <span>Funds are locked safely until you receive and inspect the physical piece in person. Zero fraud risk.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Mandatory Pre-Shipment Micro-QC Approval</strong>
                  <span>Digital calipers, timegrapher readings, and stamping macros must be reviewed and approved before departure.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">100% Triangle Transit Customs Guarantee</strong>
                  <span>Dispatched via insured Hong Kong and Singapore transit hubs with immediate free replacement upon any seizure.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Real-Time Bilingual AI Translation</strong>
                  <span>Direct communication with workshop masters with instantaneous 2-way translation ensuring exact specifications.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
