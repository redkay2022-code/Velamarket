import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FilterPreset, WatermarkBadge, ImagePin } from '../types';
import { getFilterStyle } from '../utils/helpers';
import {
  X,
  Check,
  Crop,
  Sliders,
  Tag,
  Award,
  Video,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Move,
  Sparkles,
  ArrowLeftRight,
  Clock,
  RotateCcw
} from 'lucide-react';

export interface EditedMediaResult {
  images: string[];
  isVideo: boolean;
  aspectRatio: 'aspect-[3/4]' | 'aspect-[1/1]' | 'aspect-[9/16]';
  filterPreset: FilterPreset;
  filterIntensity: number;
  watermarkBadge?: WatermarkBadge;
  watermarkPosition: 'top-left' | 'top-right';
  imagePins: ImagePin[];
  videoCoverTimestamp?: number;
  isMuted?: boolean;
  videoDurationSeconds?: number;
}

interface XiaohongshuMediaEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialImages: string[];
  initialIsVideo?: boolean;
  initialVideoUrl?: string;
  initialAspectRatio?: 'aspect-[3/4]' | 'aspect-[1/1]' | 'aspect-[9/16]';
  initialPins?: ImagePin[];
  initialFilter?: FilterPreset;
  initialBadge?: WatermarkBadge;
  onComplete: (result: EditedMediaResult) => void;
}

const FILTER_PRESETS: { id: FilterPreset; name: string; previewClass: string }[] = [
  { id: 'natural', name: 'Original', previewClass: 'bg-[#181820]' },
  { id: 'luxury_warm', name: 'Luxury Warm', previewClass: 'bg-amber-950/40 text-amber-300' },
  { id: 'vintage_film', name: 'Vintage Film', previewClass: 'bg-yellow-950/40 text-yellow-200' },
  { id: 'clean_mono', name: 'Clean Cool', previewClass: 'bg-slate-900/60 text-slate-200' },
  { id: 'bw_master', name: 'B&W Master', previewClass: 'bg-zinc-900 text-zinc-300' },
];

const WATERMARK_OPTIONS: WatermarkBadge[] = [
  '1:1 Master Grade',
  'QC Verified',
  'Direct Factory',
  'Custom Serial Tag',
];

const POPULAR_FACTORIES = ['Clean', 'VS', '3K', 'APS', 'ZF', 'BTF', 'Hermès Master', 'Chanel Atelier'];

