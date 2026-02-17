import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@/components/ui/button";
import { bannerSlides } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        className="w-full [&_.swiper-pagination-bullet-active]:!bg-primary [&_.swiper-pagination-bullet]:bg-card"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[400px] sm:h-[500px] lg:h-[560px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
              <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="max-w-lg text-primary-foreground">
                  <span className="inline-block bg-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 animate-fade-in">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-slide-up">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base text-primary-foreground/80 mb-6 max-w-md animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    {slide.description}
                  </p>
                  <Link to="/products">
                    <Button size="lg" className="gap-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                      {slide.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;
