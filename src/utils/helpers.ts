import { Currency, FilterPreset } from '../types';

export const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1,
  KRW: 1380,
  CNY: 7.25,
  EUR: 0.92,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  KRW: '₩',
  CNY: '¥',
  EUR: '€',
};

export function formatPrice(usdAmount: number, currency: Currency): string {
  const rate = CURRENCY_RATES[currency] || 1;
  const converted = usdAmount * rate;

  if (currency === 'KRW') {
    return `₩${Math.round(converted).toLocaleString()}`;
  } else if (currency === 'CNY') {
    return `¥${Math.round(converted).toLocaleString()}`;
  } else if (currency === 'EUR') {
    return `€${converted.toFixed(0).toLocaleString()}`;
  } else {
    return `$${Math.round(converted).toLocaleString()}`;
  }
}

// Simulated high-accuracy translation dictionary / engine for direct buyer-seller dialogue
export function simulateTranslation(text: string, fromLang: 'ko' | 'zh' | 'en', toLang: 'ko' | 'zh' | 'en'): string {
  const trimmed = text.trim();

  // Common phrases mapping for rapid response
  const phrases: Record<string, { ko: string; zh: string; en: string }> = {
    'qc': {
      ko: 'Please provide physical QC inspection photos and measurements.',
      zh: '请提供实物QC检测实拍图及测量数据。',
      en: 'Please provide physical QC inspection photos and measurements.',
    },
    'shipping': {
      ko: 'Is triangle transit with customs clearance guarantee supported?',
      zh: '支持三角转运安全保关发货吗？',
      en: 'Is triangle transit with customs clearance guarantee supported?',
    },
    'stock': {
      ko: 'Is there immediate ready-to-ship stock at the workshop?',
      zh: '请问工坊目前有现货可以直接安排质检发货吗？',
      en: 'Is there immediate ready-to-ship stock at the workshop?',
    },
    'leather': {
      ko: 'Is this using the original specification imported leather?',
      zh: '请问使用的是否为原厂同等规格的进口皮料？',
      en: 'Is this using the original specification imported leather?',
    },
  };

  for (const key of Object.keys(phrases)) {
    if (trimmed.toLowerCase().includes(key)) {
      return phrases[key][toLang] || phrases[key].en;
    }
  }

  // General simulated translation
  if (fromLang === 'en' && toLang === 'zh') {
    if (trimmed.includes('when') || trimmed.includes('shipping') || trimmed.includes('delivery')) {
      return `【自动翻译】请问具体的发货排期和QC质检时间大概是几天？（Original: ${trimmed}）`;
    }
    if (trimmed.includes('size') || trimmed.includes('measurement')) {
      return `【自动翻译】买家咨询关于尺码与测量规格（Original: ${trimmed}）`;
    }
    return `【Translation Engine】${trimmed} (Translated to Business Chinese)`;
  } else if (toLang === 'en' || toLang === 'ko') {
    if (trimmed.includes('QC') || trimmed.includes('质检')) {
      return `[Seller Reply] Hello! Full inspection at our atelier is complete, and high-resolution QC photos have been uploaded for your review.`;
    }
    if (trimmed.includes('保关') || trimmed.includes('通关')) {
      return `[Seller Reply] Yes, this is shipped via our 100% triangle transit customs guarantee route. In case of any customs issue, a free replacement is dispatched immediately.`;
    }
    if (trimmed.includes('现货') || trimmed.includes('库')) {
      return `[Seller Reply] Currently in stock in this specification. A detailed QC report can be issued within 24 hours of order placement.`;
    }
    return `[Seller Reply] ${trimmed} (Will process promptly for you)`;
  }

  return `[Translated] ${trimmed}`;
}

export async function safeShare(shareData: { title: string; url: string; text?: string }): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User canceled the share sheet cleanly; ignore error
        return false;
      }
      // On other share failure, fallback to clipboard
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareData.url);
          return true;
        }
      } catch {
        return false;
      }
      return false;
    }
  }

  // Fallback to clipboard if Web Share API is not supported
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function getFilterStyle(preset?: FilterPreset, intensity: number = 80): React.CSSProperties {
  if (!preset || preset === 'natural' || intensity === 0) return {};
  const factor = intensity / 100;
  switch (preset) {
    case 'luxury_warm':
      return {
        filter: `sepia(${0.3 * factor}) saturate(${1 + 0.35 * factor}) contrast(${1 + 0.12 * factor}) brightness(${1 + 0.04 * factor})`,
      };
    case 'vintage_film':
      return {
        filter: `sepia(${0.45 * factor}) contrast(${1 + 0.18 * factor}) brightness(${0.96}) saturate(${0.85 + 0.15 * factor})`,
      };
    case 'clean_mono':
      return {
        filter: `saturate(${1 - 0.75 * factor}) contrast(${1 + 0.28 * factor}) brightness(${1.03})`,
      };
    case 'bw_master':
      return {
        filter: `grayscale(${1 * factor}) contrast(${1 + 0.4 * factor}) brightness(${0.96})`,
      };
    default:
      return {};
  }
}
