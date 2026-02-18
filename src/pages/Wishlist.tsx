import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success("Moved to cart");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-6">Save items you love for later.</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            My Wishlist ({items.length} {items.length === 1 ? "item" : "items"})
          </h1>
          <Button variant="ghost" size="sm" className="text-destructive gap-1" onClick={clearWishlist}>
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </Link>

              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm text-foreground hover:text-primary line-clamp-2 mb-2">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-foreground">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-1 text-xs" onClick={() => handleMoveToCart(product)}>
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Move to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => removeFromWishlist(product.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
