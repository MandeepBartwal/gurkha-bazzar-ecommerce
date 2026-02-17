import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { categories } from "@/data/products";
import { Link } from "react-router-dom";

const CategoriesSlider = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Browse our wide selection of categories</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline hidden sm:block">
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={16}
          slidesPerView={2.5}
          freeMode
          navigation
          breakpoints={{
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 4.5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          className="[&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link to="/products" className="group block text-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-secondary border-2 border-transparent group-hover:border-primary transition-all duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors" />
                  <span className="absolute top-2 left-2 text-2xl">{cat.icon}</span>
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground">{cat.count} items</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoriesSlider;