export const XiaohongshuMediaEditor: React.FC<XiaohongshuMediaEditorProps> = ({
  isOpen,
  onClose,
  initialImages,
  initialIsVideo = false,
  initialVideoUrl,
  initialAspectRatio = 'aspect-[3/4]',
  initialPins = [],
  initialFilter = 'natural',
  initialBadge,
  onComplete,
}) => {
  // Active images list & active index
  const [images, setImages] = useState<string[]>(initialImages.length > 0 ? initialImages : []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(initialIsVideo);

  // Editor Sub-states
  const [aspectRatio, setAspectRatio] = useState<'aspect-[3/4]' | 'aspect-[1/1]' | 'aspect-[9/16]'>(
    initialIsVideo ? 'aspect-[9/16]' : initialAspectRatio
  );
  const [filterPreset, setFilterPreset] = useState<FilterPreset>(initialFilter);
  const [filterIntensity, setFilterIntensity] = useState<number>(85);
  const [watermarkBadge, setWatermarkBadge] = useState<WatermarkBadge | undefined>(initialBadge);
  const [watermarkPosition, setWatermarkPosition] = useState<'top-left' | 'top-right'>('top-left');

  // Interactive Product Pins
  const [imagePins, setImagePins] = useState<ImagePin[]>(initialPins);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagFactory, setNewTagFactory] = useState('VS');
  const [newTagModel, setNewTagModel] = useState('');
  const [newTagPrice, setNewTagPrice] = useState<number | ''>(480);
  const [pendingPinCoords, setPendingPinCoords] = useState<{ x: number; y: number } | null>(null);

  // Video specific controls
  const [videoCoverTimestamp, setVideoCoverTimestamp] = useState<number>(3);
  const [videoDuration, setVideoDuration] = useState<number>(30);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Active Bottom Toolbar Tab
  const [activeTab, setActiveTab] = useState<'aspect' | 'filters' | 'tags' | 'stickers' | 'video' | 'reorder'>('aspect');

  // Canvas element reference
  const canvasRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages);
    }
  }, [initialImages]);

  // Handle clicking canvas to drop a tag
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking on existing pin or modal, ignore
    if ((e.target as HTMLElement).closest('.editor-pin') || (e.target as HTMLElement).closest('.pin-dialog')) {
      return;
    }

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(5, Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

    setPendingPinCoords({ x, y });
    setIsAddingTag(true);
    setActiveTab('tags');
  };

  // Confirm adding new pin
  const handleConfirmAddPin = () => {
    if (!pendingPinCoords) return;
    const label = `${newTagFactory} ${newTagModel || 'Custom Master Piece'} · $${newTagPrice || 450}`;
    const newPin: ImagePin = {
      id: `pin-${Date.now()}`,
      x: pendingPinCoords.x,
      y: pendingPinCoords.y,
      label,
      factory: newTagFactory,
      modelName: newTagModel || 'Master Craft Note',
      price: typeof newTagPrice === 'number' ? newTagPrice : 450,
      align: pendingPinCoords.x > 60 ? 'left' : 'right',
    };

    setImagePins((prev) => [...prev, newPin]);
    setActivePinId(newPin.id || null);
    setIsAddingTag(false);
    setPendingPinCoords(null);
    setNewTagModel('');
  };

  const handleDeletePin = (pinId?: string) => {
    if (!pinId) return;
    setImagePins((prev) => prev.filter((p) => p.id !== pinId));
    if (activePinId === pinId) setActivePinId(null);
  };

  const handleTogglePinAlign = (pinId?: string) => {
    if (!pinId) return;
    setImagePins((prev) =>
      prev.map((p) => (p.id === pinId ? { ...p, align: p.align === 'left' ? 'right' : 'left' } : p))
    );
  };

  // Multi-image Reordering
  const handleMoveImage = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= images.length) return;
    const next = [...images];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setImages(next);
    setActiveIndex(toIdx);
  };

  const handleSetCoverImage = (idx: number) => {
    if (idx === 0) return;
    const next = [...images];
    const [selected] = next.splice(idx, 1);
    next.unshift(selected);
    setImages(next);
    setActiveIndex(0);
  };

  // Finish and export
  const handleComplete = () => {
    onComplete({
      images,
      isVideo,
      aspectRatio,
      filterPreset,
      filterIntensity,
      watermarkBadge,
      watermarkPosition,
      imagePins,
      videoCoverTimestamp,
      isMuted,
      videoDurationSeconds: videoDuration,
    });
    onClose();
  };

  if (!isOpen) return null;

  const currentMediaSrc = images[activeIndex] || initialImages[0] || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in select-none text-white font-sans">
      <div className="relative w-full h-full max-w-lg bg-[#0E0E12] flex flex-col overflow-hidden sm:rounded-3xl sm:h-[92vh] sm:border sm:border-[#26262E] shadow-2xl">
        
        {/* ========================================================
            1. TOP BAR: [Cancel], [1/N Counter], [Done / Publish]
           ======================================================== */}
        <div className="h-13 px-4 border-b border-[#202028] bg-[#141418]/90 flex items-center justify-between shrink-0 z-20">
          <button
            onClick={onClose}
            aria-label="Cancel"
            className="text-xs font-semibold text-[#A0A0AB] hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#E0C368] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>RED Media Studio</span>
            </span>
            {images.length > 1 && (
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#1C1C24] text-[#A0A0AB] border border-[#2A2A35]">
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </div>

          <button
            onClick={handleComplete}
            className="px-4 py-1.5 rounded-full btn-gold-gradient text-[#0D0D0F] text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Done</span>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* ========================================================
            2. MAIN CANVAS VIEWPORT: Interactive Xiaohongshu Media Preview
           ======================================================== */}
        <div className="flex-1 bg-[#09090C] relative flex items-center justify-center p-3 overflow-hidden">
          {/* Aspect Ratio Box */}
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`relative w-full max-w-[380px] bg-[#000000] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border border-[#2A2A35] flex items-center justify-center cursor-crosshair select-none ${
              aspectRatio === 'aspect-[3/4]'
                ? 'aspect-[3/4] max-h-[52vh]'
                : aspectRatio === 'aspect-[1/1]'
                ? 'aspect-[1/1] max-h-[46vh]'
                : 'aspect-[9/16] max-h-[58vh]'
            }`}
          >
            {/* Visual Media with Filter Applied */}
            {isVideo ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <img
                  src={currentMediaSrc}
                  alt="Video thumbnail"
                  style={getFilterStyle(filterPreset, filterIntensity)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/60 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-[#D4AF37] ml-0.5" />
                  </div>
                </div>
                {/* Video Timestamp pill */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#D4AF37]/50 text-[10px] font-mono font-bold text-[#E0C368]">
                  Cover: 00:{videoCoverTimestamp < 10 ? `0${videoCoverTimestamp}` : videoCoverTimestamp}
                </div>
              </div>
            ) : (
              <img
                src={currentMediaSrc}
                alt="Edited media"
                style={getFilterStyle(filterPreset, filterIntensity)}
                className="w-full h-full object-cover pointer-events-none transition-all duration-200"
              />
            )}

            {/* Watermark / Certification Badge Overlay */}
            {watermarkBadge && (
              <div
                className={`absolute z-20 pointer-events-none ${
                  watermarkPosition === 'top-left'
                    ? 'top-2.5 left-2.5'
                    : 'top-2.5 right-2.5'
                }`}
              >
                <div className="bg-black/80 backdrop-blur-md border border-[#D4AF37] text-[#E0C368] px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xl flex items-center gap-1.5 animate-fade-in">
                  <Award className="w-3 h-3 text-[#D4AF37]" />
                  <span>{watermarkBadge}</span>
                </div>
              </div>
            )}

            {/* Interactive Pins / Tags Rendered on Canvas */}
            {imagePins.map((pin) => {
              const isSelected = activePinId === pin.id;
              const alignRight = pin.align !== 'left';

              return (
                <div
                  key={pin.id || `${pin.x}-${pin.y}`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePinId(pin.id || null);
                  }}
                  className="editor-pin absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                >
                  {/* Glowing Pulse Dot */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-5 h-5 rounded-full bg-white/40 animate-ping" />
                    <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                  </div>

                  {/* Tag Label Box with connecting pointer line */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 flex items-center ${
                      alignRight ? 'left-4' : 'right-4 flex-row-reverse'
                    }`}
                  >
                    {/* Connecting line */}
                    <div className="w-3 h-0.5 bg-[#D4AF37]/80" />

                    {/* Tag content chip */}
                    <div
                      className={`px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border text-[11px] font-bold whitespace-nowrap shadow-xl flex items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] text-[#E0C368] scale-105'
                          : 'border-white/30 text-white hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <Tag className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span>{pin.label}</span>

                      {isSelected && (
                        <div className="flex items-center gap-1 pl-1 ml-1 border-l border-white/20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTogglePinAlign(pin.id);
                            }}
                            title="Flip Alignment"
                            className="p-0.5 text-[#A0A0AB] hover:text-white"
                          >
                            <ArrowLeftRight className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePin(pin.id);
                            }}
                            title="Delete Tag"
                            className="p-0.5 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Click-to-add tag hint (shown if tags tab is open and no pins yet) */}
            {activeTab === 'tags' && imagePins.length === 0 && !isAddingTag && (
              <div className="absolute inset-x-4 bottom-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/60 text-[#E0C368] text-xs p-2.5 rounded-xl text-center shadow-lg pointer-events-none animate-pulse">
                ✦ Tap anywhere on the photo to drop a product tag!
              </div>
            )}
          </div>

          {/* Quick Add Tag Dialog Modal when Canvas Clicked */}
          {isAddingTag && pendingPinCoords && (
            <div className="pin-dialog absolute inset-x-4 top-1/2 -translate-y-1/2 z-40 bg-[#16161D] border border-[#D4AF37] rounded-2xl p-4 shadow-2xl space-y-3 animate-fade-in max-w-sm mx-auto">
              <div className="flex items-center justify-between border-b border-[#252530] pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add Xiaohongshu Product Tag</span>
                </span>
                <button
                  onClick={() => {
                    setIsAddingTag(false);
                    setPendingPinCoords(null);
                  }}
                  className="text-[#737380] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Factory / Studio Chips */}
              <div>
                <label className="text-[10px] font-bold text-[#A0A0AB] uppercase tracking-wider block mb-1">
                  Atelier / Factory
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_FACTORIES.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setNewTagFactory(f)}
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-all cursor-pointer border ${
                        newTagFactory === f
                          ? 'btn-gold-gradient text-[#0D0D0F] border-transparent'
                          : 'bg-[#20202A] text-[#A0A0AB] border-[#2A2A38] hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model & Name */}
              <div>
                <label className="text-[10px] font-bold text-[#A0A0AB] uppercase tracking-wider block mb-1">
                  Model / Spec Name
                </label>
                <input
                  type="text"
                  value={newTagModel}
                  onChange={(e) => setNewTagModel(e.target.value)}
                  placeholder="e.g. Daytona 116500 Dandong 4130"
                  className="w-full text-xs p-2 bg-[#0E0E14] border border-[#2A2A38] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Price */}
              <div>
                <label className="text-[10px] font-bold text-[#A0A0AB] uppercase tracking-wider block mb-1">
                  Price ($ USD)
                </label>
                <input
                  type="number"
                  value={newTagPrice}
                  onChange={(e) => setNewTagPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="480"
                  className="w-full text-xs p-2 bg-[#0E0E14] border border-[#2A2A38] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingTag(false);
                    setPendingPinCoords(null);
                  }}
                  className="px-3 py-1.5 text-xs text-[#A0A0AB] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddPin}
                  className="px-4 py-1.5 text-xs font-bold btn-gold-gradient text-[#0D0D0F] rounded-full shadow-md cursor-pointer"
                >
                  Pin Tag
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            3. CAROUSEL THUMBNAIL STRIP (When multiple photos)
           ======================================================== */}
        {images.length > 1 && (
          <div className="bg-[#121217] px-4 py-2 border-t border-[#1C1C24] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-105'
                    : 'border-[#26262E] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                {idx === 0 && (
                  <span className="absolute top-0 left-0 bg-[#D4AF37] text-[#0D0D0F] text-[8px] font-black px-1 leading-none py-0.5 rounded-br">
                    1 COVER
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ========================================================
            4. SUB-PANEL CONTROLS (Based on Active Tab)
           ======================================================== */}
        <div className="h-28 bg-[#14141A] border-t border-[#22222A] px-4 py-2.5 overflow-y-auto scrollbar-none shrink-0">
          {/* TAB 1: ASPECT RATIO CROP */}
          {activeTab === 'aspect' && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#A0A0AB] block">
                Xiaohongshu Standard Aspect Ratios
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('aspect-[3/4]')}
                  className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                    aspectRatio === 'aspect-[3/4]'
                      ? 'btn-gold-gradient text-[#0D0D0F] border-[#D4AF37]'
                      : 'bg-[#1C1C24] text-[#A0A0AB] border-[#2A2A35] hover:text-white'
                  }`}
                >
                  <span className="text-sm font-black">3 : 4</span>
                  <span className="text-[9.5px]">Standard RED (Recommended)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('aspect-[1/1]')}
                  className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                    aspectRatio === 'aspect-[1/1]'
                      ? 'btn-gold-gradient text-[#0D0D0F] border-[#D4AF37]'
                      : 'bg-[#1C1C24] text-[#A0A0AB] border-[#2A2A35] hover:text-white'
                  }`}
                >
                  <span className="text-sm font-black">1 : 1</span>
                  <span className="text-[9.5px]">Square Feed</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('aspect-[9/16]')}
                  className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                    aspectRatio === 'aspect-[9/16]'
                      ? 'btn-gold-gradient text-[#0D0D0F] border-[#D4AF37]'
                      : 'bg-[#1C1C24] text-[#A0A0AB] border-[#2A2A35] hover:text-white'
                  }`}
                >
                  <span className="text-sm font-black">9 : 16</span>
                  <span className="text-[9.5px]">Vertical Short-Form Reel</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FILTERS & INTENSITY */}
          {activeTab === 'filters' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#A0A0AB]">
                <span>Filter Tone Presets</span>
                <div className="flex items-center gap-2">
                  <span>Intensity: {filterIntensity}%</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={filterIntensity}
                    onChange={(e) => setFilterIntensity(Number(e.target.value))}
                    className="w-20 accent-[#D4AF37] cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                {FILTER_PRESETS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilterPreset(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all cursor-pointer flex items-center gap-1.5 ${
                      filterPreset === f.id
                        ? 'btn-gold-gradient text-[#0D0D0F] border-transparent shadow-md'
                        : 'bg-[#1C1C24] text-[#A0A0AB] border-[#2A2A35] hover:text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-current" />
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TAGS & PINS */}
          {activeTab === 'tags' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#A0A0AB]">
                <span>Active Product Pins ({imagePins.length})</span>
                <span className="text-[10px] text-[#E0C368]">✦ Tap photo canvas to pin new tag</span>
              </div>

              {imagePins.length === 0 ? (
                <div className="text-center py-2 text-xs text-[#737380]">
                  No tags added yet. Tap anywhere on the image above to tag a factory, model, or price!
                </div>
              ) : (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                  {imagePins.map((pin) => (
                    <div
                      key={pin.id || pin.label}
                      className={`px-3 py-1.5 rounded-xl bg-[#1C1C24] border text-xs font-bold shrink-0 flex items-center gap-2 ${
                        activePinId === pin.id ? 'border-[#D4AF37] text-[#E0C368]' : 'border-[#2A2A35] text-white'
                      }`}
                    >
                      <span>{pin.label}</span>
                      <button
                        type="button"
                        onClick={() => handleDeletePin(pin.id)}
                        className="text-rose-400 hover:text-rose-300 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WATERMARK & BADGES */}
          {activeTab === 'stickers' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#A0A0AB]">
                <span>Certification Watermark Badges</span>
                <button
                  type="button"
                  onClick={() =>
                    setWatermarkPosition((prev) => (prev === 'top-left' ? 'top-right' : 'top-left'))
                  }
                  className="text-[10px] text-[#E0C368] hover:underline cursor-pointer"
                >
                  Position: {watermarkPosition}
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                <button
                  type="button"
                  onClick={() => setWatermarkBadge(undefined)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border cursor-pointer ${
                    !watermarkBadge
                      ? 'btn-gold-gradient text-[#0D0D0F]'
                      : 'bg-[#1C1C24] text-[#A0A0AB] border-[#2A2A35]'
                  }`}
                >
                  None
                </button>

                {WATERMARK_OPTIONS.map((badge) => (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => setWatermarkBadge(badge)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border cursor-pointer flex items-center gap-1.5 ${
                      watermarkBadge === badge
                        ? 'btn-gold-gradient text-[#0D0D0F] border-transparent'
                        : 'bg-[#1C1C24] text-[#A0A0AB] border-[#2A2A35] hover:text-white'
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    <span>{badge}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VIDEO TRIMMER & COVER SELECTOR */}
          {activeTab === 'video' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#A0A0AB]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Thumbnail Cover Frame: 00:{videoCoverTimestamp < 10 ? `0${videoCoverTimestamp}` : videoCoverTimestamp}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-1 text-[10px] text-[#E0C368] cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                </button>
              </div>

              {/* Cover Frame Scrubber Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={videoDuration}
                  step="1"
                  value={videoCoverTimestamp}
                  onChange={(e) => setVideoCoverTimestamp(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-[#737380]">
                  <span>0:00 (Start)</span>
                  <span className="text-[#D4AF37] font-bold">Selected Feed Thumbnail</span>
                  <span>0:{videoDuration} (End)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MULTI-PHOTO REORDER */}
          {activeTab === 'reorder' && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#A0A0AB] block">
                Manage Multi-Photo Order (Current: Photo #{activeIndex + 1})
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => handleMoveImage(activeIndex, activeIndex - 1)}
                  className="px-3 py-1.5 rounded-xl bg-[#1C1C24] border border-[#2A2A35] text-xs font-bold text-white hover:border-[#D4AF37] disabled:opacity-30 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Move Left</span>
                </button>

                <button
                  type="button"
                  disabled={activeIndex === images.length - 1}
                  onClick={() => handleMoveImage(activeIndex, activeIndex + 1)}
                  className="px-3 py-1.5 rounded-xl bg-[#1C1C24] border border-[#2A2A35] text-xs font-bold text-white hover:border-[#D4AF37] disabled:opacity-30 cursor-pointer flex items-center gap-1"
                >
                  <span>Move Right</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => handleSetCoverImage(activeIndex)}
                  className="px-3 py-1.5 rounded-xl btn-gold-outline text-xs font-bold text-[#E0C368] hover:text-white disabled:opacity-30 cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Set as #1 Cover</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            5. BOTTOM NAVIGATION BAR: 6 Major Xiaohongshu Tool Tabs
           ======================================================== */}
        <div className="h-14 bg-[#0D0D12] border-t border-[#1E1E26] px-2 flex items-center justify-around shrink-0 z-20">
          <button
            type="button"
            onClick={() => setActiveTab('aspect')}
            className={`flex flex-col items-center justify-center py-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'aspect' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
            }`}
          >
            <Crop className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Ratio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('filters')}
            className={`flex flex-col items-center justify-center py-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'filters' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Filters</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tags')}
            className={`flex flex-col items-center justify-center py-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'tags' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Tags ({imagePins.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stickers')}
            className={`flex flex-col items-center justify-center py-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'stickers' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[10px] mt-0.5">Badges</span>
          </button>

          {isVideo && (
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`flex flex-col items-center justify-center py-1 flex-1 cursor-pointer transition-colors ${
                activeTab === 'video' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
              }`}
            >
              <Video className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">Video Cover</span>
            </button>
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveTab('reorder')}
              className={`flex flex-col items-center justify-center py-1 flex-1 cursor-pointer transition-colors ${
                activeTab === 'reorder' ? 'text-[#D4AF37] font-bold' : 'text-[#737380] hover:text-[#A0A0AB]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">Reorder</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
