import React, { useState } from 'react';
import { Seller, Product, QualityTier, FilterPreset, WatermarkBadge, ImagePin } from '../types';
import {
  X,
  CheckCircle,
  ShieldAlert,
  Crop,
  Sliders,
  Tag,
  Award,
  Sparkles,
  Upload,
  Play,
  Video,
  Layers,
  Plus
} from 'lucide-react';
import { XiaohongshuMediaEditor, EditedMediaResult } from './XiaohongshuMediaEditor';
import { getFilterStyle } from '../utils/helpers';

import qcWorkbenchImg from '../assets/images/factory_atelier_qc_workbench_1791161564085.jpg';
import watchImg from '../assets/images/product_master_horology_1791161540806.jpg';
import bagImg from '../assets/images/red_handbag_lifestyle_1791161928325.jpg';
import sneakerImg from '../assets/images/product_bespoke_sneaker_1791161553010.jpg';
import leatherImg from '../assets/images/hero_luxury_leather_craft_1791161526275.jpg';
import videoReelImg from '../assets/images/vela_video_reel_ui_1791166556073.jpg';

interface SellerDashboardModalProps {
  sellers: Seller[];
  onAddNewSeller: (newSeller: Seller) => void;
  onAddNewProduct: (newProduct: Product) => void;
  onClose: () => void;
  defaultTab?: 'onboard' | 'addProduct' | 'escrow';
}

