import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  /** Additional class names for the wrapper */
  className?: string;
  autoFocus?: boolean;
}

/**
 * SearchBar - Reusable search input with a leading icon.
 * Used in both desktop (inline) and mobile (expandable) layouts.
 */
const SearchBar = ({ query, onChange, className = "", autoFocus }: SearchBarProps) => (
  <div className={`relative w-full ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Search products, brands & more..."
      className="pl-10 pr-4 h-10 bg-secondary border-none focus-visible:ring-primary"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      autoFocus={autoFocus}
    />
  </div>
);

export default SearchBar;
