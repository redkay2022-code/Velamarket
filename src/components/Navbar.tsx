import React from 'react';
import { Menu, Search, Plus } from 'lucide-react';

interface NavbarProps {
  homeSubTab: 'following' | 'explore';
  setHomeSubTab: (tab: 'following' | 'explore') => void;
  onOpenSideMenu: () => void;
  onOpenSearch: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  homeSubTab,
  setHomeSubTab,
  onOpenSideMenu,
  onOpenSearch,
  onOpenAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0F]/95 backdrop-blur-md border-b border-[#222228] select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
        {/* Left: Hamburger Menu Icon */}
        <button
          onClick={onOpenSideMenu}
          aria-label="Open menu"
          className="p-2 -ml-2 text-[#A0A0AB] hover:text-[#FFFFFF] rounded-full hover:bg-[#141418] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Center: VELA Brand & Following/Explore tabs */}
        <div className="flex items-center gap-6 sm:gap-8">
          <span className="text-[13px] tracking-[0.25em] font-extrabold text-[#D4AF37] uppercase select-none">
            VELA
          </span>

          <div className="h-3 w-px bg-[#26262E]" />

          <div className="flex items-center gap-5 sm:gap-6">
            <button
              onClick={() => setHomeSubTab('following')}
              className={`text-xs sm:text-sm transition-all py-1 relative cursor-pointer ${
                homeSubTab === 'following'
                  ? 'font-bold text-[#FFFFFF] scale-105'
                  : 'font-medium text-[#A0A0AB] hover:text-[#FFFFFF]'
              }`}
            >
              <span>Following</span>
              {homeSubTab === 'following' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#D4AF37] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setHomeSubTab('explore')}
              className={`text-xs sm:text-sm transition-all py-1 relative cursor-pointer ${
                homeSubTab === 'explore'
                  ? 'font-bold text-[#FFFFFF] scale-105'
                  : 'font-medium text-[#A0A0AB] hover:text-[#FFFFFF]'
              }`}
            >
              <span>Explore</span>
              {homeSubTab === 'explore' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#D4AF37] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Right: Admin Button & Search Icon */}
        <div className="flex items-center gap-1.5 -mr-2">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              aria-label="Open Admin & Media Studio"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#181822] hover:bg-[#222230] border border-[#D4AF37]/50 text-[#E0C368] hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37] stroke-[2.5]" />
              <span className="hidden sm:inline">/admin</span>
              <span className="sm:hidden text-[10px]">Post</span>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            aria-label="Open search"
            className="p-2 text-[#A0A0AB] hover:text-[#D4AF37] rounded-full hover:bg-[#141418] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
