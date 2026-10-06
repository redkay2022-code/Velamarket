import React, { useState, useEffect } from 'react';
import { CartItem, Currency, Order } from '../types';
import { formatPrice } from '../utils/helpers';
import {
  X,
  ShieldCheck,
  Lock,
  Zap,
  Copy,
  Check,
  CreditCard,
  Wallet,
  Smartphone,
  HelpCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  FileCheck,
  RefreshCw,
  QrCode,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import qcWorkbenchImg from '../assets/images/factory_atelier_qc_workbench_1791161564085.jpg';

interface HybridEscrowPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalUSD: number;
  currency: Currency;
  buyerInfo: {
    name: string;
    phone: string;
    address: string;
    customsCode?: string;
  };
  onPaymentSuccess: (newOrder: Order) => void;
}

type TabType = 'onramp' | 'crypto' | 'p2p';
type CryptoNetwork = 'USDT_TRC20' | 'USDT_ERC20' | 'BTC' | 'ETH' | 'SOL';

interface CryptoInfo {
  name: string;
  network: string;
  address: string;
  feeInfo: string;
  recommended?: boolean;
  memo?: string;
}

const CRYPTO_CONFIG: Record<CryptoNetwork, CryptoInfo> = {
  USDT_TRC20: {
    name: 'USDT (Tether)',
    network: 'Tron (TRC-20)',
    address: 'TYx8bKqN7Zp43wXy9mQ2VELA88MasterVault99',
    feeInfo: 'Network fee < $1 · Transfer time < 1 min (Recommended)',
    recommended: true,
  },
  USDT_ERC20: {
    name: 'USDT (Tether)',
    network: 'Ethereum (ERC-20)',
    address: '0x71C8F79B2b3d68747a9e3VELA88MasterVault99',
    feeInfo: 'Ethereum gas fees apply (~$3-8)',
  },
  BTC: {
    name: 'BTC (Bitcoin)',
    network: 'Bitcoin Native',
    address: 'bc1qvela99masterescrowvault88zgk99',
    feeInfo: 'Satoshi network confirmation (~10-30 min)',
  },
  ETH: {
    name: 'ETH (Ethereum)',
    network: 'Ethereum',
    address: '0x71C8F79B2b3d68747a9e3VELA88MasterVault99',
    feeInfo: 'Smart contract direct deposit',
  },
  SOL: {
    name: 'SOL (Solana)',
    network: 'Solana',
    address: 'VELA99VaultSolanaNetwork88MasterEscrow111',
    feeInfo: 'Ultra-fast sub-second confirmation & lowest fees',
  },
};

