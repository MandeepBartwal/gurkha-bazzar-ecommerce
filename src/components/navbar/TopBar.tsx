/**
 * TopBar - Promotional announcement bar at the top of the page.
 * Displays shipping info and support contact.
 */
const TopBar = () => (
  <div className="bg-primary text-primary-foreground text-xs py-1.5">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <span>🚚 Free shipping on orders over $50</span>
      <span className="hidden sm:block">📞 Support: 1-800-SHOP-NOW</span>
    </div>
  </div>
);

export default TopBar;
