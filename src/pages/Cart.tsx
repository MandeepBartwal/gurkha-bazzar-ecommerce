import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, TAX_RATE } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, subtotal, discount, coupon, updateQuantity, removeFromCart, clearCart, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState("");

  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      toast.success("Coupon applied!");
      setCouponInput("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
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
            Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
          </h1>
          <Button variant="ghost" size="sm" className="text-destructive gap-1" onClick={clearCart}>
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-card rounded-xl border border-border p-4">
                <Link to={`/product/${product.id}`} className="shrink-0">
                  <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="font-semibold text-sm text-foreground hover:text-primary line-clamp-2">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">{product.category}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">${(product.price * quantity).toFixed(2)}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-40">
            <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {coupon && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-1">
                    Discount ({coupon})
                    <button onClick={removeCoupon}><X className="h-3 w-3" /></button>
                  </span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon input */}
            {!coupon && (
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Coupon code"
                    className="pl-9"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  />
                </div>
                <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
              </div>
            )}

            <Link to="/checkout" className="block mt-6">
              <Button className="w-full" size="lg">Proceed to Checkout</Button>
            </Link>

            <Link to="/products" className="block mt-3">
              <Button variant="ghost" className="w-full text-sm">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
