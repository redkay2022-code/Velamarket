import React from 'react';
import { ArrowRight } from 'lucide-react';
import redHandbagLifestyle from '../assets/images/red_handbag_lifestyle_1791161928325.jpg';

interface HeroBannerProps {
  onExploreClick: () => void;
  onViewAteliersClick: () => void;
  onSelectCategoryTag: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onViewAteliersClick,
  onSelectCategoryTag,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#141418] to-[#0D0D0F] border-b border-[#222228] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/60 text-[#E0C368] border border-[#D4AF37]/40 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Direct Network of Verified Master Ateliers & Factories</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
              Beyond Social Media Fraud.<br />
              <span className="text-[#D4AF37]">Verified Atelier Feeds</span> &<br />
              Pre-Shipment Micro-QC
            </h1>

            <p className="text-sm sm:text-base text-[#A0A0AB] max-w-xl leading-relaxed">
              Guangzhou leather ateliers, Dongguan precision horology labs, and Putian sneaker guilds accredited in one unified ecosystem. <strong>100% Pre-Shipment Micro-QC</strong>, <strong>Decentralized Smart Escrow</strong>, and <strong>Guaranteed Triangle Customs Transit</strong>.
            </p>

            {/* Quick Trending Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#737380] font-semibold">Trending:</span>
              <button
                onClick={() => onSelectCategoryTag('leather')}
                className="px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] rounded-full border border-[#26262E] transition-colors cursor-pointer"
              >
                👜 Togo Leather B30
              </button>
              <button
                onClick={() => onSelectCategoryTag('watches')}
                className="px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] rounded-full border border-[#26262E] transition-colors cursor-pointer"
              >
                ⏱️ Dandong 4130 Chrono
              </button>
              <button
                onClick={() => onSelectCategoryTag('footwear')}
                className="px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] rounded-full border border-[#26262E] transition-colors cursor-pointer"
              >
                👟 1:1 Disassembly Last
              </button>
              <button
                onClick={() => onSelectCategoryTag('streetwear')}
                className="px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] rounded-full border border-[#26262E] transition-colors cursor-pointer"
              >
                🧥 850+ FP Goose Down
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-[#0D0D0F] btn-gold-gradient rounded-full transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Explore Atelier Feed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onViewAteliersClick}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:text-[#D4AF37] bg-[#181820] hover:bg-[#202028] border border-[#26262E] rounded-full transition-colors cursor-pointer"
              >
                <span>View Verified Ateliers</span>
              </button>
            </div>
          </div>

          {/* Right Featured Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-[#141418] border border-[#26262E] p-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0D0D0F]">
                <img
                  src={redHandbagLifestyle}
                  alt="Atelier note"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-1/3 left-1/3 group">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-white shadow-lg relative block" />
                  <div className="ml-2 -mt-3 bg-black/80 backdrop-blur-md text-[#E0C368] border border-[#D4AF37]/50 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-md whitespace-nowrap">
                    French Haas Togo Leather
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
