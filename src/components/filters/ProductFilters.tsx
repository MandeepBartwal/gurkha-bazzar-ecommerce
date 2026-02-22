import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";

/** Rating presets shown as filter buttons (0 = "All") */
const RATING_OPTIONS = [0, 3, 4, 4.5] as const;

export interface FilterState {
  search: string;
  selectedCategories: string[];
  priceRange: number[];
  minRating: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  maxPrice: number;
  onSearchChange: (value: string) => void;
  onToggleCategory: (category: string) => void;
  onPriceChange: (range: number[]) => void;
  onRatingChange: (rating: number) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

/**
 * ProductFilters - Sidebar filter controls for the products listing page.
 *
 * Renders search input, category checkboxes, price range slider,
 * and minimum rating buttons. Fully controlled via props.
 */
const ProductFilters = ({
  filters,
  maxPrice,
  onSearchChange,
  onToggleCategory,
  onPriceChange,
  onRatingChange,
  onClearAll,
  hasActiveFilters,
}: ProductFiltersProps) => (
  <div className="space-y-6">
    {/* Search */}
    <div>
      <label className="text-sm font-semibold text-foreground mb-2 block">Search</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>

    {/* Category checkboxes */}
    <div>
      <label className="text-sm font-semibold text-foreground mb-3 block">Categories</label>
      <div className="space-y-2">
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
            <Checkbox
              checked={filters.selectedCategories.includes(cat.name)}
              onCheckedChange={() => onToggleCategory(cat.name)}
            />
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
              {cat.icon} {cat.name}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">{cat.count}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Price range slider */}
    <div>
      <label className="text-sm font-semibold text-foreground mb-3 block">
        Price Range: ${filters.priceRange[0]} – ${filters.priceRange[1]}
      </label>
      <Slider
        value={filters.priceRange}
        onValueChange={onPriceChange}
        max={maxPrice}
        step={10}
        className="mt-2"
      />
    </div>

    {/* Minimum rating */}
    {/* <div>
      <label className="text-sm font-semibold text-foreground mb-3 block">Minimum Rating</label>
      <div className="flex gap-2">
        {RATING_OPTIONS.map((rating) => (
          <Button
            key={rating}
            size="sm"
            variant={filters.minRating === rating ? "default" : "outline"}
            onClick={() => onRatingChange(rating)}
            className="text-xs"
          >
            {rating === 0 ? "All" : `${rating}+⭐`}
          </Button>
        ))}
      </div>
    </div> */}

    {/* Clear all */}
    {hasActiveFilters && (
      <Button variant="outline" onClick={onClearAll} className="w-full gap-2">
        <X className="h-4 w-4" />
        Clear All Filters
      </Button>
    )}
  </div>
);

export default ProductFilters;
