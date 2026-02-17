import { Link } from "react-router-dom";
import { megaMenuData } from "@/data/products";

interface MobileMenuProps {
  onClose: () => void;
}

/**
 * MobileMenu - Collapsible navigation drawer shown on small screens.
 * Renders each top-level category as a simple link.
 */
const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const categoryKeys = Object.keys(megaMenuData);

  return (
    <div className="lg:hidden border-t border-border bg-card">
      <div className="container mx-auto px-4 py-4 space-y-2">
        {categoryKeys.map((key) => (
          <Link
            key={key}
            to="/products"
            className="block px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            {key}
          </Link>
        ))}

        <Link
          to="/products"
          className="block px-3 py-2 text-sm font-medium text-primary rounded-md hover:bg-secondary transition-colors"
          onClick={onClose}
        >
          All Products
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
