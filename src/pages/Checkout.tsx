import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, TAX_RATE } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, Smartphone, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", icon: Building2 },
  { id: "upi", label: "UPI / Digital Wallet", icon: Smartphone },
] as const;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, coupon, clearCart } = useCart();
  const { isLoggedIn, user, addOrder } = useAuth();

  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const required = ["firstName", "email", "address", "city", "zip"] as const;
    for (const field of required) {
      if (!form[field].trim()) {
        toast.error(`Please fill in the ${field} field`);
        return;
      }
    }

    // Create order
    const order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString().split("T")[0],
      items: items.map((i) => ({ name: i.product.name, price: i.product.price, quantity: i.quantity })),
      total,
      status: "Processing" as const,
    };

    if (isLoggedIn) addOrder(order);

    clearCart();
    navigate(`/order-confirmation/${order.id}`, { state: { order, total } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Nothing to Checkout</h1>
          <Link to="/products"><Button>Browse Products</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/cart" className="hover:text-primary">Cart</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Checkout</span>
        </nav>

        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Checkout</h1>

        {!isLoggedIn && (
          <div className="bg-secondary rounded-lg p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Have an account? <Link to="/profile" className="text-primary font-medium">Login</Link> for a faster checkout.</p>
            <span className="text-xs text-muted-foreground">Guest checkout available</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing details */}
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4">Billing & Shipping Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" value={form.address} onChange={(e) => handleChange("address", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" value={form.city} onChange={(e) => handleChange("city", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={form.state} onChange={(e) => handleChange("state", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input id="zip" value={form.zip} onChange={(e) => handleChange("zip", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={form.country} onChange={(e) => handleChange("country", e.target.value)} className="mt-1" />
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                    <label
                      key={id}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        paymentMethod === id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={id} />
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </section>
            </div>

            {/* Order summary sidebar */}
            <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-40">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-medium">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({coupon})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" size="lg">Place Order</Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
