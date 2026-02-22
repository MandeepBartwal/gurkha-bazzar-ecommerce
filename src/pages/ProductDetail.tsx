import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Heart, ShoppingCart, Star, Minus, Plus, Truck, RotateCcw, Shield, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Mock gallery images — in a real app these come from the product DB  */
/* ------------------------------------------------------------------ */

const generateGallery = (mainImage: string): string[] => [
  mainImage,
  mainImage.replace("w=400", "w=401"),
  mainImage.replace("w=400", "w=402"),
  mainImage.replace("w=400", "w=403"),
];

/* ------------------------------------------------------------------ */
/*  Review types & mock data                                           */
/* ------------------------------------------------------------------ */

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

const MOCK_REVIEWS: Review[] = [
  { id: 1, author: "Alex M.", rating: 5, date: "2026-01-15", comment: "Absolutely love this product! Quality is top-notch and arrived quickly." },
  { id: 2, author: "Sarah K.", rating: 4, date: "2026-01-10", comment: "Great value for the price. Slightly smaller than expected but works perfectly." },
  { id: 3, author: "James W.", rating: 5, date: "2025-12-28", comment: "My third purchase from ShopHub. Never disappoints!" },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find((p) => p.id === Number(id));

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [reviewForm, setReviewForm] = useState({ author: "", rating: 5, comment: "" });

  const gallery = useMemo(() => (product ? generateGallery(product.image) : []), [product]);

  const relatedProducts = useMemo(
    () =>
      product
        ? allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
        : [],
    [product],
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.comment.trim()) return;
    const newReview: Review = {
      id: Date.now(),
      author: reviewForm.author,
      rating: reviewForm.rating,
      date: new Date().toISOString().split("T")[0],
      comment: reviewForm.comment,
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewForm({ author: "", rating: 5, comment: "" });
    toast.success("Review submitted!");
  };

  const averageRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product top section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary border border-border">
              <img
                src={gallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">{product.category}</span>
              {product.badge && <Badge variant="secondary" className="text-xs">{product.badge}</Badge>}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{averageRating}</span>
              <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge className="bg-destructive text-destructive-foreground text-xs">-{product.discount}%</Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground mb-6">
              Premium quality product with excellent build and design. Perfect for everyday use with a modern aesthetic.
            </p>

            <Separator className="my-6" />

            {/* Quantity + actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity((q) => q + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant={inWishlist ? "default" : "outline"}
                  className="gap-2"
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "30-day Returns" },
                { icon: Shield, label: "Secure Payment" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">Customer Reviews ({reviews.length})</h2>

          {/* Review form */}
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h3 className="font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <Input
                placeholder="Your name"
                value={reviewForm.author}
                onChange={(e) => setReviewForm((f) => ({ ...f, author: e.target.value }))}
              />
              <div className="flex items-center gap-2">
                <span className="text-sm">Rating:</span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReviewForm((f) => ({ ...f, rating: r }))}
                  >
                    <Star
                      className={`h-5 w-5 ${r <= reviewForm.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Share your experience..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
              />
              <Button type="submit">Submit Review</Button>
            </form>
          </div>

          {/* Review list */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {review.author[0]}
                    </div>
                    <span className="font-medium text-sm">{review.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
