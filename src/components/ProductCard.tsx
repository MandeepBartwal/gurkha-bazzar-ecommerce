import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard - Displays a single product in a grid.
 * Now wired to real cart & wishlist contexts.
 */
const ProductCard = ({ product }: ProductCardProps) => {
  const { name, image, category, price, originalPrice, badge, discount, rating, reviews } = product;
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {badge && <Badge className="absolute top-3 left-3 text-[10px]">{badge}</Badge>}

          {discount && (
            <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button size="sm" className="flex-1 gap-1 text-xs h-9" onClick={handleAddToCart}>
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant={inWishlist ? "default" : "secondary"}
              className="h-9 w-9 p-0"
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-3.5 w-3.5 ${inWishlist ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
