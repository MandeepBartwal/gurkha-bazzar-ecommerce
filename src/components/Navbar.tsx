import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import TopBar from "./navbar/TopBar";
import SearchBar from "./navbar/SearchBar";
import NavActions from "./navbar/NavActions";
import MegaMenu from "./navbar/MegaMenu";
import MobileMenu from "./navbar/MobileMenu";

/**
 * Navbar - Main site header.
 *
 * Cart and wishlist counts are pulled from their respective contexts
 * so badges update dynamically across the app.
 */
const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <TopBar />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Shop<span className="text-primary">Hub</span>
            </span> */}
            <img src="/images/logo.svg" alt="Logo" className="w-25 h-5" />
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>

          <NavActions
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            onToggleSearch={() => setSearchOpen((prev) => !prev)}
            onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
            isMobileMenuOpen={mobileMenuOpen}
          />
        </div>

        {searchOpen && (
          <div className="md:hidden pb-3">
            <SearchBar query={searchQuery} onChange={setSearchQuery} autoFocus />
          </div>
        )}
      </div>

      <MegaMenu />

      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Navbar;
