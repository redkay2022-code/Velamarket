import React, { useState } from 'react';
import { Search, X, Flame } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectTag: (tag: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  onSelectTag,
}) => {
  const [inputVal, setInputVal] = useState(searchQuery);

  if (!isOpen) return null;

  const hotSearches = [
    { rank: 1, tag: 'Baiyun Togo Leather B30', hot: true },
    { rank: 2, tag: 'Clean Lab Dandong 4130', hot: true },
    { rank: 3, tag: 'Putian 1:1 Last Runner', hot: true },
    { rank: 4, tag: 'Hangzhou 850+ FP Goose Down', hot: false },
    { rank: 5, tag: 'Clean Submariner Green Ceramic', hot: false },
    { rank: 6, tag: 'German Box Calf Constance', hot: false },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal.trim());
    onClose();
  };

  const handleTagClick = (tag: string) => {
    setInputVal(tag);
    setSearchQuery(tag);
    onSelectTag(tag);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0D0D0F] text-[#A0A0AB] animate-fade-in select-none">
      {/* Top Search Bar */}
      <div className="p-3 sm:p-4 border-b border-[#222228] bg-[#141418] flex items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 text-[#737380] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            autoFocus
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search ateliers, movements, leather origins, specs..."
            className="w-full text-xs sm:text-sm pl-9 pr-9 py-2.5 bg-[#18181F] text-white placeholder-[#737380] rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4AF37] border border-[#26262E]"
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => setInputVal('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737380] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        <button
          onClick={onClose}
          className="text-xs sm:text-sm font-semibold text-[#A0A0AB] hover:text-[#D4AF37] px-2 cursor-pointer transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Search Content */}
      <div className="p-5 overflow-y-auto space-y-6 max-w-lg mx-auto w-full">
        {/* Trending Searches */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Flame className="w-4 h-4 text-[#D4AF37]" />
            <span>Trending Atelier Searches</span>
          </div>

          <div className="space-y-2">
            {hotSearches.map((item) => (
              <div
                key={item.rank}
                onClick={() => handleTagClick(item.tag)}
                className="flex items-center justify-between py-2 px-3 hover:bg-[#141418] rounded-xl cursor-pointer transition-colors border border-transparent hover:border-[#26262E]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 text-center font-bold text-xs tabular-nums ${
                      item.rank <= 3 ? 'text-[#D4AF37]' : 'text-[#737380]'
                    }`}
                  >
                    {item.rank}
                  </span>
                  <span className="text-xs text-[#E0C368] font-medium">{item.tag}</span>
                </div>
                {item.hot && (
                  <span className="text-[10px] text-[#0D0D0F] bg-[#D4AF37] px-1.5 py-0.2 rounded font-bold">
                    HOT
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tags */}
        <div className="space-y-2 pt-2 border-t border-[#222228]">
          <span className="text-xs font-bold text-[#737380] uppercase tracking-wider block">
            Atelier Discovery Tags
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {['#BaiyunLeather', '#Dandong4130', '#TimegrapherQC', '#PutianLast', '#SmartEscrow', '#TriangleClearance'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag.replace('#', ''))}
                className="px-3 py-1.5 bg-[#141418] hover:bg-[#181820] hover:text-[#D4AF37] text-[#A0A0AB] rounded-full transition-colors cursor-pointer border border-[#222228] hover:border-[#D4AF37]/50"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
