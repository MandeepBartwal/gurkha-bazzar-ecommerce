import { Button } from "@/components/ui/button";
import { Truck, Shield, RotateCcw, Headphones, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface TrustBadge {
  icon: LucideIcon;
  label: string;
  description: string;
}

const TRUST_BADGES: TrustBadge[] = [
  { icon: Truck, label: "Free Shipping", description: "On orders $50+" },
  { icon: Shield, label: "Secure Payment", description: "100% protected" },
  { icon: RotateCcw, label: "Easy Returns", description: "30-day returns" },
  { icon: Headphones, label: "24/7 Support", description: "Dedicated help" },
];

const FOOTER_LINKS: Record<string, string[]> = {
  Shop: ["All Products", "New Arrivals", "Best Sellers", "Deals", "Gift Cards"],
  Company: ["About Us", "Careers", "Press", "Blog", "Investors"],
  Support: ["Help Center", "Contact Us", "Shipping Info", "Returns", "FAQs"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};

const PAYMENT_METHODS = ["Visa", "Mastercard", "PayPal", "Apple Pay"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * Footer – Site-wide footer with four sections:
 *  1. Trust badges    → shipping, security, returns, support
 *  2. Newsletter CTA  → email signup for discount
 *  3. Link columns    → shop / company / support / legal
 *  4. Bottom bar      → copyright + payment icons
 */
const Footer = () => (
  <footer>
    <TrustBadgesStrip />
    <NewsletterBanner />
    <FooterLinks />
    <BottomBar />
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const TrustBadgesStrip = () => (
  <div className="border-t border-border bg-secondary/50">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_BADGES.map((badge) => {
          const Icon = badge.icon;
          return (
            <div key={badge.label} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const NewsletterBanner = () => (
  <div className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-10 text-center">
      <h3 className="text-xl font-bold mb-2">Subscribe & Get 15% Off</h3>
      <p className="text-sm opacity-90 mb-4 max-w-md mx-auto">
        Join our newsletter for exclusive deals, new arrivals & more.
      </p>
      <div className="flex max-w-md mx-auto gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2.5 rounded-lg bg-primary-foreground/20 placeholder:text-primary-foreground/60 text-sm outline-none focus:ring-2 focus:ring-primary-foreground/40"
        />
        <Button variant="secondary" className="shrink-0">
          Subscribe
        </Button>
      </div>
    </div>
  </div>
);

const FooterLinks = () => (
  <div className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BottomBar = () => (
  <div className="bg-foreground border-t border-primary-foreground/10">
    <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
      <p className="text-sm text-primary-foreground/60">© 2026 ShopHub. All rights reserved.</p>
      <div className="flex gap-4 text-sm text-primary-foreground/60">
        {PAYMENT_METHODS.map((method) => (
          <span key={method}>{method}</span>
        ))}
      </div>
    </div>
  </div>
);

export default Footer;
