import { Link, useParams, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const state = location.state as { order?: { date: string; items: { name: string; quantity: number; price: number }[] }; total?: number } | null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-muted-foreground mb-8">
            Order ID: <span className="font-mono font-bold text-foreground">{orderId}</span>
          </p>

          {state?.order && (
            <div className="bg-card rounded-xl border border-border p-6 mb-8 text-left">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order Details
              </h2>
              <div className="space-y-2 mb-4">
                {state.order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold border-t border-border pt-3">
                <span>Total</span>
                <span>${state.total?.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products">
              <Button className="gap-2">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">View Orders</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
