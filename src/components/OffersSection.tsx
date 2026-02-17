import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Zap, Gift, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Offer {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  gradient: string;
}

/**
 * Promotional offers shown on the homepage.
 * Each card uses a gradient background from the orange palette.
 */
const OFFERS: Offer[] = [
  {
    icon: Zap,
    title: "Flash Sale",
    description: "Up to 70% off on electronics. Limited stock only!",
    cta: "Grab Deals",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    icon: Clock,
    title: "Deal of the Day",
    description: "New deals every 24 hours. Today: Premium Headphones at $49.",
    cta: "Shop Now",
    gradient: "from-orange-600 to-orange-900",
  },
  {
    icon: Gift,
    title: "Buy 2 Get 1 Free",
    description: "On all fashion items this weekend. Mix & match your style!",
    cta: "Explore",
    gradient: "from-orange-400 to-orange-600",
  },
];

const OffersSection = () => (
  <section className="py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">🔥 Hot Offers</h2>
        <p className="text-muted-foreground mt-1">Don't miss out on these incredible deals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.title} offer={offer} />
        ))}
      </div>
    </div>
  </section>
);

/** Individual offer card with gradient background and decorative shapes */
const OfferCard = ({ offer }: { offer: Offer }) => {
  const Icon = offer.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.gradient} p-6 lg:p-8 text-primary-foreground group hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-6 -translate-x-6" />

      <Icon className="h-10 w-10 mb-4 opacity-90" />
      <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
      <p className="text-sm opacity-90 mb-6 max-w-[240px]">{offer.description}</p>

      <Link to="/products">
        <Button variant="secondary" size="sm" className="gap-1 group-hover:gap-2 transition-all">
          {offer.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
};

export default OffersSection;
