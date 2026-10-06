import { Seller, Product, Order } from '../types';

import heroLeatherImg from '../assets/images/hero_luxury_leather_craft_1791161526275.jpg';
import watchImg from '../assets/images/product_master_horology_1791161540806.jpg';
import sneakerImg from '../assets/images/product_bespoke_sneaker_1791161553010.jpg';
import qcWorkbenchImg from '../assets/images/factory_atelier_qc_workbench_1791161564085.jpg';
import redHandbagLifestyle from '../assets/images/red_handbag_lifestyle_1791161928325.jpg';
import redWatchUnboxing from '../assets/images/red_watch_unboxing_1791161941108.jpg';
import velaDetailMockup from '../assets/images/vela_detail_mockup_1791166307847.jpg';

export const INITIAL_SELLERS: Seller[] = [
  {
    id: 'seller-baiyun',
    name: 'Baiyun Leathercraft Atelier',
    chineseName: 'Guangzhou Baiyun Atelier (广州白云奢研工坊)',
    badge: 'Master Atelier',
    region: 'Guangdong Guangzhou',
    establishedYear: 2014,
    rating: 4.96,
    reviewCount: 1420,
    successfulShipments: 4890,
    qcPassRate: 99.4,
    avgQcHours: 24,
    bio: 'Dedicated workshop with 12 years of experience specializing in imported French Togo and Epsom leathers and traditional Hermès-grade hand saddle stitching. Direct sourcing with zero shutdown risks from unauthorized social channels.',
    chineseBio: '12-year master atelier specializing in traditional hand saddle stitching, genuine French imported Togo leathers, and micron gold-plated brass hardware.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    bannerImage: redHandbagLifestyle,
    specialties: ['French Imported Leather', '100% Hand Saddle Stitch', '24K Micron Gold Hardware', 'Exact Stamping Depth'],
    contactWeChat: 'SRV_Baiyun_01',
    verificationAuditDate: '2026-08-15 On-site Verified'
  },
  {
    id: 'seller-clean-watch',
    name: 'Dongguan Clean Horology Lab',
    chineseName: 'Dongguan Precision Horology Lab (Clean Lab)',
    badge: 'Verified Factory',
    region: 'Guangdong Dongguan',
    establishedYear: 2016,
    rating: 4.98,
    reviewCount: 2150,
    successfulShipments: 6200,
    qcPassRate: 99.8,
    avgQcHours: 18,
    bio: 'Specialist in Swiss-spec 3235 / 4130 integrated clone movements, 904L Oystersteel polish, and nano-ceramic platinum PVD coating. Full 5-position timegrapher reading reports issued before every shipment.',
    chineseBio: 'In-house integrated 4130/3235 calibers, 904L stainless steel polishing, and high-tech nano ceramic bezels with platinum coating.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    bannerImage: redWatchUnboxing,
    specialties: ['904L Super Stainless Steel', 'Integrated Clone Caliber', 'Timegrapher ±2s/day Verified', 'Ceramic Platinum PVD'],
    contactWeChat: 'Clean_Chrono_Lab',
    verificationAuditDate: '2026-09-02 Calibration Audit Passed'
  },
  {
    id: 'seller-putian-guild',
    name: 'Putian Bespoke Footwear Guild',
    chineseName: 'Putian Master Footwear Guild (莆田顶匠鞋造舍)',
    badge: 'Bespoke Studio',
    region: 'Fujian Putian',
    establishedYear: 2017,
    rating: 4.92,
    reviewCount: 980,
    successfulShipments: 3410,
    qcPassRate: 98.9,
    avgQcHours: 20,
    bio: 'High-end bespoke shoe atelier that completely disassembles genuine retail pairs to clone lasts, patterns, and cushioning 1:1. Exclusively uses original Italian calfskin and air-cushioned soles.',
    chineseBio: 'Specializes in genuine teardown mold replication, top-grain imported leather, original cushions, and UV authentication pass.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    bannerImage: sneakerImg,
    specialties: ['1:1 Authentic Disassembly Mold', 'Original Italian Calfskin', 'Strobel Stitch Compliance', 'UV Light QC Passed'],
    contactWeChat: 'PT_Master_Sneakers',
    verificationAuditDate: '2026-07-20 Line Certification Completed'
  },
  {
    id: 'seller-hangzhou-silk',
    name: 'Hangzhou Haute Tailoring Studio',
    chineseName: 'Hangzhou Haute Atelier (杭州锦艺奢品工坊)',
    badge: 'Bespoke Studio',
    region: 'Zhejiang Hangzhou',
    establishedYear: 2018,
    rating: 4.94,
    reviewCount: 760,
    successfulShipments: 2190,
    qcPassRate: 99.2,
    avgQcHours: 24,
    bio: 'Bespoke atelier specializing in 100% mulberry silk, Mongolian double-faced cashmere, and heavy luxury cotton. Down jackets filled with 800+ fill power European white goose down and computer-guided Tajima embroidery.',
    chineseBio: '100% mulberry silk and imported double-faced cashmere, 800+ FP white goose down, and computer high-density embroidery.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    bannerImage: qcWorkbenchImg,
    specialties: ['800+ Fill Power European Goose Down', 'Authentic Fabric Weight (GSM)', 'Precision Embroidery Kerning', 'Synchronized Button Engravings'],
    contactWeChat: 'HZ_Haute_Silk',
    verificationAuditDate: '2026-09-12 Textile Quality Certified'
  },
  {
    id: 'seller-vs-watch',
    name: 'VS Watch Studio',
    chineseName: 'VS Horology Studio (VS Studio)',
    badge: 'Verified Factory',
    region: 'Guangdong Dongguan',
    establishedYear: 2017,
    rating: 4.99,
    reviewCount: 3420,
    successfulShipments: 8900,
    qcPassRate: 99.9,
    avgQcHours: 16,
    bio: 'Direct studio of VS Factory. Pioneer in custom Datejust 41mm powered by exclusive Dandong 3235 movements. 5-position 0-deviation timegrapher guarantee and 100% triangle transit customs pass guarantee.',
    chineseBio: 'VS Factory direct studio, custom Datejust 41mm powered by Dandong 3235 integrated movement with live macro QC tests.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    bannerImage: redWatchUnboxing,
    specialties: ['VS Dandong 3235 Movement', '904L Oystersteel & Jubilee Bracelet', 'Fluted Bezel Platinum PVD', 'Timegrapher 0-Error Audit'],
    contactWeChat: 'VS_Watch_Studio',
    verificationAuditDate: '2026-10-01 VELA VERIFIED On-site Audit'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-vs-datejust-41',
    title: 'Classic Datejust 41mm Fluted Bezel',
    chineseTitle: 'VS Factory Datejust 41 Rhodium/Olive Dandong 3235 Movement',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 480,
    sellerId: 'seller-vs-watch',
    sellerName: 'VS Watch Studio',
    sellerRegion: 'Dongguan, Guangdong',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    rating: 4.99,
    reviewCount: 520,
    likesCount: 7840,
    isLiked: true,
    isVideo: true,
    videoDuration: '0:54',
    aspectRatio: 'aspect-[9/16]',
    images: [
      velaDetailMockup,
      watchImg,
      redWatchUnboxing,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'Dandong 3235 72h Power Reserve Movement' },
      { x: 50, y: 25, label: 'Fluted Bezel Platinum PVD Coating' },
      { x: 50, y: 80, label: '904L Precision 5-Link Jubilee Bracelet' }
    ],
    hashtags: ['#VSFactory', '#Datejust41', '#VSWatchStudio', '#VELAVERIFIED', '#ClassicDatejust', '#TriangleTransit'],
    description: 'VELA VERIFIED official release. Equipped with VS Factory exclusive Dandong 3235 integrated clone movement featuring a genuine 72-hour power reserve and instant bidirectional date quickset. Hand-polished 904L Oystersteel case with platinum PVD fluted bezel. 5-position timegrapher screenshots and serial engravings uploaded to the live QC inspection desk prior to dispatch.',
    comments: [
      {
        id: 'vs-dj-1',
        author: 'RolexCollector_KR',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        content: 'The winding resistance on this Dandong 3235 and the clasp click feel indistinguishable from genuine. $480 is incredible value.',
        timeAgo: '1 hour ago',
        likes: 184,
        sellerReply: 'Thank you! Dispatched via our 100% insured triangle transit clearance route.'
      }
    ],
    specifications: {
      material: '904L Super Stainless Steel + Platinum PVD Fluted Bezel',
      hardware: 'Sapphire Crystal with 2.5x Cyclops Magnifier',
      craftsmanship: 'VS Exclusive Dandong 3235 Super Clone Caliber (28,800 bph, 72h reserve)',
      dimensions: 'Diameter 41mm, Thickness 11.7mm (1:1 retail dimensions)',
      factoryBatch: 'VS-DJ41-D3235-GOLD'
    },
    inStock: true,
    leadTimeDays: 0,
    qcSamplePhotos: [
      {
        id: 'qc-vsdj-1',
        title: 'Timegrapher Precision Reading',
        description: 'Passed 5-position digital timegrapher accuracy test',
        imageUrl: qcWorkbenchImg,
        measurements: 'Rate: +0.8 s/d | Amp: 304° | Beat Err: 0.0ms'
      }
    ]
  },
  {
    id: 'prod-birkin-30',
    title: 'Guangzhou Baiyun Atelier Exclusive: French Imported Togo Leather B30 Gold Hardware',
    chineseTitle: 'Guangzhou Baiyun Atelier Genuine French Togo B30 Gold Hardware Unboxing',
    category: 'leather',
    categoryLabel: 'Leathergoods & Handbags',
    tier: '1:1 Master Grade',
    priceUSD: 890,
    sellerId: 'seller-baiyun',
    sellerName: 'Baiyun Leathercraft Atelier',
    sellerRegion: 'Guangzhou, Guangdong',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    rating: 4.98,
    reviewCount: 182,
    likesCount: 3842,
    isLiked: false,
    aspectRatio: 'aspect-[3/4]',
    images: [
      redHandbagLifestyle,
      heroLeatherImg,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 35, y: 48, label: 'French Haas Tannery Togo Calfskin' },
      { x: 62, y: 55, label: 'Solid Brass 24K Micron Vacuum Gold' },
      { x: 45, y: 72, label: 'Lin Câblé Hand Saddle Stitching' }
    ],
    hashtags: ['#BaiyunAtelier', '#TogoLeather', '#BespokeHandbag', '#MasterQC', '#TriangleClearance'],
    description: 'Avoid social media scams. Crafted by a 12-year veteran artisan with genuine Togo calfskin sourced directly from the Haas tannery in France, stitched stitch-by-stitch with traditional saddle stitching. High-definition micro-QC photos measuring flap caliper thickness and foil stamping kerning are uploaded directly to your desk before shipment.',
    comments: [
      {
        id: 'c1',
        author: 'Sophia_Seoul',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        content: 'I was burned on Instagram DM before, but being able to review digital caliper measurements and macro photos before giving shipping approval makes me feel 100% safe. Exceptional quality.',
        timeAgo: '2 hours ago',
        likes: 128,
        sellerReply: 'Thank you so much! Our strict leather inspection standards pay off. Shipped with insured triangle customs clearance.'
      },
      {
        id: 'c2',
        author: 'Chloe_Fashion',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        content: 'How long does customs clearance usually take? Any seizure concerns with triangle transit?',
        timeAgo: '5 hours ago',
        likes: 45,
        sellerReply: 'It takes 4-7 business days via Hong Kong transshipment. In the rare event of customs inspection issues, our 100% free reshipment guarantee applies.'
      }
    ],
    specifications: {
      material: 'Imported French Haas Togo Calfskin (Subtle 3D Grain Texture)',
      hardware: 'Solid Brass Core 24K 3-Micron Vacuum Gold Plating',
      craftsmanship: '100% French Traditional Hand Saddle Stitch (Lin Câblé Linen Thread)',
      dimensions: '30cm x 22cm x 16cm',
      factoryBatch: 'BY-FR2026-09B'
    },
    inStock: true,
    leadTimeDays: 2,
    qcSamplePhotos: [
      {
        id: 'qc-1',
        title: 'Front Alignment & Leather Texture',
        description: 'Natural Togo grain relief and symmetrical flap alignment',
        imageUrl: heroLeatherImg,
        measurements: 'Flap lateral symmetry tolerance within 0.3mm'
      },
      {
        id: 'qc-2',
        title: 'Microscope Stamp Depth',
        description: 'Microscopic foil stamping depth and typography stroke alignment',
        imageUrl: qcWorkbenchImg,
        measurements: 'Indentation depth 0.14mm, zero kerning deviation'
      }
    ]
  },
  {
    id: 'prod-cosmograph-daytona',
    title: 'Dongguan Clean Lab Caliber 4130 Chronograph: 0-Error Timegrapher Live Testing',
    chineseTitle: 'Dongguan Clean Lab 4130 Integrated Movement Live Test 0-Error',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 780,
    sellerId: 'seller-clean-watch',
    sellerName: 'Dongguan Clean Horology Lab',
    sellerRegion: 'Dongguan, Guangdong',
    rating: 4.99,
    reviewCount: 310,
    likesCount: 5219,
    isLiked: true,
    isVideo: true,
    videoDuration: '0:48',
    aspectRatio: 'aspect-[9/16]',
    images: [
      redWatchUnboxing,
      watchImg,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'Dandong 4130 Integrated Chrono Caliber' },
      { x: 30, y: 35, label: 'High-Tech Nano Ceramic Platinum PVD Bezel' },
      { x: 70, y: 65, label: '904L Oystersteel Precision Hairline Brush' }
    ],
    hashtags: ['#DongguanHorology', '#Dandong4130', '#TimegrapherQC', '#LuxuryUnboxing', '#SmartEscrow'],
    description: 'Do not fall for low-grade 7750 movements disguised as 4130 on TikTok. This model houses the authentic Dandong 4130 caliber with true 12.2mm case thickness, functional chronograph zero-reset, anti-reflective sapphire glass, and platinum engraved ceramic tachymeter bezel. Full 5-position timegrapher results uploaded to the buyer QC desk prior to shipment.',
    comments: [
      {
        id: 'cw1',
        author: 'WatchCollector_K',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        content: 'Over 300° amplitude and 0.0ms beat error on the timegrapher. Even my local watchmaker was stunned by the caliber finish.',
        timeAgo: '1 day ago',
        likes: 210,
        sellerReply: 'All pieces undergo cleanroom overhaul and pressure testing before shipping. Thank you!'
      }
    ],
    specifications: {
      material: '904L Oystersteel Case & Bracelet, Nano-Ceramic Bezel',
      hardware: 'Anti-Reflective Double AR High-Purity Sapphire Crystal',
      craftsmanship: 'Clean Factory Dandong 4130 Automatic Chrono Movement (28,800 bph)',
      dimensions: 'Diameter 40mm, Genuine Exact Thickness 12.2mm',
      factoryBatch: 'CLN-4130-V4',
      timegrapherSpec: 'Rate +1~+3s/day, Amplitude 295°, Beat Error 0.1ms'
    },
    inStock: true,
    leadTimeDays: 1,
    qcSamplePhotos: [
      {
        id: 'qc-w1',
        title: 'Dial & Subdial Macro QC',
        description: 'Concentric subdial grain texture and chronograph zero-reset inspection',
        imageUrl: watchImg,
        measurements: 'Chrono seconds hand snaps dead-center at 12:00'
      },
      {
        id: 'qc-w2',
        title: 'Timegrapher Precision Report',
        description: 'Swiss digital timegrapher reading screenshot attached',
        imageUrl: qcWorkbenchImg,
        measurements: 'Rate: +2s/d | Amplitude: 298° | Beat Error: 0.0ms'
      }
    ]
  },
  {
    id: 'prod-vintage-runner',
    title: 'Putian Bespoke Footwear: Genuine Disassembly Last Distressed Vintage Runner',
    chineseTitle: 'Putian Master Guild Authentic Disassembled Vintage Runner On-Foot Review',
    category: 'footwear',
    categoryLabel: 'Footwear & Bespoke Sneakers',
    tier: 'Mirror Bespoke',
    priceUSD: 240,
    sellerId: 'seller-putian-guild',
    sellerName: 'Putian Bespoke Footwear Guild',
    sellerRegion: 'Putian, Fujian',
    rating: 4.93,
    reviewCount: 95,
    likesCount: 2190,
    isLiked: false,
    isVideo: true,
    videoDuration: '1:12',
    aspectRatio: 'aspect-[4/5]',
    images: [
      sneakerImg,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 40, y: 60, label: 'Imported Italian Hand-Washed Calfskin' },
      { x: 65, y: 45, label: 'Original 1:1 Footbed Last Molding' }
    ],
    hashtags: ['#PutianGuild', '#VintageRunner', '#SneakerBespoke', '#LastMolding', '#OnFootLook'],
    description: 'Completely different from cheap commercial copies with pungent glue odors. Crafted by disassembling retail pairs to match shoe lasts and panels 1:1. Features artisan hand-brushed distressing, latex midsole cushioning, and clean 8-stitches-per-inch strobel stitching verified under UV light.',
    comments: [
      {
        id: 's1',
        author: 'Street_J',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
        content: 'Seeing the tight internal strobel stitching when the insole was removed sold me immediately. Is it true to size?',
        timeAgo: '3 days ago',
        likes: 38,
        sellerReply: 'Standard European EU sizing is recommended. If you have wide feet, consider half a size up.'
      }
    ],
    specifications: {
      material: 'Original Italian Calfskin + Air Mesh + Vintage Hand-Brush Distressing',
      hardware: 'Treated Wax Laces & Ergonomic Antibacterial Ortholite Insole',
      craftsmanship: 'Authentic 1:1 Disassembly Last Molding & Computerized Midsole Stitching',
      dimensions: 'EU 38 ~ 46 True to size',
      factoryBatch: 'PT-RUN-2026-X'
    },
    inStock: true,
    leadTimeDays: 2,
    qcSamplePhotos: [
      {
        id: 'qc-s1',
        title: 'Sole & Strobel Stitching Inspection',
        description: 'Insole removed to inspect strobel stitch density and air pockets',
        imageUrl: sneakerImg,
        measurements: 'Stitch density: 8 stitches per inch matching retail'
      }
    ]
  },
  {
    id: 'prod-down-parka',
    title: 'Hangzhou Haute Atelier: 850+ Fill Power Arctic Goose Down Parka Macro Detail',
    chineseTitle: 'Hangzhou Haute Atelier 850+ FP Goose Down Parka Tajima Embroidery Macro',
    category: 'streetwear',
    categoryLabel: 'Streetwear & Outerwear',
    tier: 'Mirror Bespoke',
    priceUSD: 360,
    sellerId: 'seller-hangzhou-silk',
    sellerName: 'Hangzhou Haute Tailoring Studio',
    sellerRegion: 'Hangzhou, Zhejiang',
    rating: 4.95,
    reviewCount: 140,
    likesCount: 1840,
    isLiked: false,
    aspectRatio: 'aspect-[2/3]',
    images: [
      qcWorkbenchImg,
      heroLeatherImg
    ],
    imagePins: [
      { x: 45, y: 35, label: 'Tajima 12,000-Stitch High-Density Crest' },
      { x: 55, y: 70, label: '90/10 European White Goose Down 450g' }
    ],
    hashtags: ['#HangzhouTailoring', '#GooseDownParka', '#WinterLuxury', '#FillPower850', '#DirectAtelier'],
    description: 'Precision Japanese Tajima embroidery machines render 12,000 stitches without flaw. Filled with 450g of 90/10 European white goose down, engineered for sub-30°C arctic warmth. Prior to shipping, loft rebound tests and tape measurements across chest and shoulder are uploaded.',
    comments: [
      {
        id: 'dp1',
        author: 'WinterLover',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        content: 'The embroidery kerning and maple leaf contours match retail down to the millimeter!',
        timeAgo: '4 days ago',
        likes: 56
      }
    ],
    specifications: {
      material: 'Teflon Windproof/Water-repellent Nylon Shell + 90/10 European Goose Down',
      hardware: 'Authentic Spec YKK Vislon 2-Way Matte Black Metal Zippers',
      craftsmanship: 'Tajima Computerized Precision 12,000-Stitch Crest Embroidery',
      dimensions: 'S, M, L, XL, XXL (Standard International Fit)',
      factoryBatch: 'HZ-EXPED-08'
    },
    inStock: true,
    leadTimeDays: 2,
    qcSamplePhotos: [
      {
        id: 'qc-c1',
        title: 'Badge Embroidery & Fill Power Verification',
        description: 'Microscopic crest macro photography and roller loft rebound test',
        imageUrl: qcWorkbenchImg,
        measurements: 'Fill power measured at 850 FP, feather leakage 0%'
      }
    ]
  },
  {
    id: 'prod-submariner-date',
    title: 'Dongguan Clean Sub 41 Emerald Green: Platinum PVD Ceramic Bezel Macro Inspection',
    chineseTitle: 'Dongguan Clean Submariner 41 Emerald Ceramic Platinum PVD Macro',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 620,
    sellerId: 'seller-clean-watch',
    sellerName: 'Dongguan Clean Horology Lab',
    sellerRegion: 'Dongguan, Guangdong',
    rating: 4.97,
    reviewCount: 280,
    likesCount: 3105,
    isLiked: false,
    aspectRatio: 'aspect-[1/1]',
    images: [
      watchImg,
      redWatchUnboxing,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 30, label: 'Emerald Ceramic Platinum PVD Coating' },
      { x: 65, y: 55, label: 'Dandong 3235 70h Power Reserve Movement' }
    ],
    hashtags: ['#CleanSub', '#GreenBezel', '#MasterHorology', '#Timegrapher', '#WatchInspection'],
    description: 'Equipped with the celebrated Dandong 3235 caliber, providing a true 70-hour power reserve and forward calendar quickset. The green ceramic bezel is coated with real platinum dust to resist fading forever. Glidelock clasp slide test and 5-position timegrapher video provided prior to shipping.',
    comments: [
      {
        id: 'sw1',
        author: 'TimeMaster',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        content: 'When I bought from Instagram sellers before, the movement stopped in days. Having smart escrow protection here gives true peace of mind.',
        timeAgo: '2 days ago',
        likes: 92
      }
    ],
    specifications: {
      material: '904L Oystersteel, Green High-Tech Nano Ceramic Insert',
      hardware: 'High-Purity Sapphire Crystal with 2.5x Anti-Reflective Cyclops',
      craftsmanship: 'Dandong 3235 Movement (70h reserve, forward date quickset)',
      dimensions: 'Diameter 41mm, Lug 21mm, Thickness 12.3mm',
      factoryBatch: 'CLN-SUB41-26G',
      timegrapherSpec: 'Rate +1s/day, Amplitude 302°, 50m Water Resistance Passed'
    },
    inStock: true,
    leadTimeDays: 1,
    qcSamplePhotos: [
      {
        id: 'qc-w3',
        title: 'Ceramic Platinum Bezel Engraving',
        description: 'Inspection of platinum dust coating and luminous pip projection height',
        imageUrl: watchImg,
        measurements: 'Lume pip height 0.28mm matching genuine dimensions'
      }
    ]
  },
  {
    id: 'prod-constance-box',
    title: 'Guangzhou German Imported Box Calf Shoulder Bag: Natural Sheen & H-Clasp Snap Sound',
    chineseTitle: 'Guangzhou German Box Calf Handbag Natural Gloss & Brass Clasp Unboxing',
    category: 'leather',
    categoryLabel: 'Leathergoods & Handbags',
    tier: '1:1 Master Grade',
    priceUSD: 750,
    sellerId: 'seller-baiyun',
    sellerName: 'Baiyun Leathercraft Atelier',
    sellerRegion: 'Guangzhou, Guangdong',
    rating: 4.96,
    reviewCount: 110,
    likesCount: 1980,
    isLiked: false,
    aspectRatio: 'aspect-[4/5]',
    images: [
      redHandbagLifestyle,
      heroLeatherImg,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'German Weinheimer Box Calfskin' },
      { x: 50, y: 70, label: 'Solid Brass CNC Milled 18K Ion-Plated H-Buckle' }
    ],
    hashtags: ['#BoxCalf', '#Constance', '#GuangzhouMaster', '#FineLeather', '#QCApproval'],
    description: 'Featuring German Weinheimer box calfskin with tight grain tension and mirror-like natural depth. Enjoy the crisp, heavy engagement click of the CNC-milled brass H-buckle. 4-coat hand-sanded edge paint cross-sections and thickness calipers are inspected before release.',
    comments: [
      {
        id: 'bx1',
        author: 'Jenny_Seoul',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        content: 'The leather scent alone tells the truth—no cheap chemical odors, pure natural tannery aroma.',
        timeAgo: '1 week ago',
        likes: 115
      }
    ],
    specifications: {
      material: 'Imported German Top-Tier Box Calfskin (Smooth Natural Gloss)',
      hardware: 'Solid Brass CNC Precision Milled 18K Ion Gold Plated Buckle',
      craftsmanship: 'Quadruple Hand-Sanded and Polished Edge Lacquer',
      dimensions: '19cm x 15cm x 5cm',
      factoryBatch: 'BY-BOX19-A'
    },
    inStock: true,
    leadTimeDays: 3,
    qcSamplePhotos: [
      {
        id: 'qc-l3',
        title: 'Buckle Spring & Magnetic Lock Fit',
        description: 'H-buckle lateral balance and micro-gap tolerance testing',
        imageUrl: heroLeatherImg,
        measurements: 'Buckle play under 0.1mm with tight engagement'
      }
    ]
  },
  {
    id: 'prod-vs-submariner',
    title: 'VS Factory Submariner 41 Dandong 3235 Caliber: 72h Reserve Testing Video',
    chineseTitle: 'VS Factory Rolex Submariner 41 Dandong 3235 Movement Power Reserve Test',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 590,
    sellerId: 'seller-clean-watch',
    sellerName: 'Dongguan Clean Horology Lab',
    sellerRegion: 'Dongguan, Guangdong',
    rating: 4.98,
    reviewCount: 420,
    likesCount: 6180,
    isLiked: false,
    isVideo: true,
    videoDuration: '0:55',
    aspectRatio: 'aspect-[9/16]',
    images: [
      watchImg,
      redWatchUnboxing,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'VS Exclusive Dandong 3235 Super Clone Caliber' },
      { x: 40, y: 25, label: 'Genuine Color Black Ceramic Bezel Insert' }
    ],
    hashtags: ['#VS', '#VSFactory', '#Submariner', '#SameDayDispatch', '#Dandong3235'],
    description: 'Acknowledged globally as the pinnacle of Submariner craftsmanship. The exclusive Dandong 3235 integrated movement guarantees an actual 72-hour power reserve. 3 units in ready stock for same-day dispatch.',
    comments: [
      {
        id: 'vs1',
        author: 'Horology_Fan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        content: 'The crown winding feel on this VS 3235 is virtually indistinguishable from retail.',
        timeAgo: '3 hours ago',
        likes: 88
      }
    ],
    specifications: {
      material: '904L Super Stainless Steel, Black Nano Ceramic Bezel',
      hardware: 'Sapphire Crystal Lens with Blue AR Undercoating',
      craftsmanship: 'VS Factory Exclusive Dandong 3235 Movement',
      dimensions: 'Diameter 41mm, Thickness 12.3mm',
      factoryBatch: 'VS-SUB41-D3235'
    },
    inStock: true,
    leadTimeDays: 0,
    qcSamplePhotos: [
      {
        id: 'qc-vs1',
        title: 'VS 3235 Movement Serial & Engraving',
        description: 'Movement bridge engraving and balance wheel alignment review',
        imageUrl: qcWorkbenchImg,
        measurements: 'Rate +1s/d | Beat Error 0.0ms'
      }
    ]
  },
  {
    id: 'prod-aps-royal-oak',
    title: 'APS Factory 15500 Royal Oak Caliber 4302: Ultra-Slim 10.4mm Profile Verified',
    chineseTitle: 'APS Factory Royal Oak 15500 Integrated 4302 Movement 10.4mm Slimness',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 680,
    sellerId: 'seller-clean-watch',
    sellerName: 'Dongguan Clean Horology Lab',
    sellerRegion: 'Dongguan, Guangdong',
    rating: 4.97,
    reviewCount: 230,
    likesCount: 4420,
    isLiked: false,
    isVideo: true,
    videoDuration: '1:05',
    aspectRatio: 'aspect-[3/4]',
    images: [
      redWatchUnboxing,
      watchImg,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'APS Proprietary Integrated 4302 Caliber' },
      { x: 50, y: 35, label: 'Grande Tapisserie Waffle Dial 3D Relief' }
    ],
    hashtags: ['#APS', '#APSFactory', '#RoyalOak', '#NewRelease', '#Integrated4302'],
    description: 'Engineered from scratch as a true integrated movement rather than a decorative plate overlay. Replicates the authentic 10.4mm ultra-slim profile and the exact octagonal bezel screw alignments.',
    comments: [
      {
        id: 'aps1',
        author: 'AP_Lover',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        content: 'The light play on the tapisserie dial is stunning. The rotor operates in complete silence.',
        timeAgo: '6 hours ago',
        likes: 64
      }
    ],
    specifications: {
      material: '316L Hand-Brushed Fine Stainless Steel',
      hardware: 'Double Anti-Reflective Sapphire Crystal Exhibition Caseback',
      craftsmanship: 'APS Exclusive Integrated 4302 Automatic Movement',
      dimensions: 'Diameter 41mm, Thickness 10.4mm (1:1 retail dimensions)',
      factoryBatch: 'APS-RO15500-V3'
    },
    inStock: true,
    leadTimeDays: 1,
    qcSamplePhotos: [
      {
        id: 'qc-aps1',
        title: 'Case Thickness Caliper Test',
        description: 'Digital caliper case thickness measurement (10.41mm)',
        imageUrl: qcWorkbenchImg,
        measurements: '10.41mm matching original factory specification'
      }
    ]
  },
  {
    id: 'prod-daydate-tungsten',
    title: 'Day-Date 40 Olive Green Dial: Heavyweight Tungsten 190g Wrist Feel Verified',
    chineseTitle: 'Day-Date 40 Olive Green Dial Heavy Tungsten 190g Weight Tested',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 720,
    sellerId: 'seller-clean-watch',
    sellerName: 'Dongguan Clean Horology Lab',
    sellerRegion: 'Dongguan, Guangdong',
    rating: 4.99,
    reviewCount: 380,
    likesCount: 5890,
    isLiked: false,
    aspectRatio: 'aspect-[1/1]',
    images: [
      watchImg,
      redWatchUnboxing,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'Olive Green Sunray Dial & Roman Numerals' },
      { x: 50, y: 70, label: 'Heavy Tungsten Core Case (190g Measured)' }
    ],
    hashtags: ['#DayDate', '#OliveGreen', '#TungstenHeavy', '#ReadyToShip', '#GoldWatch'],
    description: 'Overcoming the lightweight feel of ordinary replicas, this timepiece uses high-density tungsten alloy to deliver the signature 190g substantial wrist presence of solid gold. Features instant midnight day-date jumps and 3D Roman numeral indices.',
    comments: [
      {
        id: 'dd1',
        author: 'GoldWatch',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
        content: 'Put it on my kitchen scale and it clocked in at 190.8g. The wrist presence is magnificent.',
        timeAgo: '1 day ago',
        likes: 104
      }
    ],
    specifications: {
      material: 'High-Density Tungsten Alloy Core + 18K Everose Gold 5-Micron PVD Coating',
      hardware: 'Sapphire Crystal with Cyclops Magnifier',
      craftsmanship: 'Dandong 3255 Day/Date Quick-Jump Caliber',
      dimensions: 'Diameter 40mm, Weight 190g (matches genuine 190g vs ordinary 130g)',
      factoryBatch: 'CLN-DD40-TUNGSTEN'
    },
    inStock: true,
    leadTimeDays: 0,
    qcSamplePhotos: [
      {
        id: 'qc-dd1',
        title: 'Precision Scale Weight Verification',
        description: 'Electronic scale actual weight reading (190.8g)',
        imageUrl: qcWorkbenchImg,
        measurements: 'Weight: 190.8g'
      }
    ]
  },
  {
    id: 'prod-cartier-santos',
    title: 'Santos de Cartier Medium: SmartLink & QuickSwitch Toolless Strap System Demo',
    chineseTitle: 'Santos de Cartier Medium SmartLink Quick-Release Demonstration',
    category: 'watches',
    categoryLabel: 'Master Watches / Horology',
    tier: '1:1 Master Grade',
    priceUSD: 490,
    sellerId: 'seller-clean-watch',
    sellerName: 'Dongguan Clean Horology Lab',
    sellerRegion: 'Dongguan, Guangdong',
    rating: 4.96,
    reviewCount: 290,
    likesCount: 3910,
    isLiked: false,
    isVideo: true,
    videoDuration: '0:42',
    aspectRatio: 'aspect-[9/16]',
    images: [
      redWatchUnboxing,
      watchImg,
      qcWorkbenchImg
    ],
    imagePins: [
      { x: 50, y: 50, label: 'Silvered Opaline Dial & Blued Steel Hands' },
      { x: 50, y: 80, label: 'Patented SmartLink Tool-Free Link Removal' }
    ],
    hashtags: ['#Cartier', '#Santos', '#SmartLink', '#ReadyToShip', '#NewArrival'],
    description: 'Featuring the full tool-free SmartLink and QuickSwitch bracelet adjustment mechanism. Push the hidden release button with your finger to resize links instantaneously. Finished with heat-treated blued steel sword hands and faceted synthetic spinel crown.',
    comments: [
      {
        id: 'cart1',
        author: 'Classic_Lover',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        content: 'The tool-free link adjustment works with a simple fingertip press. Impeccable craftsmanship.',
        timeAgo: '2 days ago',
        likes: 72
      }
    ],
    specifications: {
      material: '316L High-Grade Stainless Steel, Faceted Blue Spinel Crown',
      hardware: 'Thermal Blued Steel Hands & Scratch-Proof Sapphire Crystal',
      craftsmanship: 'MIYOTA 9015 Ultra-Slim Caliber (Precision Regulated)',
      dimensions: '35.1mm x 41.9mm, Thickness 8.8mm',
      factoryBatch: 'BV-SANTOS-M35'
    },
    inStock: true,
    leadTimeDays: 0,
    qcSamplePhotos: [
      {
        id: 'qc-cart1',
        title: 'Hands Blue Hue & Crown Gem Macro',
        description: 'Blued hands specular reflection and crown spinel gemstone facet alignment',
        imageUrl: qcWorkbenchImg,
        measurements: 'Thickness 8.83mm matching original factory tolerance'
      }
    ]
  },
  {
    id: 'prod-factory-news-2026',
    title: 'Bulletin: 2026 Guangdong & Dongguan Ateliers Expansion and Insured Triangle Transit Report',
    chineseTitle: 'Latest Announcement: 2026 Atelier Upgrades and Triangle Customs Transit',
    category: 'accessories',
    categoryLabel: 'Atelier News & Bulletins',
    tier: '1:1 Master Grade',
    priceUSD: 190,
    sellerId: 'seller-baiyun',
    sellerName: 'Baiyun Leathercraft Atelier',
    sellerRegion: 'Guangzhou / Dongguan',
    rating: 5.0,
    reviewCount: 88,
    likesCount: 8200,
    isLiked: true,
    aspectRatio: 'aspect-[1/1]',
    images: [
      qcWorkbenchImg,
      heroLeatherImg,
      redWatchUnboxing
    ],
    imagePins: [
      { x: 50, y: 50, label: 'Hong Kong-Singapore Triangle Customs Line 100% Incident-Free' }
    ],
    hashtags: ['#News', '#AtelierBulletin', '#CustomsClearance', '#TriangleTransit', '#EscrowProtection'],
    description: 'Official announcement addressing recent social media crackdowns and scams. All verified ateliers on VELA adhere to 100% pre-shipment micro-QC approval and dedicated insured triangle transit routing with free replacement guarantees.',
    comments: [
      {
        id: 'news1',
        author: 'Silk_Official',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        content: 'All payments remain safely locked in decentralized smart escrow until buyer delivery confirmation.',
        timeAgo: '1 hour ago',
        likes: 310
      }
    ],
    specifications: {
      material: 'Official Authenticity Certificate & Atelier VIP Packaging',
      hardware: 'Platform Guarantee Hologram Seal Included',
      craftsmanship: 'Direct Dispatch from On-Site Audited Workshop',
      dimensions: 'Universal Coverage',
      factoryBatch: 'NEWS-2026-REPORT'
    },
    inStock: true,
    leadTimeDays: 0,
    qcSamplePhotos: [
      {
        id: 'qc-news1',
        title: 'Safe Transit Documentation',
        description: 'Triangle transit insured customs clearance clearance label',
        imageUrl: qcWorkbenchImg,
        measurements: 'Customs Clearance: 100% Guaranteed'
      }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1042',
    orderNumber: 'VELA-KR-202610-8842',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Cosmograph
        quantity: 1,
        selectedVariant: 'Black Ceramic / Oystersteel'
      }
    ],
    totalUSD: 780,
    status: 'QC_READY', // Ready for buyer approval!
    createdAt: '2026-10-03 14:20',
    shippingOption: 'TRIANGLE_AIR_SAFE',
    buyerName: 'David Kim',
    buyerPhone: '+1-415-892-****',
    shippingAddress: '152 Teheran-ro, Gangnam-gu, Seoul',
    qcPhotos: [
      {
        id: 'qco-1',
        title: 'Dial & Ceramic Bezel Macro Inspection',
        description: 'Dial indices Chromalight lume alignment and ceramic bezel platinum engravings verified',
        imageUrl: watchImg,
        measurements: 'Ceramic bezel 12:00 triangle aligns dead-center with dial 12:00 marker'
      },
      {
        id: 'qco-2',
        title: 'Timegrapher Caliber 4130 Reading',
        description: 'Real-time 5-position digital timegrapher reading screenshot prior to dispatch',
        imageUrl: qcWorkbenchImg,
        measurements: '+1.8 s/day | Amp: 301° | Beat Err: 0.0ms | 28800bph'
      },
      {
        id: 'qco-3',
        title: 'Caliper Case Thickness Measurement',
        description: 'Digital caliper case thickness check (12.23mm)',
        imageUrl: qcWorkbenchImg,
        measurements: 'Deviation +0.03mm vs 12.2mm genuine spec (micron-grade tolerance)'
      }
    ],
    trackingNumber: 'PENDING_BUYER_APPROVAL'
  },
  {
    id: 'order-1043',
    orderNumber: 'VELA-KR-202610-7719',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Birkin 25
        quantity: 1,
        selectedVariant: 'Étoupe / Palladium Silver Hardware'
      }
    ],
    totalUSD: 1450,
    status: 'IN_TRANSIT',
    createdAt: '2026-10-02 09:15',
    shippingOption: 'TRIANGLE_AIR_SAFE',
    buyerName: 'Elena Vance',
    buyerPhone: '+1-212-334-****',
    shippingAddress: '91 Hannam-daero, Yongsan-gu, Seoul',
    qcPhotos: [
      {
        id: 'qco-b1',
        title: 'Saddle Stitch Micro Inspection',
        description: 'French Au Chinois imported linen thread 28-degree hand saddle stitch alignment',
        imageUrl: heroLeatherImg,
        measurements: '7.5 stitches per inch matching retail standard'
      }
    ],
    qcApprovedAt: '2026-10-02 18:30',
    trackingNumber: 'TRI-HK-KR-8492019'
  }
];
