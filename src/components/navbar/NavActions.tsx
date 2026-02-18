import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavActionsProps {
  cartCount: number;
  wishlistCount: number;
  onToggleSearch: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

/**
 * NavActions - Right-side action buttons.
 * Links now point to real pages: /wishlist, /cart, /profile.
 */
const NavActions = ({
  cartCount,
  wishlistCount,
  onToggleSearch,
  onToggleMobileMenu,
  isMobileMenuOpen,
}: NavActionsProps) => (
  <div className="flex items-center gap-1 sm:gap-2">
    <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSearch}>
      <Search className="h-5 w-5" />
    </Button>

    <Link to="/wishlist" className="hidden sm:flex">
      <Button variant="ghost" size="icon" className="relative">
        <Heart className="h-5 w-5" />
        {wishlistCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
            {wishlistCount}
          </Badge>
        )}
      </Button>
    </Link>

    <Link to="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
            {cartCount}
          </Badge>
        )}
      </Button>
    </Link>

    <Link to="/profile" className="hidden sm:flex">
      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </Link>

    <Button variant="ghost" size="icon" className="lg:hidden" onClick={onToggleMobileMenu}>
      {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  </div>
);

export default NavActions;
