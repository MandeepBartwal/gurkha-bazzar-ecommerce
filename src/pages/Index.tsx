import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoriesSlider from "@/components/CategoriesSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import OffersSection from "@/components/OffersSection";
import Footer from "@/components/Footer";
import { Truck, Star, Users } from "lucide-react";

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