export const SellerDashboardModal: React.FC<SellerDashboardModalProps> = ({
  sellers,
  onAddNewSeller,
  onAddNewProduct,
  onClose,
  defaultTab = 'addProduct',
}) => {
  const [activeTab, setActiveTab] = useState<'onboard' | 'addProduct' | 'escrow'>(defaultTab);

  // Onboarding form state
  const [atelierName, setAtelierName] = useState('');
  const [chineseName, setChineseName] = useState('');
  const [region, setRegion] = useState('Guangdong Guangzhou');
  const [specialty, setSpecialty] = useState('Bespoke Hand Saddle Stitching');
  const [weChat, setWeChat] = useState('');
  const [bio, setBio] = useState('');
  const [onboardSuccess, setOnboardSuccess] = useState(false);

  // Add product form state
  const [selectedSellerId, setSelectedSellerId] = useState(sellers[0]?.id || '');
  const [prodTitle, setProdTitle] = useState('Clean Factory Daytona 116500 Master Clone');
  const [prodChineseTitle, setProdChineseTitle] = useState('Dandong 4130 Movement 1:1 Ceramic Bezel');
  const [prodCategory, setProdCategory] = useState<'leather' | 'watches' | 'streetwear' | 'footwear' | 'accessories'>('watches');
  const [prodPriceUSD, setProdPriceUSD] = useState(480);
  const [prodTier, setProdTier] = useState<QualityTier>('1:1 Master Grade');
  const [prodMaterial, setProdMaterial] = useState('904L Oystersteel & High-Tech Ceramic Bezel');
  const [prodHardware, setProdHardware] = useState('Sapphire Crystal with Anti-Reflective Coating');
  const [prodBatch, setProdBatch] = useState('CLEAN-DAYTONA-2026-V3');
  const [productSuccess, setProductSuccess] = useState(false);

  // Media & Xiaohongshu Editor State
  const [prodImages, setProdImages] = useState<string[]>([watchImg, qcWorkbenchImg, videoReelImg]);
  const [prodIsVideo, setProdIsVideo] = useState(false);
  const [prodAspectRatio, setProdAspectRatio] = useState<'aspect-[3/4]' | 'aspect-[1/1]' | 'aspect-[9/16]'>('aspect-[3/4]');
  const [prodFilterPreset, setProdFilterPreset] = useState<FilterPreset>('luxury_warm');
  const [prodFilterIntensity, setProdFilterIntensity] = useState<number>(85);
  const [prodWatermarkBadge, setProdWatermarkBadge] = useState<WatermarkBadge | undefined>('1:1 Master Grade');
  const [prodWatermarkPosition, setProdWatermarkPosition] = useState<'top-left' | 'top-right'>('top-left');
  const [prodImagePins, setProdImagePins] = useState<ImagePin[]>([
    {
      id: 'pin-1',
      x: 50,
      y: 42,
      label: 'Clean Factory Dandong 4130 · $480',
      factory: 'Clean',
      modelName: 'Daytona 116500',
      price: 480,
      align: 'right',
    },
    {
      id: 'pin-2',
      x: 50,
      y: 78,
      label: '904L Steel Oysterlock Clasp',
      factory: 'Clean',
      modelName: 'Clasp & Links',
      price: 480,
      align: 'left',
    },
  ]);
  const [prodVideoCoverTimestamp, setProdVideoCoverTimestamp] = useState<number>(3);
  const [prodIsMuted, setProdIsMuted] = useState(false);

  // Modal for Xiaohongshu Media Editor
  const [isMediaEditorOpen, setIsMediaEditorOpen] = useState(false);

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSeller: Seller = {
      id: `seller-${Date.now()}`,
      name: atelierName || 'New Orient Master Atelier',
      chineseName: chineseName || 'Orient Precision Atelier',
      badge: 'Master Atelier',
      region: region,
      establishedYear: 2026,
      rating: 5.0,
      reviewCount: 1,
      successfulShipments: 0,
      qcPassRate: 100,
      avgQcHours: 24,
      bio: bio || 'Newly verified atelier complying with rigorous pre-shipment QC micro inspections and insured triangle transit.',
      chineseBio: 'Certified atelier with micro-QC and insured triangle customs clearance.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
      bannerImage: qcWorkbenchImg,
      specialties: [specialty, 'Caliper Measurements', 'Smart Escrow Settlements'],
      contactWeChat: weChat || 'WeChat_Verified_Shop',
      verificationAuditDate: 'Just Approved On-site Audit',
    };

    onAddNewSeller(newSeller);
    setOnboardSuccess(true);
    setTimeout(() => {
      setOnboardSuccess(false);
      setActiveTab('addProduct');
    }, 1500);
  };

  // Called when user clicks [Done] in Xiaohongshu Media Editor
  const handleEditorComplete = (result: EditedMediaResult) => {
    setProdImages(result.images);
    setProdIsVideo(result.isVideo);
    setProdAspectRatio(result.aspectRatio);
    setProdFilterPreset(result.filterPreset);
    setProdFilterIntensity(result.filterIntensity);
    setProdWatermarkBadge(result.watermarkBadge);
    setProdWatermarkPosition(result.watermarkPosition);
    setProdImagePins(result.imagePins);
    if (result.videoCoverTimestamp !== undefined) {
      setProdVideoCoverTimestamp(result.videoCoverTimestamp);
    }
    if (result.isMuted !== undefined) {
      setProdIsMuted(result.isMuted);
    }
  };

  // Custom image upload handler from local disk
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }

    setProdImages((prev) => [...urls, ...prev]);
    // Automatically open editor to edit newly added media!
    setIsMediaEditorOpen(true);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const seller = sellers.find((s) => s.id === selectedSellerId) || sellers[0];

    const categoryLabels: Record<string, string> = {
      leather: 'Leathergoods & Handbags',
      watches: 'Master Watches / Horology',
      streetwear: 'Streetwear & Outerwear',
      footwear: 'Footwear & Bespoke Sneakers',
      accessories: 'Accessories & Eyewear',
    };

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: prodTitle || 'Masterpiece Handcrafted Edition',
      chineseTitle: prodChineseTitle || 'Master Atelier Direct Edition',
      category: prodCategory,
      categoryLabel: categoryLabels[prodCategory] || 'Master Edition',
      tier: prodTier,
      priceUSD: Number(prodPriceUSD) || 300,
      sellerId: seller.id,
      sellerName: seller.name,
      sellerRegion: seller.region,
      rating: 5.0,
      reviewCount: 0,
      likesCount: 1,
      isLiked: false,
      isVideo: prodIsVideo,
      videoDuration: prodIsVideo ? `0:${prodVideoCoverTimestamp < 10 ? `0${prodVideoCoverTimestamp}` : prodVideoCoverTimestamp}` : undefined,
      aspectRatio: prodAspectRatio,
      filterPreset: prodFilterPreset,
      filterIntensity: prodFilterIntensity,
      watermarkBadge: prodWatermarkBadge,
      watermarkPosition: prodWatermarkPosition,
      videoCoverTimestamp: prodIsVideo ? prodVideoCoverTimestamp : undefined,
      isMuted: prodIsMuted,
      images: prodImages.length > 0 ? prodImages : [qcWorkbenchImg],
      imagePins: prodImagePins,
      hashtags: [
        `#${prodCategory.toUpperCase()}`,
        '#VELAVerified',
        '#MasterQC',
        '#XiaohongshuDirect',
      ],
      comments: [],
      description: `Official verified atelier note. Equipped with 100% pre-shipment micro-QC caliper inspections, live timegrapher readouts, and insured triangle transit pass guarantee.`,
      specifications: {
        material: prodMaterial || 'European Imported Leathers & Spec Hardware',
        hardware: prodHardware || 'Solid 904L Steel / 24K Ion Gold Plating',
        craftsmanship: '100% Master Quality Checked',
        dimensions: '1:1 Retail Spec Dimensions',
        factoryBatch: prodBatch,
      },
      inStock: true,
      leadTimeDays: 2,
      qcSamplePhotos: [
        {
          id: `qcs-${Date.now()}`,
          title: 'Macro Caliper & Leather Grain QC',
          description: 'Pre-shipment caliper thickness and macro material verification',
          imageUrl: prodImages[0] || qcWorkbenchImg,
          measurements: 'Tolerance within 0.12mm matching retail',
        },
      ],
    };

    onAddNewProduct(newProduct);
    setProductSuccess(true);
    setTimeout(() => {
      setProductSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in select-none">
        <div className="bg-[#141418] border border-[#26262E] text-[#A0A0AB] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="px-6 py-4 bg-[#181820] border-b border-[#222228] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black/60 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-bold text-xs tracking-wider">
                ADMIN
              </div>
              <div className="text-left">
                <h2 className="text-base font-extrabold text-white">
                  Atelier Studio & /admin Merchant Portal
                </h2>
                <p className="text-xs text-[#737380]">
                  Publish notes with Xiaohongshu Media Editor, custom tags, filters & smart escrow
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A0A0AB] hover:text-white rounded-full hover:bg-[#222228] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab switch bar */}
          <div className="flex border-b border-[#222228] bg-[#0D0D0F] text-xs font-bold">
            <button
              onClick={() => setActiveTab('addProduct')}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'addProduct'
                  ? 'border-[#D4AF37] text-[#E0C368] bg-[#141418]'
                  : 'border-transparent text-[#737380] hover:text-white'
              }`}
            >
              1. Register Product & RED Note
            </button>
            <button
              onClick={() => setActiveTab('onboard')}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'onboard'
                  ? 'border-[#D4AF37] text-[#E0C368] bg-[#141418]'
                  : 'border-transparent text-[#737380] hover:text-white'
              }`}
            >
              2. Atelier Application
            </button>
            <button
              onClick={() => setActiveTab('escrow')}
              className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'escrow'
                  ? 'border-[#D4AF37] text-[#E0C368] bg-[#141418]'
                  : 'border-transparent text-[#737380] hover:text-white'
              }`}
            >
              3. Escrow Protocol
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 scrollbar-none text-left">
            {activeTab === 'addProduct' && (
              <div className="space-y-5">
                <div className="text-xs text-[#737380] flex items-center justify-between">
                  <span>Register products & notes. Items appear instantly in the Xiaohongshu main feed.</span>
                  <span className="text-[#D4AF37] font-semibold">✦ RED Editor Enabled</span>
                </div>

                {productSuccess && (
                  <div className="p-3 bg-[#181820] text-[#E0C368] text-xs rounded-xl flex items-center gap-2 border border-[#D4AF37] animate-fade-in">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Item published! Live on the Xiaohongshu waterfall feed with your customized tags and filters.</span>
                  </div>
                )}

                <form onSubmit={handleAddProductSubmit} className="space-y-5">
                  
                  {/* ========================================================
                      ★ XIAOHONGSHU MEDIA & COVER EDITOR CARD ★
                     ======================================================== */}
                  <div className="p-4 bg-[#181822] border-2 border-[#D4AF37]/40 rounded-2xl space-y-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Xiaohongshu Media Studio & Cover Editor
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#E0C368] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                        {prodIsVideo ? '9:16 Video Reel' : prodAspectRatio.replace('aspect-[', '').replace(']', '') + ' Photo Carousel'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      {/* Media Thumbnail with Filter & Badge Preview */}
                      <div className="relative aspect-[3/4] max-h-[160px] rounded-xl overflow-hidden bg-black border border-[#2A2A38] mx-auto sm:mx-0 shadow-md group">
                        <img
                          src={prodImages[0]}
                          alt="Cover preview"
                          style={getFilterStyle(prodFilterPreset, prodFilterIntensity)}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay Badge */}
                        {prodWatermarkBadge && (
                          <div className="absolute top-1 left-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-[#D4AF37] text-[8px] font-bold text-[#E0C368]">
                            {prodWatermarkBadge}
                          </div>
                        )}
                        {/* Pins indicator */}
                        {prodImagePins.length > 0 && (
                          <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/20 text-[8px] font-bold text-white flex items-center gap-1">
                            <Tag className="w-2.5 h-2.5 text-[#D4AF37]" />
                            <span>{prodImagePins.length} tags</span>
                          </div>
                        )}
                        {prodIsVideo && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play className="w-6 h-6 fill-[#D4AF37] text-[#D4AF37]" />
                          </div>
                        )}
                      </div>

                      {/* Current Editor Metadata Highlights */}
                      <div className="sm:col-span-2 space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 bg-[#14141C] rounded-lg border border-[#22222C]">
                            <span className="text-[#737380] block text-[9.5px]">Ratio:</span>
                            <span className="font-bold text-white">{prodAspectRatio.replace('aspect-[', '').replace(']', '')} RED</span>
                          </div>
                          <div className="p-2 bg-[#14141C] rounded-lg border border-[#22222C]">
                            <span className="text-[#737380] block text-[9.5px]">Filter Tone:</span>
                            <span className="font-bold text-[#E0C368] capitalize">
                              {prodFilterPreset.replace('_', ' ')} ({prodFilterIntensity}%)
                            </span>
                          </div>
                          <div className="p-2 bg-[#14141C] rounded-lg border border-[#22222C]">
                            <span className="text-[#737380] block text-[9.5px]">Interactive Pins:</span>
                            <span className="font-bold text-white">{prodImagePins.length} Pins</span>
                          </div>
                          <div className="p-2 bg-[#14141C] rounded-lg border border-[#22222C]">
                            <span className="text-[#737380] block text-[9.5px]">Watermark:</span>
                            <span className="font-bold text-[#E0C368] truncate block">
                              {prodWatermarkBadge || 'None'}
                            </span>
                          </div>
                        </div>

                        {/* Open Xiaohongshu Media Editor Button */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsMediaEditorOpen(true)}
                            className="flex-1 py-2 px-3 text-xs font-bold btn-gold-gradient text-[#0D0D0F] rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 cursor-pointer"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>✦ Open Xiaohongshu Media Editor</span>
                          </button>

                          {/* Local file upload input */}
                          <label className="py-2 px-3 text-xs font-bold bg-[#1F1F2A] hover:bg-[#252535] border border-[#2A2A38] text-white rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Upload Media</span>
                            <input
                              type="file"
                              accept="image/*,video/*"
                              multiple
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Quick Media Presets Row */}
                    <div className="pt-2 border-t border-[#252535] flex items-center justify-between text-[11px]">
                      <span className="text-[#737380]">Quick Select Demo Assets:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setProdImages([watchImg, qcWorkbenchImg]);
                            setProdIsVideo(false);
                            setProdAspectRatio('aspect-[3/4]');
                          }}
                          className="px-2 py-0.5 rounded bg-[#1C1C24] hover:bg-[#252535] text-white border border-[#2A2A35] cursor-pointer"
                        >
                          Watches
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProdImages([bagImg, leatherImg]);
                            setProdIsVideo(false);
                            setProdAspectRatio('aspect-[3/4]');
                          }}
                          className="px-2 py-0.5 rounded bg-[#1C1C24] hover:bg-[#252535] text-white border border-[#2A2A35] cursor-pointer"
                        >
                          Leatherbag
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProdImages([sneakerImg]);
                            setProdIsVideo(false);
                            setProdAspectRatio('aspect-[1/1]');
                          }}
                          className="px-2 py-0.5 rounded bg-[#1C1C24] hover:bg-[#252535] text-white border border-[#2A2A35] cursor-pointer"
                        >
                          Sneaker
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProdImages([videoReelImg]);
                            setProdIsVideo(true);
                            setProdAspectRatio('aspect-[9/16]');
                          }}
                          className="px-2 py-0.5 rounded btn-gold-outline text-[#E0C368] cursor-pointer flex items-center gap-1"
                        >
                          <Video className="w-2.5 h-2.5" />
                          <span>Video Reel</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Standard Note Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Target Atelier Store
                      </label>
                      <select
                        value={selectedSellerId}
                        onChange={(e) => setSelectedSellerId(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        {sellers.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.region})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Quality Tier
                      </label>
                      <select
                        value={prodTier}
                        onChange={(e) => setProdTier(e.target.value as QualityTier)}
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="1:1 Master Grade">1:1 Master Grade (Pinnacle Clone)</option>
                        <option value="Mirror Bespoke">Mirror Bespoke (Custom Hand-Crafted)</option>
                        <option value="Factory Direct">Factory Direct (Raw Factory Batch)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Note Title / Product Name
                      </label>
                      <input
                        type="text"
                        required
                        value={prodTitle}
                        onChange={(e) => setProdTitle(e.target.value)}
                        placeholder="e.g. Classic Datejust 41mm Fluted Bezel"
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Secondary Specification Tag
                      </label>
                      <input
                        type="text"
                        required
                        value={prodChineseTitle}
                        onChange={(e) => setProdChineseTitle(e.target.value)}
                        placeholder="e.g. Dandong 3235 72h Reserve Edition"
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Category
                      </label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value as any)}
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="watches">Master Watches / Horology</option>
                        <option value="leather">Leather & Handbags</option>
                        <option value="footwear">Footwear & Sneakers</option>
                        <option value="streetwear">Streetwear & Outerwear</option>
                        <option value="accessories">Accessories & Eyewear</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Price (USD $)
                      </label>
                      <input
                        type="number"
                        required
                        value={prodPriceUSD}
                        onChange={(e) => setProdPriceUSD(Number(e.target.value))}
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Batch ID
                      </label>
                      <input
                        type="text"
                        value={prodBatch}
                        onChange={(e) => setProdBatch(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold btn-gold-gradient text-[#0D0D0F] rounded-full transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      Publish to Atelier Feed
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'onboard' && (
              <div className="space-y-6">
                <div className="p-4 bg-[#181820] border border-[#D4AF37]/30 rounded-2xl space-y-1.5 text-xs text-[#E0C368]">
                  <p className="font-bold flex items-center gap-1.5 text-[#D4AF37]">
                    <ShieldAlert className="w-4 h-4" />
                    Mandatory Atelier Operating Standards
                  </p>
                  <p className="text-[#A0A0AB] leading-relaxed">
                    ① High-definition micro-QC caliper and stamp photos must be uploaded before dispatch.<br />
                    ② 100% free reshipment guarantee contract signed for any customs clearance issue.<br />
                    ③ Automatic smart escrow payout triggered upon buyer receipt and final approval.
                  </p>
                </div>

                {onboardSuccess ? (
                  <div className="p-8 text-center bg-[#181820] rounded-2xl space-y-2 border border-[#D4AF37]">
                    <CheckCircle className="w-12 h-12 text-[#D4AF37] mx-auto" />
                    <h3 className="text-base font-bold text-white">Atelier Application Approved!</h3>
                    <p className="text-xs text-[#A0A0AB]">
                      Your dedicated workshop storefront is now active. You can register products and start receiving orders globally.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleOnboardSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1">
                          Atelier Name (English)
                        </label>
                        <input
                          type="text"
                          required
                          value={atelierName}
                          onChange={(e) => setAtelierName(e.target.value)}
                          placeholder="e.g. Shenzhen Master Horology Lab"
                          className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1">
                          Workshop Business Name
                        </label>
                        <input
                          type="text"
                          required
                          value={chineseName}
                          onChange={(e) => setChineseName(e.target.value)}
                          placeholder="e.g. Shenzhen Precision Horology Lab"
                          className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1">
                          Production Region
                        </label>
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                        >
                          <option value="Guangdong Guangzhou (Leather & Handbags)">Guangzhou, Guangdong (Fine Leather & Handbags)</option>
                          <option value="Guangdong Dongguan (Precision Watches)">Dongguan, Guangdong (Clone Movements & Horology)</option>
                          <option value="Fujian Putian (High-End Footwear)">Putian, Fujian (Bespoke Footwear & 1:1 Lasts)</option>
                          <option value="Zhejiang Hangzhou (Silk & Tailoring)">Hangzhou, Zhejiang (Mulberry Silk & Goose Down)</option>
                          <option value="Guangdong Shenzhen (Optical & Jewelry)">Shenzhen, Guangdong (Titanium & Jewelry)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white mb-1">
                          Direct Contact / ID
                        </label>
                        <input
                          type="text"
                          required
                          value={weChat}
                          onChange={(e) => setWeChat(e.target.value)}
                          placeholder="e.g. MasterCraft_GZ_88"
                          className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1">
                        Atelier Description & Master Artisan Credentials
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Describe your leather sourcing channels, hand-stitching techniques, or timegrapher testing equipment..."
                        className="w-full text-xs p-2.5 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-bold btn-gold-gradient text-[#0D0D0F] rounded-full transition-all cursor-pointer shadow-md active:scale-95"
                      >
                        Submit Verification & Onboard
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'escrow' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-[#181820] border border-[#26262E] rounded-2xl space-y-1">
                    <span className="text-xs text-[#737380]">Platform Escrow Vault</span>
                    <p className="text-xl font-extrabold text-[#E0C368] tabular-nums">$48,290 USD</p>
                    <p className="text-[11px] text-[#D4AF37] font-bold">Securely Held</p>
                  </div>
                  <div className="p-4 bg-[#181820] border border-[#26262E] rounded-2xl space-y-1">
                    <span className="text-xs text-[#737380]">Disbursed Last Month</span>
                    <p className="text-xl font-extrabold text-white tabular-nums">$182,400 USD</p>
                    <p className="text-[11px] text-[#737380] font-medium">100% Incident-Free</p>
                  </div>
                  <div className="p-4 bg-[#181820] border border-[#26262E] rounded-2xl space-y-1">
                    <span className="text-xs text-[#737380]">Customs Success Rate</span>
                    <p className="text-xl font-extrabold text-[#E0C368] tabular-nums">99.85%</p>
                    <p className="text-[11px] text-[#737380] font-medium">Triangle Transit Route</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#A0A0AB] bg-[#181820] p-4 rounded-2xl border border-[#26262E] leading-relaxed">
                  <p>
                    <strong>Phase 1 (Lock in Escrow):</strong> Buyer payments are never remitted directly to private accounts, remaining locked securely inside VELA Smart Escrow.
                  </p>
                  <p>
                    <strong>Phase 2 (Pre-Shipment QC):</strong> The workshop captures high-resolution caliper and timegrapher photos. Shipment only begins once the buyer reviews and approves the report.
                  </p>
                  <p>
                    <strong>Phase 3 (Delivery & Release):</strong> Upon successful overseas customs clearance and buyer unboxing confirmation, funds are automatically settled to the atelier.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Xiaohongshu Media Editor Full Modal */}
      {isMediaEditorOpen && (
        <XiaohongshuMediaEditor
          isOpen={isMediaEditorOpen}
          onClose={() => setIsMediaEditorOpen(false)}
          initialImages={prodImages}
          initialIsVideo={prodIsVideo}
          initialAspectRatio={prodAspectRatio}
          initialPins={prodImagePins}
          initialFilter={prodFilterPreset}
          initialBadge={prodWatermarkBadge}
          onComplete={handleEditorComplete}
        />
      )}
    </>
  );
};
