/* ================================================================== */
/*  Product & Category types                                          */
/* ================================================================== */

export interface Product {
  id: number;
  name: string;
  price: number;
  /** Original (pre-discount) price – shown as strikethrough when present */
  originalPrice?: number;
  image: string;
  category: string;
  /** Average user rating (0–5) */
  rating: number;
  /** Total number of reviews */
  reviews: number;
  /** Optional badge label, e.g. "Best Seller", "Trending" */
  badge?: string;
  /** Discount percentage to display (e.g. 38 → "-38%") */
  discount?: number;
}

export interface Category {
  id: number;
  name: string;
  /** Emoji used as a visual icon */
  icon: string;
  /** Approximate number of items in this category */
  count: number;
  image: string;
}

/* ================================================================== */
/*  Banner slide data (for the hero Swiper carousel)                   */
/* ================================================================== */

export interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
  /** Tailwind gradient classes applied to the slide overlay */
  bg: string;
}

/* ================================================================== */
/*  Mega-menu structure                                                */
/* ================================================================== */

export interface MegaMenuEntry {
  subcategories: string[];
  featured: string;
}

/* ================================================================== */
/*  Static data                                                        */
/* ================================================================== */

export const categories: Category[] = [
  { id: 1, name: "Electronics", icon: "📱", count: 1240, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop" },
  { id: 2, name: "Fashion", icon: "👗", count: 890, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop" },
  { id: 3, name: "Home & Living", icon: "🏠", count: 650, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop" },
  { id: 4, name: "Sports", icon: "⚽", count: 430, image: "https://images.unsplash.com/photo-1461896836934-bd45ba71a655?w=300&h=300&fit=crop" },
  { id: 5, name: "Beauty", icon: "💄", count: 780, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop" },
  { id: 6, name: "Books", icon: "📚", count: 320, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop" },
  { id: 7, name: "Toys", icon: "🧸", count: 210, image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop" },
  { id: 8, name: "Grocery", icon: "🛒", count: 560, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop" },
];

export const featuredProducts: Product[] = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", price: 79.99, originalPrice: 129.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", category: "Electronics", rating: 4.8, reviews: 2341, badge: "Best Seller", discount: 38 },
  { id: 2, name: "Premium Cotton Hoodie", price: 49.99, originalPrice: 69.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop", category: "Fashion", rating: 4.6, reviews: 892, badge: "Trending", discount: 29 },
  { id: 3, name: "Smart Watch Ultra", price: 199.99, originalPrice: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", category: "Electronics", rating: 4.9, reviews: 3456, badge: "New", discount: 33 },
  { id: 4, name: "Minimalist Desk Lamp", price: 34.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=400&h=400&fit=crop", category: "Home & Living", rating: 4.5, reviews: 567 },
  { id: 5, name: "Running Shoes Pro", price: 89.99, originalPrice: 119.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", category: "Sports", rating: 4.7, reviews: 1230, discount: 25 },
  { id: 6, name: "Organic Face Serum", price: 29.99, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", category: "Beauty", rating: 4.4, reviews: 789, badge: "Organic" },
  { id: 7, name: "Bluetooth Speaker Mini", price: 39.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", category: "Electronics", rating: 4.3, reviews: 456, discount: 33 },
  { id: 8, name: "Leather Crossbody Bag", price: 65.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", category: "Fashion", rating: 4.6, reviews: 345, badge: "Premium" },
];

/** All products = featured + additional catalog items */
export const allProducts: Product[] = [
  ...featuredProducts,
  { id: 9, name: "Yoga Mat Premium", price: 45.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", category: "Sports", rating: 4.5, reviews: 234 },
  { id: 10, name: "Stainless Steel Water Bottle", price: 24.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", category: "Sports", rating: 4.7, reviews: 1023, badge: "Eco-Friendly" },
  { id: 11, name: "Wireless Charging Pad", price: 19.99, originalPrice: 34.99, image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&h=400&fit=crop", category: "Electronics", rating: 4.2, reviews: 678, discount: 43 },
  { id: 12, name: "Scented Candle Set", price: 28.99, image: "https://images.unsplash.com/photo-1602607666411-aa8f18a85ce6?w=400&h=400&fit=crop", category: "Home & Living", rating: 4.8, reviews: 432 },
  { id: 13, name: "Graphic Novel Collection", price: 42.99, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", category: "Books", rating: 4.9, reviews: 198, badge: "Editor's Pick" },
  { id: 14, name: "Kids Building Blocks Set", price: 32.99, originalPrice: 44.99, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop", category: "Toys", rating: 4.6, reviews: 567, discount: 27 },
  { id: 15, name: "Organic Green Tea", price: 14.99, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop", category: "Grocery", rating: 4.4, reviews: 890 },
  { id: 16, name: "Sunglasses Classic", price: 59.99, originalPrice: 89.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", category: "Fashion", rating: 4.3, reviews: 342, discount: 33 },
];

export const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Summer Collection 2026",
    subtitle: "Up to 60% Off",
    description: "Discover the latest trends in fashion, electronics & more. Limited time offers you don't want to miss.",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
    bg: "from-orange-500 to-orange-700",
  },
  {
    id: 2,
    title: "Tech Deals Festival",
    subtitle: "Save Big on Electronics",
    description: "Premium gadgets at unbeatable prices. Free shipping on orders over $50.",
    cta: "Explore Deals",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop",
    bg: "from-orange-600 to-orange-900",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Fresh Styles Daily",
    description: "Be the first to get your hands on our newest products, curated just for you.",
    cta: "Discover More",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    bg: "from-orange-400 to-orange-600",
  },
];

export const megaMenuData: Record<string, MegaMenuEntry> = {
  Electronics: {
    subcategories: ["Smartphones", "Laptops", "Audio", "Cameras", "Gaming", "Accessories"],
    featured: "Smart Watch Ultra",
  },
  Fashion: {
    subcategories: ["Men's Wear", "Women's Wear", "Kids", "Footwear", "Bags", "Jewelry"],
    featured: "Premium Cotton Hoodie",
  },
  "Home & Living": {
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting", "Storage"],
    featured: "Minimalist Desk Lamp",
  },
  Sports: {
    subcategories: ["Fitness", "Running", "Yoga", "Outdoor", "Team Sports", "Swimming"],
    featured: "Running Shoes Pro",
  },
  Beauty: {
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances", "Nail Care", "Tools"],
    featured: "Organic Face Serum",
  },
};
