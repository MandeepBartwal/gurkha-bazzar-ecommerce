import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "./navbar/TopBar";
import SearchBar from "./navbar/SearchBar";
import NavActions from "./navbar/NavActions";
import MegaMenu from "./navbar/MegaMenu";
import MobileMenu from "./navbar/MobileMenu";

/**
 * Navbar - Main site header.
 *
 * Structure:
 *  1. TopBar        → promotional strip
 *  2. Main bar      → logo + search + action icons
 *  3. MegaMenu      → desktop category navigation
 *  4. MobileMenu    → hamburger drawer (small screens)
 *
 * TODO: Wire up cart/wishlist counts from global state (context or store).
 */
const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Placeholder counts – replace with real data from cart/wishlist state
  const cartCount = 3;
  const wishlistCount = 5;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <TopBar />

      {/* Main navigation bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Shop<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop search (hidden on mobile) */}
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

        {/* Mobile search (expandable) */}
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
