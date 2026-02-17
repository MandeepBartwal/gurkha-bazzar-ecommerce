import { featuredProducts } from "@/data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  return (
    <section className="py-12 lg:py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Handpicked just for you</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
