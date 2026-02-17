import { useState, useMemo, useCallback } from "react";
import { allProducts } from "@/data/products";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { type FilterState } from "@/components/filters/ProductFilters";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";

/** Maximum price value for the range slider */
const MAX_PRICE = 300;

/** Default (empty) filter state */
const INITIAL_FILTERS: FilterState = {
  search: "",
  selectedCategories: [],
  priceRange: [0, MAX_PRICE],
  minRating: 0,
};

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

/** Sort comparators keyed by option value */
const SORT_FNS: Record<SortOption, ((a: Product, b: Product) => number) | null> = {
  featured: null, // no sorting, use default order
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  newest: (a, b) => b.id - a.id,
};

/**
 * Products page - Full product listing with sidebar filters and sorting.
 *
 * Filter state is colocated here and passed down to `ProductFilters`.
 * Filtering + sorting is memoised so it only re-runs when inputs change.
 */
const Products = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // --- Filter handlers (stable references via useCallback) ---

  const handleSearchChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, search: value })),
    [],
  );

  const handleToggleCategory = useCallback(
    (category: string) =>
      setFilters((prev) => ({
        ...prev,
        selectedCategories: prev.selectedCategories.includes(category)
          ? prev.selectedCategories.filter((c) => c !== category)
          : [...prev.selectedCategories, category],
      })),
    [],
  );

  const handlePriceChange = useCallback(
    (range: number[]) => setFilters((prev) => ({ ...prev, priceRange: range })),
    [],
  );

  const handleRatingChange = useCallback(
    (rating: number) => setFilters((prev) => ({ ...prev, minRating: rating })),
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSortBy("featured");
  }, []);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.selectedCategories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < MAX_PRICE ||
    filters.minRating > 0;

  // --- Derived: filtered & sorted product list ---

  const filteredProducts = useMemo(() => {
    const { search, selectedCategories, priceRange, minRating } = filters;
    const searchLower = search.toLowerCase();

    const items = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchLower);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    const sortFn = SORT_FNS[sortBy];
    if (sortFn) items.sort(sortFn);

    return items;
  }, [filters, sortBy]);

  // --- Shared filter sidebar props ---

  const filterProps = {
    filters,
    maxPrice: MAX_PRICE,
    onSearchChange: handleSearchChange,
    onToggleCategory: handleToggleCategory,
    onPriceChange: handlePriceChange,
    onRatingChange: handleRatingChange,
    onClearAll: clearFilters,
    hasActiveFilters,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Page header + sort controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">All Products</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-2"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            <Select value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-40 bg-card rounded-xl border border-border p-5">
              <ProductFilters {...filterProps} />
            </div>
          </aside>

          {/* Mobile filter drawer (overlay) */}
          {mobileFiltersOpen && (
            <div
              className="fixed inset-0 z-50 bg-foreground/50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <div
                className="absolute right-0 top-0 h-full w-80 max-w-full bg-card p-6 overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <ProductFilters {...filterProps} />
              </div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-medium text-foreground mb-2">No products found</p>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
