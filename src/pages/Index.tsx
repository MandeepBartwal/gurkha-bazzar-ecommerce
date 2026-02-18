import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoriesSlider from "@/components/CategoriesSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import OffersSection from "@/components/OffersSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Truck, Star, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: Truck, value: "10K+", label: "Products Delivered" },
  { icon: Star, value: "4.8", label: "Average Rating" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroBanner />
        <CategoriesSlider />
        <OffersSection />
        <FeaturedProducts />

        {/* Promotional banner below featured products */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-800 p-8 lg:p-12 text-primary-foreground">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-12 -translate-x-12" />
              <div className="relative max-w-xl">
                <h2 className="text-2xl lg:text-4xl font-bold mb-3">Mega Sale is Live!</h2>
                <p className="text-sm lg:text-base opacity-90 mb-6">
                  Save up to 60% on thousands of items across all categories. Free shipping on orders over $50. Limited time only!
                </p>
                <Link to="/products">
                  <Button variant="secondary" size="lg" className="gap-2">
                    Shop the Sale
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-2xl border border-border p-8 lg:p-12">
              <div className="grid grid-cols-3 gap-6 text-center">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
