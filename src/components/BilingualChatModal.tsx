import React, { useState, useEffect, useRef } from 'react';
import { Seller, Product, ChatMessage } from '../types';
import { simulateTranslation } from '../utils/helpers';
import { X, Send, Globe, Sparkles, Package } from 'lucide-react';

interface BilingualChatModalProps {
  seller: Seller;
  product?: Product;
  onClose: () => void;
}

export const BilingualChatModal: React.FC<BilingualChatModalProps> = ({
  seller,
  product,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'seller',
      originalText: `您好！我是${seller.chineseName}的工坊负责人。我们全流程提供出货前高精度QC实拍，支持安全保关发货。请问有什么可以协助您的？`,
      translatedText: `Hello! I am the lead artisan at ${seller.name}. We provide high-resolution physical micro-QC inspection photos before shipment and ship via guaranteed triangle customs routes. How may I assist you today?`,
      originalLang: 'zh',
      targetLang: 'en',
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const buyerEnglish = text.trim();
    const sellerChinese = simulateTranslation(buyerEnglish, 'en', 'zh');

    const newBuyerMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      originalText: buyerEnglish,
      translatedText: sellerChinese,
      originalLang: 'en',
      targetLang: 'zh',
      timestamp: 'Just now',
      productId: product?.id,
    };

    setMessages((prev) => [...prev, newBuyerMessage]);
    if (!textToSend) setInputText('');
    setIsTranslating(true);

    // Simulate Chinese artisan response after 1.2s
    setTimeout(() => {
      let replyZh = '好的收到！工坊师傅已经为您核对规格，下单后24小时内必定上传微距QC图给您确认，请放心！';
      let replyEn = 'Understood! Our master watchmaker has verified the specification. High-resolution micro-QC photos will be uploaded within 24 hours of order confirmation. Rest assured!';

      const lower = buyerEnglish.toLowerCase();
      if (lower.includes('customs') || lower.includes('shipping') || lower.includes('delivery')) {
        replyZh = '请放心，我们走的是香港/新加坡三角转运特快包通关路线，若有任何海关查扣问题，本平台由工坊全额免费补发新批次！';
        replyEn = 'Rest assured, all items ship via our Hong Kong / Singapore triangle transit customs guarantee route. In case of any customs delay or seizure, we issue a 100% free expedited replacement.';
      } else if (lower.includes('leather') || lower.includes('caliber') || lower.includes('movement')) {
        replyZh = '我们的皮料均与欧洲原厂同批次采购，五金也经过微米级真金电镀测试，绝不拿低端跑量货糊弄。质检台随时可以给您看实物皮质纹路。';
        replyEn = 'Our leathers are sourced from identical European tannery batches and all hardware undergoes micron-spec vacuum gold plating. We are happy to verify leather grain live on the QC bench.';
      }

      const sellerReplyMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'seller',
        originalText: replyZh,
        translatedText: replyEn,
        originalLang: 'zh',
        targetLang: 'en',
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, sellerReplyMessage]);
      setIsTranslating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-[#141418] border border-[#26262E] rounded-3xl w-full max-w-2xl h-[650px] shadow-2xl flex flex-col overflow-hidden text-left">
        {/* Direct Message Header */}
        <div className="px-5 py-4 bg-[#181820] border-b border-[#222228] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">{seller.name}</span>
                <span className="text-[11px] bg-black/60 border border-[#D4AF37]/50 text-[#E0C368] font-semibold px-2 py-0.2 rounded-full">
                  Verified Atelier
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>Live 2-Way English ↔ Chinese AI Translation Active</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A0A0AB] hover:text-white rounded-full hover:bg-[#222228] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Inquired Context Banner if present */}
        {product && (
          <div className="px-5 py-2.5 bg-[#18181F] border-b border-[#26262E] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <Package className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-[#737380]">Inquiring Item:</span>
              <span className="font-bold text-white truncate">{product.title}</span>
            </div>
            <span className="text-[#E0C368] font-mono text-[11px] shrink-0 ml-2">
              Batch #{product.specifications.factoryBatch}
            </span>
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0D0D0F] scrollbar-none">
          {messages.map((msg) => {
            const isBuyer = msg.sender === 'buyer';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 shadow-md ${
                    isBuyer
                      ? 'btn-gold-gradient text-[#0D0D0F] rounded-br-xs'
                      : 'bg-[#181820] text-white border border-[#26262E] rounded-bl-xs'
                  }`}
                >
                  {/* Primary text */}
                  <p className="text-xs leading-relaxed font-medium">
                    {isBuyer ? msg.originalText : msg.translatedText}
                  </p>

                  {/* Translated counter-part */}
                  <div
                    className={`pt-2 border-t text-[11px] flex items-start gap-1.5 ${
                      isBuyer
                        ? 'border-black/20 text-[#0D0D0F]/80'
                        : 'border-[#26262E] text-[#A0A0AB]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      {isBuyer ? (
                        <>Chinese Delivery: {msg.translatedText}</>
                      ) : (
                        <>Original: {msg.originalText}</>
                      )}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#737380] px-1 pt-1">{msg.timestamp}</span>
              </div>
            );
          })}

          {isTranslating && (
            <div className="flex items-center gap-2 text-xs text-[#A0A0AB] bg-[#181820] border border-[#26262E] p-2.5 rounded-full w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
              <span>Transmitting translation to workshop master...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Inquiry Prompts */}
        <div className="p-2.5 bg-[#141418] border-t border-[#222228] overflow-x-auto flex gap-2 scrollbar-none">
          <button
            onClick={() => handleSendMessage('When will physical QC photos and caliper measurements be provided?')}
            className="text-[11px] px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] border border-[#26262E] rounded-full shrink-0 transition-colors cursor-pointer"
          >
            📷 When is QC scheduled?
          </button>
          <button
            onClick={() => handleSendMessage('Is 100% free reshipment covered if triangle transit customs delays happen?')}
            className="text-[11px] px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] border border-[#26262E] rounded-full shrink-0 transition-colors cursor-pointer"
          >
            🛡️ 100% Customs guarantee?
          </button>
          <button
            onClick={() => handleSendMessage('Is there ready-to-ship stock in this specification right now?')}
            className="text-[11px] px-3 py-1 bg-[#181820] hover:bg-[#202028] text-[#A0A0AB] hover:text-[#D4AF37] border border-[#26262E] rounded-full shrink-0 transition-colors cursor-pointer"
          >
            📦 Ready stock status?
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#181820] border-t border-[#222228]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inquire in English, auto-translated to business Chinese..."
              className="flex-1 text-xs px-4 py-2.5 bg-[#141418] text-white placeholder-[#737380] rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4AF37] border border-[#26262E]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 btn-gold-gradient disabled:opacity-40 text-[#0D0D0F] rounded-full transition-colors cursor-pointer shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-[#737380] mt-2 px-2">
            <span>· Direct offline payments void smart escrow protections.</span>
            <span>· VELA Smart Escrow Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
