import React from 'react';

export type SubCategoryTag =
  | 'all'
  | 'news'
  | 'same_day'
  | 'new_releases'
  | 'VS'
  | 'APS'
  | 'day_date'
  | 'daytona'
  | 'cartier';

interface XiaohongshuSubNavProps {
  activeTag: SubCategoryTag;
  onSelectTag: (tag: SubCategoryTag) => void;
}

export const SUB_TAGS: { id: SubCategoryTag; label: string; badge?: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'news', label: 'News', badge: 'NEW' },
  { id: 'same_day', label: 'Same-Day Dispatch', badge: 'HOT' },
  { id: 'new_releases', label: 'New Releases' },
  { id: 'VS', label: 'VS Factory' },
  { id: 'APS', label: 'APS Factory' },
  { id: 'day_date', label: 'Day-Date' },
  { id: 'daytona', label: 'Daytona' },
  { id: 'cartier', label: 'Cartier' },
];

export const XiaohongshuSubNav: React.FC<XiaohongshuSubNavProps> = ({
  activeTag,
  onSelectTag,
}) => {
  return (
    <div className="bg-[#141418] border-b border-[#222228] select-none">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 flex items-center gap-2 overflow-x-auto py-2 sm:py-2.5 scrollbar-none overscroll-x-contain touch-pan-x">
        {SUB_TAGS.map((item) => {
          const isActive = activeTag === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTag(item.id)}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 active:scale-95 border ${
                isActive
                  ? 'btn-gold-gradient border-[#D4AF37]'
                  : 'bg-[#18181F] text-[#A0A0AB] hover:text-[#FFFFFF] border-[#26262E] hover:border-[#D4AF37]/40'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-extrabold border ${
                    isActive
                      ? 'bg-[#0D0D0F] text-[#D4AF37] border-[#0D0D0F]'
                      : 'bg-black/70 text-[#E0C368] border-[#D4AF37]/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
