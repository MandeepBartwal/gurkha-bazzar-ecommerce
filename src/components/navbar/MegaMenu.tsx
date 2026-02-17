import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { megaMenuData } from "@/data/products";

/** Delay (ms) before closing the mega menu after mouse leaves */
const CLOSE_DELAY_MS = 200;

type MenuKey = keyof typeof megaMenuData;

/**
 * MegaMenu - Desktop-only category navigation with dropdown panels.
 *
 * Uses a timeout-based hover pattern so the dropdown doesn't close
 * instantly when the cursor briefly leaves the trigger area.
 */
const MegaMenu = () => {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const openMenu = (key: MenuKey) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY_MS);
  };

  // Clean up timer on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const menuKeys = Object.keys(megaMenuData) as MenuKey[];

  return (
    <nav className="hidden lg:block border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-0">
          {menuKeys.map((key) => {
            const { subcategories, featured } = megaMenuData[key];

            return (
              <li
                key={key}
                className="relative"
                onMouseEnter={() => openMenu(key)}
                onMouseLeave={scheduleClose}
              >
                <button className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {key}
                  <ChevronDown className="h-3 w-3" />
                </button>

                {activeMenu === key && (
                  <div
                    className="absolute top-full left-0 w-[480px] bg-card border border-border rounded-b-lg shadow-xl p-6 z-50"
                    onMouseEnter={() => openMenu(key)}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Subcategory links */}
                      <div>
                        <h3 className="font-semibold text-sm text-primary mb-3">{key}</h3>
                        <ul className="space-y-2">
                          {subcategories.map((sub) => (
                            <li key={sub}>
                              <Link
                                to="/products"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Featured product highlight */}
                      <div className="bg-secondary rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Featured</p>
                        <p className="font-semibold text-sm">{featured}</p>
                        <Button size="sm" className="mt-3 text-xs">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}

          <li>
            <Link
              to="/products"
              className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors inline-block"
            >
              All Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MegaMenu;
