/* ================================================================== */
/*  API ↔ Frontend data mappers                                       */
/*                                                                    */
/*  The API returns `ApiProduct` with PascalCase field names and a    */
/*  different shape than the frontend `Product` type. These helpers   */
/*  convert between the two so the rest of the app stays unchanged.   */
/* ================================================================== */

import type { ApiProduct } from "@/api/types";
import type { Product } from "@/data/products";

/**
 * Convert an API product into the frontend `Product` shape
 * used by ProductCard, ProductDetail, and all contexts.
 */
export const mapApiProductToProduct = (p: ApiProduct): Product => {
  const primaryImage = p.productImages?.find((img) => img.isPrimary);
  const imageUrl = primaryImage?.imageUrl ?? p.productImages?.[0]?.imageUrl ?? "/placeholder.svg";

  return {
    id: p.id,
    name: p.productName,
    price: p.price,
    image: imageUrl,
    category: p.categoryName ?? "Uncategorized",
    rating: 0,       // API doesn't return rating — default to 0
    reviews: 0,       // API doesn't return review count
    badge: p.isApproved ? undefined : "Pending",
  };
};

/**
 * Get all image URLs from an API product (for gallery views).
 */
export const getProductImageUrls = (p: ApiProduct): string[] => {
  if (!p.productImages || p.productImages.length === 0) {
    return ["/placeholder.svg"];
  }
  return p.productImages.map((img) => img.imageUrl);
};
