import React, { useState } from 'react';
import { CartItem, Currency, Order } from '../types';
import { formatPrice } from '../utils/helpers';
import { X, Trash2, ShieldCheck, Truck, ArrowRight, Lock, Plus, Minus, CreditCard, Wallet } from 'lucide-react';
import { HybridEscrowPaymentModal } from './HybridEscrowPaymentModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderCompleted: (newOrder: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOrderCompleted,
}) => {
  const [buyerName, setBuyerName] = useState('David Kim');
  const [buyerPhone, setBuyerPhone] = useState('+1-415-892-3344');
  const [shippingAddress, setShippingAddress] = useState('152 Teheran-ro, Suite 1400, Gangnam-gu, Seoul');
  const [customsCode, setCustomsCode] = useState('P230004928172');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  const handleOpenPaymentModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (newOrder: Order) => {
    setIsPaymentModalOpen(false);
    onOrderCompleted(newOrder);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in select-none">
        <div className="w-full max-w-md bg-[#141418] border-l border-[#26262E] text-[#A0A0AB] h-full shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#222228] flex items-center justify-between bg-[#181820]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black/60 border border-[#D4AF37] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <h2 className="text-base font-extrabold text-white">Cart & Escrow Checkout</h2>
              <span className="text-xs text-[#E0C368] font-mono font-bold">({items.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A0A0AB] hover:text-white rounded-full hover:bg-[#222228] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
            {items.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#181820] border border-[#26262E] flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#737380]" />
                </div>
                <p className="text-sm text-[#737380] font-medium">Your cart is empty.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold btn-gold-gradient rounded-full cursor-pointer text-[#0D0D0F]"
                >
                  Browse Ateliers
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-[#18181F] border border-[#26262E] rounded-2xl relative group"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded-xl shrink-0 border border-[#222228]"
                    />
                    <div className="flex-1 space-y-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#A0A0AB] font-semibold truncate">
                          {item.product.sellerName}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#737380] hover:text-red-400 p-1 cursor-pointer transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.product.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs pt-1.5">
                        <span className="font-mono font-bold text-white">
                          {formatPrice(item.product.priceUSD * item.quantity, currency)}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-black/60 border border-[#26262E] rounded-full px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="text-xs px-1 text-[#A0A0AB] hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="text-xs px-1 text-[#A0A0AB] hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Escrow Guarantee Notice */}
                <div className="p-3 bg-black/50 border border-[#D4AF37]/30 rounded-2xl flex items-start gap-2.5 text-xs text-left">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">
                      100% VELA Smart Escrow Protection
                    </span>
                    <p className="text-[10px] text-[#A0A0AB] leading-relaxed">
                      Funds are held in decentralized smart escrow upon payment via card or crypto, released to the atelier only after your approval of macro QC photos.
                    </p>
                  </div>
                </div>

                {/* Shipping Details Input Form */}
                <form onSubmit={handleOpenPaymentModal} className="space-y-3 pt-2 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Triangle Transit Shipping Details</span>
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      100% Customs Guaranteed
                    </span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Recipient Full Name"
                      className="w-full text-xs p-3 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="Phone Number (+1 / +82 / +44)"
                      className="w-full text-xs p-3 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Shipping Address (Street, City, Postal Code)"
                      className="w-full text-xs p-3 bg-[#18181F] border border-[#26262E] rounded-xl text-white placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      required
                      value={customsCode}
                      onChange={(e) => setCustomsCode(e.target.value)}
                      placeholder="Customs ID / Tax Reference (Optional)"
                      className="w-full text-xs p-3 bg-[#18181F] border border-[#26262E] rounded-xl text-white font-mono placeholder-[#737380] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Summary & Trigger Button */}
                  <div className="pt-3 border-t border-[#222228] space-y-2">
                    <div className="flex justify-between text-xs text-[#A0A0AB]">
                      <span>Item Subtotal</span>
                      <span className="font-mono text-white">{formatPrice(totalUSD, currency)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#A0A0AB]">
                      <span>Triangle Air Transit Insurance</span>
                      <span className="text-emerald-400 font-bold">Free (Guaranteed)</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-[#222228]">
                      <span>Total Amount</span>
                      <div className="text-right">
                        <span className="text-lg font-mono font-black text-[#D4AF37]">
                          {totalUSD.toFixed(2)} USDT
                        </span>
                        <span className="text-[11px] text-[#A0A0AB] block font-normal">
                          (approx. {formatPrice(totalUSD, currency)})
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 text-xs sm:text-sm font-extrabold btn-gold-gradient rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 text-[#0D0D0F] mt-2"
                    >
                      <Lock className="w-4 h-4 text-[#0D0D0F]" />
                      <span>Proceed to Hybrid Escrow Payment</span>
                      <ArrowRight className="w-4 h-4 text-[#0D0D0F]" />
                    </button>

                    <p className="text-[10px] text-center text-[#737380]">
                      Credit Card (MoonPay) · Crypto (USDT/BTC/ETH) · P2P Bank Transfer Supported
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dedicated Hybrid On-Ramp & Crypto Escrow Payment Modal System */}
      {isPaymentModalOpen && (
        <HybridEscrowPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          items={items}
          totalUSD={totalUSD}
          currency={currency}
          buyerInfo={{
            name: buyerName,
            phone: buyerPhone,
            address: shippingAddress,
            customsCode: customsCode,
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};
