import React from 'react';
import { Home, Store, Plus, Microscope, User, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: 'market' | 'sellers' | 'qc' | 'guarantee' | 'profile';
  setCurrentTab: (tab: 'market' | 'sellers' | 'qc' | 'guarantee' | 'profile') => void;
  onOpenCreate: () => void;
  pendingQcCount: number;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCreate,
  pendingQcCount,
  cartCount,
  onOpenCart,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#141418]/95 backdrop-blur-md border-t border-[#222228] flex items-center justify-around min-h-[3.5rem] pt-1 pb-[max(0.25rem,env(safe-area-inset-bottom,0px))] px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] select-none">
      {/* Tab 1: Home / Feed (Explore) */}
      <button
        onClick={() => setCurrentTab('market')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentTab === 'market' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
        }`}
      >
        <Home className={`w-5 h-5 ${currentTab === 'market' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5 font-medium">Explore</span>
      </button>

      {/* Tab 2: Atelier Shops */}
      <button
        onClick={() => setCurrentTab('sellers')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentTab === 'sellers' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
        }`}
      >
        <Store className={`w-5 h-5 ${currentTab === 'sellers' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5 font-medium">Ateliers</span>
      </button>

      {/* Tab 3: Center VELA Gold '+' Button (Atelier Portal / Post) */}
      <div className="flex-1 flex justify-center py-1">
        <button
          onClick={onOpenCreate}
          aria-label="Atelier portal & post"
          className="w-10 h-7 rounded-lg btn-gold-gradient flex items-center justify-center shadow-lg active:scale-90 transition-transform cursor-pointer border border-[#E0C368]"
        >
          <Plus className="w-5 h-5 stroke-[2.8] text-[#0D0D0F]" />
        </button>
      </div>

      {/* Tab 4: QC Inspection Desk with badge */}
      <button
        onClick={() => setCurrentTab('qc')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative cursor-pointer ${
          currentTab === 'qc' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
        }`}
      >
        <div className="relative">
          <Microscope className={`w-5 h-5 ${currentTab === 'qc' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          {pendingQcCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-black border border-[#D4AF37] text-[#E0C368] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {pendingQcCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-medium">QC Lab</span>
      </button>

      {/* Tab 5: Profile */}
      <button
        onClick={() => setCurrentTab('profile')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative cursor-pointer ${
          currentTab === 'profile' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
        }`}
      >
        <User className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5 font-medium">Profile</span>
      </button>
    </nav>
  );
};
