import React, { useMemo, useState, useEffect } from 'react';
import { Product, Seller, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface XiaohongshuMasonryFeedProps {
  products: Product[];
  sellers: Seller[];
  currency: Currency;
  isInsidePhoneFrame?: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onToggleLike?: (productId: string, e: React.MouseEvent) => void;
  onOpenChat: (sellerId: string, productId?: string) => void;
  onViewSeller: (sellerId: string) => void;
}

export const XiaohongshuMasonryFeed: React.FC<XiaohongshuMasonryFeedProps> = ({
  products,
  sellers,
  currency,
  isInsidePhoneFrame = false,
  onSelectProduct,
  onAddToCart,
  onToggleLike,
  onOpenChat,
  onViewSeller,
}) => {
  // Window width tracking for responsive column count
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine number of columns:
  // On mobile phone (< 768px) and inside phone simulator: ALWAYS 2 columns like native Xiaohongshu!
  const columnCount = useMemo(() => {
    if (isInsidePhoneFrame) return 2;
    if (windowWidth < 768) return 2;
    if (windowWidth < 1024) return 3;
    return 4;
  }, [isInsidePhoneFrame, windowWidth]);

  // Distribute cards into independent columns using height-weighted greedy balancing.
  // This guarantees that:
  // 1. Columns stay balanced in height (no lopsided feeds)
  // 2. Large video cards and compact photo cards stagger naturally like Xiaohongshu
  // 3. ZERO row-stretching or awkward gaps!
  const columns = useMemo(() => {
    const cols: Product[][] = Array.from({ length: columnCount }, () => []);
    const heights = Array(columnCount).fill(0);

    products.forEach((product) => {
      // Find column with minimum height
      let minCol = 0;
      for (let c = 1; c < columnCount; c++) {
        if (heights[c] < heights[minCol]) {
          minCol = c;
        }
      }

      cols[minCol].push(product);

      // Height weights:
      // Video is noticeably larger and taller (~340 weight)
      // Square photo: ~225 weight
      // Portrait photo: ~260 weight
      const weight = product.isVideo
        ? 340
        : product.aspectRatio === 'aspect-[1/1]'
        ? 225
        : 260;

      heights[minCol] += weight;
    });

    return cols;
  }, [products, columnCount]);

  return (
    <div
      className={`grid gap-2 sm:gap-3 md:gap-4 items-start w-full ${
        columnCount === 2
          ? 'grid-cols-2'
          : columnCount === 3
          ? 'grid-cols-3'
          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}
    >
      {columns.map((colProducts, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-2 sm:gap-3 md:gap-4 min-w-0 w-full">
          {colProducts.map((product) => {
            const seller = sellers.find((s) => s.id === product.sellerId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                sellerAvatar={seller?.avatar}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleLike={onToggleLike}
                onOpenChat={(sId, pId, e) => {
                  e.stopPropagation();
                  onOpenChat(sId, pId);
                }}
                onViewSeller={(sId, e) => {
                  e.stopPropagation();
                  onViewSeller(sId);
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