export const HybridEscrowPaymentModal: React.FC<HybridEscrowPaymentModalProps> = ({
  isOpen,
  onClose,
  items,
  totalUSD,
  currency,
  buyerInfo,
  onPaymentSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('onramp');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoNetwork>('USDT_TRC20');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15:00 mins countdown

  // On-Ramp Card State
  const [fiatCurrency, setFiatCurrency] = useState<'KRW' | 'USD' | 'EUR'>('USD');
  const [onrampProvider, setOnrampProvider] = useState<'moonpay' | 'transak'>('moonpay');
  const [onrampStep, setOnrampStep] = useState<number>(0);
  const [isProcessingOnramp, setIsProcessingOnramp] = useState(false);

  // Direct Crypto State
  const [txHashInput, setTxHashInput] = useState('');
  const [isVerifyingCrypto, setIsVerifyingCrypto] = useState(false);
  const [cryptoSuccess, setCryptoSuccess] = useState(false);

  // P2P FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // 15-minute expiration countdown
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCrypto = CRYPTO_CONFIG[selectedCrypto];
  const krwEstimated = Math.round(totalUSD * 1380);
  const eurEstimated = Math.round(totalUSD * 0.92);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentCrypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCompletedOrder = (method: 'ONRAMP_CARD' | 'CRYPTO_DIRECT' | 'P2P_GUIDE', tx?: string): Order => {
    return {
      id: `order-${Date.now()}`,
      orderNumber: `SRV-KR-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...items],
      totalUSD: totalUSD,
      status: 'QC_READY',
      createdAt: 'Just now',
      shippingOption: 'TRIANGLE_AIR_SAFE',
      buyerName: buyerInfo.name || 'John Doe',
      buyerPhone: buyerInfo.phone || '+1-555-0199',
      shippingAddress: buyerInfo.address || '123 Luxury Ave, Suite 400',
      paymentMethod: method,
      escrowStatus: 'LOCKED_IN_ESCROW',
      txHash: tx || `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      qcPhotos: [
        {
          id: `qco-${Date.now()}-1`,
          title: 'Initial Batch Inspection & Symmetry Check',
          description: 'Macro inspection photo uploaded directly from the workshop inspection bench',
          imageUrl: items[0]?.product.images[0] || qcWorkbenchImg,
          measurements: 'Calibrated deviation < 0.2mm - Master Grade Passed',
        },
        {
          id: `qco-${Date.now()}-2`,
          title: 'Microscope Stamp & Stitch Calibration',
          description: 'Microscopic engraving depth and stitch count confirmation',
          imageUrl: qcWorkbenchImg,
          measurements: 'Stamp depth 0.14mm - 1:1 Specification',
        },
      ],
      trackingNumber: 'PENDING_BUYER_QC_APPROVAL',
    };
  };

  // Handle On-Ramp Simulation Flow
  const handleStartOnrampPayment = () => {
    setIsProcessingOnramp(true);
    setOnrampStep(1);

    setTimeout(() => {
      setOnrampStep(2);
      setTimeout(() => {
        setOnrampStep(3);
        setTimeout(() => {
          setOnrampStep(4);
          setIsProcessingOnramp(false);
          const order = generateCompletedOrder('ONRAMP_CARD');
          onPaymentSuccess(order);
          onClose();
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Handle Direct Crypto Confirmation
  const handleVerifyCryptoDeposit = () => {
    setIsVerifyingCrypto(true);
    setTimeout(() => {
      setIsVerifyingCrypto(false);
      setCryptoSuccess(true);
      setTimeout(() => {
        const order = generateCompletedOrder('CRYPTO_DIRECT', txHashInput || undefined);
        onPaymentSuccess(order);
        onClose();
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141418] border border-[#26262E] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col text-[#A0A0AB]">
        
        {/* ========================================================
            HEADER: VELA Emblem, Title & Close Button
           ======================================================== */}
        <div className="px-5 py-4 bg-[#181820] border-b border-[#26262E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black/60 border border-[#D4AF37] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.4)]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                  Hybrid On-Ramp & Crypto Smart Escrow
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-[#E0C368]">
                  Secure Escrow
                </span>
              </div>
              <p className="text-[11px] text-[#737380]">
                100% Anonymous Security · Live Dispute Protection · Zero Gateway Freezing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-[#222228] text-[#A0A0AB] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            SCROLLABLE CONTENT BODY
           ======================================================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-none text-left">
          
          {/* ========================================================
              1. Trust & Security Banner
             ======================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1A1A22] via-[#14141A] to-[#121216] border border-[#D4AF37]/40 shadow-xl space-y-3.5 relative overflow-hidden">
            {/* Background luxury glow */}
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-wider block font-mono">
                  VELA DECENTRALIZED SMART ESCROW SYSTEM
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  Why Crypto & On-Ramp Smart Escrow?
                </h4>
              </div>
              <span className="text-[10px] font-bold text-[#E0C368] bg-black/60 px-2.5 py-1 rounded-full border border-[#D4AF37]/40 shrink-0">
                100% Anti-Scam Shield
              </span>
            </div>

            <p className="text-xs text-[#A0A0AB] leading-relaxed">
              Eliminates overseas credit card payment blocks, billing statement disclosure, and upfront scam risks by locking your payment in the decentralized smart contract until you inspect and approve high-res physical macro QC photos.
            </p>

            {/* 3 Core Security Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {/* Pillar 1: Absolute Anonymity */}
              <div className="p-3 bg-black/50 border border-[#26262E] rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Absolute Anonymity</span>
                </div>
                <p className="text-[10px] text-[#737380] leading-snug">
                  100% private. No merchant or luxury item names appear on your bank or card statements.
                </p>
              </div>

              {/* Pillar 2: Zero Freezing Risk */}
              <div className="p-3 bg-black/50 border border-[#26262E] rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Zero Freezing Risk</span>
                </div>
                <p className="text-[10px] text-[#737380] leading-snug">
                  No payment processor rejections or frozen accounts. 24/7 seamless global transactions.
                </p>
              </div>

              {/* Pillar 3: 24/7 Smart Escrow */}
              <div className="p-3 bg-black/50 border border-[#26262E] rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>24/7 Smart Escrow</span>
                </div>
                <p className="text-[10px] text-[#737380] leading-snug">
                  Funds are held in escrow and never released to the atelier until you approve macro QC photos.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              ORDER SUMMARY CARD
             ======================================================== */}
          <div className="p-3.5 bg-[#18181F] rounded-2xl border border-[#26262E] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#737380] uppercase tracking-wider block font-semibold">
                Total Escrow Deposit ({items.length} items)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {totalUSD.toFixed(2)} USDT
                </span>
                <span className="text-xs text-[#A0A0AB]">
                  (approx. {formatPrice(totalUSD, currency)})
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#737380] block font-mono">Payment Window</span>
              <div className="flex items-center gap-1 text-[#E0C368] font-mono font-bold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              2. 3 PAYMENT OPTIONS TABS
             ======================================================== */}
          <div className="space-y-4">
            <div className="flex p-1 bg-black/60 rounded-2xl border border-[#26262E] text-xs font-bold">
              <button
                onClick={() => setActiveTab('onramp')}
                className={`flex-1 py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'onramp'
                    ? 'btn-gold-gradient text-[#0D0D0F] shadow-lg'
                    : 'text-[#A0A0AB] hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Card & Apple Pay</span>
              </button>

              <button
                onClick={() => setActiveTab('crypto')}
                className={`flex-1 py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'crypto'
                    ? 'btn-gold-gradient text-[#0D0D0F] shadow-lg'
                    : 'text-[#A0A0AB] hover:text-white'
                }`}
              >
                <Wallet className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Direct Crypto</span>
              </button>

              <button
                onClick={() => setActiveTab('p2p')}
                className={`flex-1 py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'p2p'
                    ? 'btn-gold-gradient text-[#0D0D0F] shadow-lg'
                    : 'text-[#A0A0AB] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">P2P Bank Guide</span>
              </button>
            </div>

            {/* ========================================================
                OPTION A: [Card & Apple Pay On-Ramp Instant Buy]
               ======================================================== */}
            {activeTab === 'onramp' && (
              <div className="p-4 sm:p-5 bg-[#18181F] rounded-2xl border border-[#26262E] space-y-4 animate-fade-in">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      <span>Instant Purchase via Card & Apple Pay (Auto USDT Swap)</span>
                    </h5>
                    <p className="text-[11px] text-[#737380] mt-0.5">
                      No crypto required. Pay with your normal credit card; funds are instantly converted to USDT and deposited into the VELA smart escrow vault.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#E0C368] shrink-0 border border-[#D4AF37]/40">
                    Recommended
                  </span>
                </div>

                {/* Flow Diagram */}
                <div className="p-3 bg-black/60 rounded-xl border border-[#222228] flex items-center justify-between text-[10px] text-center">
                  <div className="flex-1 space-y-1">
                    <span className="w-6 h-6 mx-auto rounded-full bg-[#222228] flex items-center justify-center text-white">💳</span>
                    <p className="text-white font-semibold">Credit Card Payment</p>
                    <p className="text-[#737380]">Standard Fiat Charge</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <div className="flex-1 space-y-1">
                    <span className="w-6 h-6 mx-auto rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">⚡</span>
                    <p className="text-[#E0C368] font-semibold">MoonPay Instant Swap</p>
                    <p className="text-[#737380]">Auto USDT Conversion</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <div className="flex-1 space-y-1">
                    <span className="w-6 h-6 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">🔒</span>
                    <p className="text-emerald-400 font-semibold">Smart Escrow Vault</p>
                    <p className="text-[#737380]">Held Until QC Approval</p>
                  </div>
                </div>

                {/* Currency Selection & Calculated Amount */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-[#A0A0AB] block mb-1">
                      Billing Currency
                    </label>
                    <select
                      value={fiatCurrency}
                      onChange={(e) => setFiatCurrency(e.target.value as any)}
                      className="w-full px-3 py-2.5 bg-black/60 border border-[#26262E] rounded-xl text-white font-bold focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="USD">USD - US Dollar ($)</option>
                      <option value="EUR">EUR - Euro (€)</option>
                      <option value="KRW">KRW - Korean Won (₩)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#A0A0AB] block mb-1">
                      Estimated Charge
                    </label>
                    <div className="px-3 py-2.5 bg-black/60 border border-[#26262E] rounded-xl text-white font-mono font-bold flex items-center justify-between">
                      <span>
                        {fiatCurrency === 'KRW'
                          ? `₩${krwEstimated.toLocaleString()}`
                          : fiatCurrency === 'EUR'
                          ? `€${eurEstimated}`
                          : `$${totalUSD.toFixed(2)}`}
                      </span>
                      <span className="text-[10px] text-[#D4AF37]">
                        = {totalUSD.toFixed(2)} USDT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Supported Payment Logos & Partner Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#222228] text-[11px]">
                  <div className="flex items-center gap-2 text-[#737380]">
                    <span>Accepted:</span>
                    <span className="font-semibold text-white">VISA</span>
                    <span>·</span>
                    <span className="font-semibold text-white">Mastercard</span>
                    <span>·</span>
                    <span className="font-semibold text-white">Apple Pay</span>
                    <span>·</span>
                    <span className="font-semibold text-white">Google Pay</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#737380]">On-Ramp Engine:</span>
                    <button
                      onClick={() => setOnrampProvider('moonpay')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        onrampProvider === 'moonpay'
                          ? 'bg-[#D4AF37] text-black font-extrabold'
                          : 'bg-[#222228] text-[#A0A0AB]'
                      }`}
                    >
                      MoonPay
                    </button>
                    <button
                      onClick={() => setOnrampProvider('transak')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        onrampProvider === 'transak'
                          ? 'bg-[#D4AF37] text-black font-extrabold'
                          : 'bg-[#222228] text-[#A0A0AB]'
                      }`}
                    >
                      Transak
                    </button>
                  </div>
                </div>

                {/* Instant Card On-ramp Trigger Button */}
                <button
                  onClick={handleStartOnrampPayment}
                  disabled={isProcessingOnramp}
                  className="w-full py-3.5 px-4 rounded-xl btn-gold-gradient text-xs sm:text-sm font-extrabold text-[#0D0D0F] flex items-center justify-center gap-2 shadow-lg active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  {isProcessingOnramp ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#0D0D0F]" />
                      <span>
                        {onrampStep === 1
                          ? 'Step 1: 3D Secure verification in progress...'
                          : onrampStep === 2
                          ? 'Step 2: MoonPay instant USDT swap in progress...'
                          : 'Step 3: Depositing to VELA Smart Escrow Vault...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-[#0D0D0F]" />
                      <span>
                        Pay with Card & Secure Escrow (
                        {fiatCurrency === 'KRW'
                          ? `₩${krwEstimated.toLocaleString()}`
                          : `$${totalUSD.toFixed(2)}`}
                        )
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ========================================================
                OPTION B: [Direct Crypto Transfer from Wallet]
               ======================================================== */}
            {activeTab === 'crypto' && (
              <div className="p-4 sm:p-5 bg-[#18181F] rounded-2xl border border-[#26262E] space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-[#D4AF37]" />
                    <span>Direct Crypto Transfer from Your Wallet</span>
                  </h5>
                  <span className="text-[10px] font-mono text-[#D4AF37] font-semibold">
                    Zero Deposit Fee
                  </span>
                </div>

                {/* Coin & Network Selection */}
                <div>
                  <label className="text-[11px] font-semibold text-[#A0A0AB] block mb-1.5">
                    Select Coin & Network
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(Object.keys(CRYPTO_CONFIG) as CryptoNetwork[]).map((key) => {
                      const cfg = CRYPTO_CONFIG[key];
                      const isSelected = selectedCrypto === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedCrypto(key)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                              : 'bg-black/40 border-[#26262E] text-[#A0A0AB] hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{cfg.name}</span>
                            {cfg.recommended && (
                              <span className="text-[9px] font-bold text-[#D4AF37] bg-black/60 px-1.5 py-0.5 rounded">
                                BEST
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#737380] font-mono mt-0.5">
                            {cfg.network}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-[#E0C368] mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 shrink-0" />
                    <span>{currentCrypto.feeInfo}</span>
                  </p>
                </div>

                {/* QR Code and Wallet Address Display */}
                <div className="p-4 bg-black/60 rounded-2xl border border-[#222228] flex flex-col sm:flex-row items-center gap-4">
                  {/* Dynamic Scalable SVG QR Code */}
                  <div className="relative p-2.5 bg-white rounded-xl shadow-lg shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-28 h-28"
                      shapeRendering="crispEdges"
                    >
                      {/* Stylized QR Code Pattern */}
                      <rect width="100" height="100" fill="#ffffff" />
                      {/* Corner 1 */}
                      <rect x="5" y="5" width="28" height="28" fill="#000000" />
                      <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                      <rect x="13" y="13" width="12" height="12" fill="#000000" />
                      {/* Corner 2 */}
                      <rect x="67" y="5" width="28" height="28" fill="#000000" />
                      <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                      <rect x="75" y="13" width="12" height="12" fill="#000000" />
                      {/* Corner 3 */}
                      <rect x="5" y="67" width="28" height="28" fill="#000000" />
                      <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                      <rect x="13" y="75" width="12" height="12" fill="#000000" />
                      {/* Data Pixels */}
                      <rect x="40" y="8" width="8" height="8" fill="#000000" />
                      <rect x="52" y="8" width="6" height="6" fill="#000000" />
                      <rect x="42" y="24" width="10" height="6" fill="#000000" />
                      <rect x="56" y="22" width="6" height="8" fill="#000000" />
                      <rect x="8" y="42" width="12" height="6" fill="#000000" />
                      <rect x="24" y="40" width="8" height="8" fill="#000000" />
                      <rect x="38" y="38" width="24" height="24" fill="#000000" />
                      <rect x="68" y="40" width="12" height="8" fill="#000000" />
                      <rect x="84" y="42" width="8" height="10" fill="#000000" />
                      <rect x="40" y="70" width="8" height="12" fill="#000000" />
                      <rect x="54" y="68" width="10" height="6" fill="#000000" />
                      <rect x="72" y="72" width="14" height="14" fill="#000000" />
                      {/* Center Gold VELA V Logo */}
                      <circle cx="50" cy="50" r="10" fill="#D4AF37" />
                      <text
                        x="50"
                        y="54"
                        textAnchor="middle"
                        fill="#000000"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        V
                      </text>
                    </svg>
                  </div>

                  {/* Address Text & Copy */}
                  <div className="flex-1 w-full space-y-2 text-left min-w-0">
                    <div>
                      <span className="text-[10px] text-[#737380] uppercase tracking-wider block font-semibold">
                        VELA Multisig Smart Escrow Deposit Address
                      </span>
                      <p className="text-xs font-mono font-bold text-white break-all bg-[#111115] p-2.5 rounded-xl border border-[#222228]">
                        {currentCrypto.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#A0A0AB]">
                        Exact Amount: <strong className="text-white font-mono">{totalUSD.toFixed(2)} USDT</strong>
                      </span>
                      <button
                        onClick={handleCopyAddress}
                        className="px-3.5 py-1.5 rounded-lg btn-gold-outline text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>1-Click Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* TX Hash Input or Verify Deposit */}
                <div className="space-y-2 pt-1 border-t border-[#222228]">
                  <label className="text-[11px] font-semibold text-[#A0A0AB] block">
                    Enter Transaction Hash (TXID) or Instant Verification
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={txHashInput}
                      onChange={(e) => setTxHashInput(e.target.value)}
                      placeholder="TXID Hash (or leave empty for auto blockchain scan)"
                      className="flex-1 px-3.5 py-2.5 bg-black/60 border border-[#26262E] rounded-xl text-xs text-white placeholder-[#737380] font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      onClick={handleVerifyCryptoDeposit}
                      disabled={isVerifyingCrypto || cryptoSuccess}
                      className="px-4 py-2.5 btn-gold-gradient rounded-xl text-xs font-extrabold text-[#0D0D0F] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      {isVerifyingCrypto ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Scanning blocks...</span>
                        </>
                      ) : cryptoSuccess ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Escrow Locked!</span>
                        </>
                      ) : (
                        <span>Verify & Lock Escrow</span>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-[#737380]">
                    · Automatically locked into VELA Smart Escrow upon 1 blockchain network confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================
                OPTION C: [P2P Local Currency 1-Minute Guide]
               ======================================================== */}
            {activeTab === 'p2p' && (
              <div className="p-4 sm:p-5 bg-[#18181F] rounded-2xl border border-[#26262E] space-y-4 animate-fade-in">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                      <span>Zero Fees! Binance & KuCoin P2P Bank Transfer Guide</span>
                    </h5>
                    <p className="text-[11px] text-[#737380] mt-0.5">
                      Buy USDT with zero fees via domestic bank transfer through Binance or KuCoin P2P, then send directly to VELA Escrow.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/40">
                    0% Fee
                  </span>
                </div>

                {/* 3 Step Visual Guide */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-black/60 rounded-xl border border-[#26262E] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-extrabold text-[10px] flex items-center justify-center">
                        1
                      </span>
                      <span className="font-bold text-white text-xs">P2P Trading Tab</span>
                    </div>
                    <p className="text-[11px] text-[#A0A0AB] leading-snug">
                      Open Binance or KuCoin app and select the [P2P Trading] tab from the main menu.
                    </p>
                  </div>

                  <div className="p-3 bg-black/60 rounded-xl border border-[#26262E] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-extrabold text-[10px] flex items-center justify-center">
                        2
                      </span>
                      <span className="font-bold text-white text-xs">Local Bank Transfer</span>
                    </div>
                    <p className="text-[11px] text-[#A0A0AB] leading-snug">
                      Select your local currency, buy USDT from verified merchants (98%+ rating), and transfer.
                    </p>
                  </div>

                  <div className="p-3 bg-black/60 rounded-xl border border-[#26262E] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black font-extrabold text-[10px] flex items-center justify-center">
                        3
                      </span>
                      <span className="font-bold text-white text-xs">Send to VELA Escrow</span>
                    </div>
                    <p className="text-[11px] text-[#A0A0AB] leading-snug">
                      Withdraw the received USDT to the [VELA TRC-20 Address] in Option B to finalize escrow.
                    </p>
                  </div>
                </div>

                {/* P2P FAQ Accordions */}
                <div className="space-y-2 pt-2 border-t border-[#222228]">
                  <span className="text-[11px] font-bold text-white block">
                    P2P Frequently Asked Questions (FAQ)
                  </span>

                  {[
                    {
                      q: 'Q. Does luxury goods purchase show up on my bank statement?',
                      a: 'Not at all. The transaction is a standard peer-to-peer domestic bank transfer. No merchant or luxury item records exist.',
                    },
                    {
                      q: 'Q. What if the P2P seller does not release crypto after I send money?',
                      a: 'Zero risk. The exchange holds the seller’s crypto in security escrow before trade begins, releasing it immediately upon payment proof.',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-black/40 border border-[#26262E] rounded-xl text-xs"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left font-semibold text-white cursor-pointer"
                      >
                        <span>{item.q}</span>
                        {expandedFaq === idx ? (
                          <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#737380]" />
                        )}
                      </button>
                      {expandedFaq === idx && (
                        <p className="mt-2 text-[11px] text-[#A0A0AB] leading-relaxed pl-2 border-l-2 border-[#D4AF37]">
                          {item.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('crypto')}
                    className="flex-1 py-3 px-4 rounded-xl btn-gold-gradient text-xs font-bold text-[#0D0D0F] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <span>USDT Ready! View Escrow Wallet Address</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================
              BOTTOM ESCROW GUARANTEE PROMISE
             ======================================================== */}
          <div className="p-3.5 bg-black/60 rounded-2xl border border-[#26262E] flex items-center gap-3 text-xs">
            <FileCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div className="space-y-0.5">
              <span className="font-bold text-white text-[11px] block">
                100% Money-Back Escrow Guarantee Policy
              </span>
              <p className="text-[10px] text-[#737380] leading-snug">
                If caliper measurements, microscopic engravings, or timegrapher readings uploaded to the QC desk are not satisfactory, payment is 100% refunded immediately.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
