import React from 'react';
import { ShieldCheck, Truck, Lock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'market' | 'sellers' | 'qc' | 'guarantee') => void;
  onOpenSellerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSellerModal }) => {
  return (
    <footer className="bg-[#0A0A0D] text-[#737380] border-t border-[#1C1C24] text-xs py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-lg font-bold tracking-[0.15em] text-[#D4AF37] uppercase">VELA</span>
            <p className="text-[#A0A0AB] leading-relaxed max-w-md">
              Direct marketplace for verified luxury ateliers and master factories. Eliminating social media fraud, bait-and-switch, and customs seizures with 100% decentralized smart escrow and pre-shipment micro-QC inspections.
            </p>
            <div className="flex items-center gap-4 text-[#737380] pt-2 text-[11px]">
              <span>· 100% Pre-Shipment QC Approval</span>
              <span>· Triangle Transit Customs Guarantee</span>
              <span>· Decentralized Smart Escrow</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('market')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Marketplace Feed
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sellers')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Verified Atelier Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('qc')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Pre-Shipment QC Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guarantee')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Customs & Escrow Guarantees
                </button>
              </li>
            </ul>
          </div>

          {/* Seller Services */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">
              Atelier Portal
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onOpenSellerModal}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Atelier Onboarding Application</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSellerModal}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Seller Studio & QC Upload
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSellerModal}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Smart Escrow Settlement Protocol
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C1C24] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#737380]">
          <p>© 2026 VELA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#A0A0AB] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#A0A0AB] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#A0A0AB] cursor-pointer">Dispute Resolution & Escrow Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
