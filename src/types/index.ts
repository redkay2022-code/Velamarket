export type Currency = 'KRW' | 'USD' | 'CNY' | 'EUR';
export type Language = 'ko' | 'en' | 'zh';

export type QualityTier = '1:1 Master Grade' | 'Mirror Bespoke' | 'Factory Direct';

export interface Seller {
  id: string;
  name: string;
  chineseName: string;
  badge: 'Master Atelier' | 'Verified Factory' | 'Bespoke Studio';
  region: string;
  establishedYear: number;
  rating: number;
  reviewCount: number;
  successfulShipments: number;
  qcPassRate: number; // e.g. 99.6%
  avgQcHours: number; // e.g. 24
  bio: string;
  chineseBio: string;
  avatar: string;
  bannerImage: string;
  specialties: string[];
  contactWeChat: string;
  verificationAuditDate: string;
}

export interface QCInspectionPhoto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  measurements?: string; // e.g. "Stamping depth 0.12mm / Stitch spacing 3.2mm"
}

export interface NoteComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  likes: number;
  sellerReply?: string;
}

export type FilterPreset = 'natural' | 'luxury_warm' | 'vintage_film' | 'clean_mono' | 'bw_master';
export type WatermarkBadge = '1:1 Master Grade' | 'QC Verified' | 'Direct Factory' | 'Custom Serial Tag';

export interface ImagePin {
  id?: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  label: string;
  factory?: string; // e.g. "Clean", "VS", "3K", "APS"
  modelName?: string;
  price?: number;
  align?: 'left' | 'right';
}

export interface Product {
  id: string;
  title: string;
  chineseTitle: string;
  category: 'leather' | 'watches' | 'streetwear' | 'footwear' | 'accessories';
  categoryLabel: string;
  tier: QualityTier;
  priceUSD: number;
  sellerId: string;
  sellerName: string;
  sellerRegion: string;
  sellerAvatar?: string;
  rating: number;
  reviewCount: number;
  likesCount: number;
  isLiked?: boolean;
  isVideo?: boolean;
  videoDuration?: string;
  videoUrl?: string;
  aspectRatio?: 'aspect-[3/4]' | 'aspect-[9/16]' | 'aspect-[1/1]' | 'aspect-[4/5]' | 'aspect-[2/3]';
  filterPreset?: FilterPreset;
  filterIntensity?: number; // 0 to 100
  watermarkBadge?: WatermarkBadge;
  watermarkPosition?: 'top-left' | 'top-right';
  videoCoverTimestamp?: number;
  isMuted?: boolean;
  images: string[];
  imagePins?: ImagePin[];
  description: string;
  hashtags: string[];
  comments: NoteComment[];
  specifications: {
    material: string;
    hardware: string;
    craftsmanship: string;
    dimensions: string;
    factoryBatch: string;
    timegrapherSpec?: string;
  };
  inStock: boolean;
  leadTimeDays: number; // days until QC ready
  qcSamplePhotos: QCInspectionPhoto[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  totalUSD: number;
  status: 'PENDING_QC' | 'QC_READY' | 'QC_APPROVED' | 'IN_TRANSIT' | 'DELIVERED';
  createdAt: string;
  shippingOption: 'TRIANGLE_AIR_SAFE' | 'STANDARD_EMS';
  buyerName: string;
  buyerPhone: string;
  shippingAddress: string;
  qcPhotos: QCInspectionPhoto[];
  qcApprovedAt?: string;
  trackingNumber?: string;
  paymentMethod?: 'ONRAMP_CARD' | 'CRYPTO_DIRECT' | 'P2P_GUIDE';
  escrowStatus?: 'LOCKED_IN_ESCROW' | 'RELEASED_TO_SELLER' | 'REFUNDED';
  txHash?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'seller';
  originalText: string;
  translatedText: string;
  originalLang: 'ko' | 'zh' | 'en';
  targetLang: 'zh' | 'ko' | 'en';
  timestamp: string;
  productId?: string;
}
