import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Calendar,
  User,
  History,
  Home,
  Compass,
  Tag,
  Heart,
  Bell,
  HelpCircle,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { mockRestaurants, mockMenuItems } from "../../data/mockData";
import { Restaurant } from "../../types";
import { UserView } from "./UserPortal";
import { Footer } from "./Footer";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";

interface UserHomeProps {
  onSearch: (query: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigate: (view: UserView) => void;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

export function UserHome({
  onSearch,
  onSelectRestaurant,
  onNavigate,
  onAuthClick,
  isAuthenticated,
}: UserHomeProps) {
  const { logout } = useAuthStore();
  const [searchInput, setSearchInput] = useState("");
  const [searchMode, setSearchMode] = useState<"food" | "restaurant">("food");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const categories = [
    "Biryani",
    "Rice",
    "Seafood",
    "Main Course",
    "Appetizers",
    "Breads",
    "Desserts",
    "Drinks",
  ];

  const popularFood = mockMenuItems.slice(0, 6);

  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your reservation at Handi Restaurant is confirmed for Dec 8",
      time: "2h ago",
      unread: true,
    },
    {
      id: 2,
      title: "Special Offer",
      message: "25% off on your next booking at Spice Symphony",
      time: "5h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Review Reminder",
      message: "How was your experience at Mezban?",
      time: "1d ago",
      unread: false,
    },
  ];

  const offers = [
    {
      id: 1,
      title: "25% Off First Booking",
      code: "FIRST25",
      description: "Get 25% off on your first restaurant booking",
      expiry: "Valid till Dec 31",
    },
    {
      id: 2,
      title: "Weekend Special",
      code: "WEEKEND15",
      description: "15% discount on weekend reservations",
      expiry: "Valid every Sat-Sun",
    },
    {
      id: 3,
      title: "Loyalty Bonus",
      code: "LOYAL50",
      description: "TK 50 off on bookings above TK 500",
      expiry: "Valid for 30 days",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handleCategoryClick = (category: string) => {
    onSearch(category.toLowerCase());
  };

  const filteredRestaurants =
    searchMode === "restaurant" && searchInput
      ? mockRestaurants.filter(
          (r) =>
            r.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(searchInput.toLowerCase()) ||
            r.address.toLowerCase().includes(searchInput.toLowerCase())
        )
      : [];

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative">
      {/* Header */}
      <header className="bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center p-2">
                  <span className="text-xl font-bold text-black">TH</span>
                </div>
                <div>
                  <h1 className="text-2xl flex items-center gap-0.5 font-bold text-white">
                    TableHub
                  </h1>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-gray-300 hover:text-[#d4af37] font-medium text-sm flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Home
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("featured-restaurants")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-gray-300 hover:text-[#d4af37] font-medium text-sm flex items-center gap-2"
              >
                <Compass className="w-4 h-4" /> Explore
              </button>
              <button
                onClick={() => setShowOffers(true)}
                className="text-gray-300 hover:text-[#d4af37] font-medium text-sm flex items-center gap-2"
              >
                <Tag className="w-4 h-4" /> Offers
              </button>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-white/5 rounded-full relative"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.some((n) => n.unread) && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl shadow-2xl z-50">
                      <div className="p-4 border-b border-[#3a3a3a] flex justify-between items-center">
                        <h3 className="text-white font-semibold">
                          Notifications
                        </h3>
                        <button onClick={() => setShowNotifications(false)}>
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-4 border-b border-[#3a3a3a] ${
                              n.unread ? "bg-[#2a2a2a]" : ""
                            }`}
                          >
                            <p className="text-sm text-white font-medium">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {n.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-white/5 rounded-full"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => onNavigate("bookings")}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-white border border-[#3a3a3a] rounded-lg hover:border-[#d4af37]"
                  >
                    <History className="w-4 h-4 text-[#d4af37]" /> Bookings
                  </button>
                  <button
                    onClick={() => onNavigate("profile")}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-white border border-[#3a3a3a] rounded-lg hover:border-[#d4af37]"
                  >
                    <User className="w-4 h-4 text-[#d4af37]" /> Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      toast.success("Logged out");
                    }}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="px-6 py-2 bg-[#d4af37] text-black font-bold rounded-lg hover:bg-[#b8860b] transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-32 px-4 text-center overflow-hidden"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark Overlay - Darkened for better contrast */}
        <div className="absolute inset-0 bg-black/75 z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Discover Fine Dining Excellence
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-[0_1px_5px_rgba(255, 255, 255, 0.1)] font-medium">
            Experience world-class restaurants with seamless table reservations
            and exclusive member benefits.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-[#2a2a2a] p-1 rounded-xl">
                <button
                  onClick={() => setSearchMode("food")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    searchMode === "food"
                      ? "bg-[#d4af37] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Cuisine
                </button>
                <button
                  onClick={() => setSearchMode("restaurant")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    searchMode === "restaurant"
                      ? "bg-[#d4af37] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Restaurant
                </button>
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  searchMode === "food"
                    ? "Search for sushi, burger..."
                    : "Search by restaurant name..."
                }
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-32 py-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white focus:outline-none focus:border-[#d4af37] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-[#d4af37] text-black font-semibold rounded-lg hover:bg-[#b8860b] transition-colors"
              >
                Search
              </button>
            </form>

            {/* Live Results */}
            {searchMode === "restaurant" && searchInput && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl shadow-2xl z-50 overflow-hidden">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSearchInput("");
                        onSelectRestaurant(r);
                      }}
                      className="w-full p-4 text-left hover:bg-[#2a2a2a] border-b border-[#3a3a3a] last:border-0 flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="text-white font-medium group-hover:text-[#d4af37]">
                          {r.name}
                        </h4>
                        <p className="text-sm text-gray-400">{r.cuisine}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#d4af37]">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{r.rating}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No restaurants found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Categories */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">
            Browse by Category
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-8 py-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-all whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Popular Dishes */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Signature Dishes</h3>
            <button
              onClick={() => onSearch("popular")}
              className="text-[#d4af37] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularFood.map((item) => {
              const restaurant = mockRestaurants.find(
                (r) => r.id === item.restaurantId
              );
              return (
                <div
                  key={item.id}
                  onClick={() => restaurant && onSelectRestaurant(restaurant)}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#3a3a3a] hover:border-[#d4af37]/50 transition-all cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-[#d4af37] text-black font-bold rounded-full text-sm">
                        TK {item.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#d4af37]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-400 mb-4">
                      {restaurant?.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-[#2a2a2a] text-[#d4af37] rounded border border-[#3a3a3a]">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-400 group-hover:text-white flex items-center gap-1">
                        Order <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Restaurants */}
        <section id="featured-restaurants" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              Featured Restaurants
            </h3>
            <button
              onClick={() => onSearch("all")}
              className="text-[#d4af37] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#3a3a3a] hover:border-[#d4af37]/50 transition-all cursor-pointer group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#d4af37]/30 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                    <span className="text-white text-sm font-medium">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#d4af37]">
                    {restaurant.name}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#d4af37]" />{" "}
                      {restaurant.distance} km
                    </span>
                    <span className="text-[#d4af37]">
                      {restaurant.priceRange}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {restaurant.cuisine}
                    </span>
                    <button className="px-4 py-2 bg-[#d4af37] text-black text-sm font-medium rounded-lg hover:bg-[#b8860b]">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Team */}
        <section className="py-16">
          <h3 className="text-2xl font-bold text-center text-white mb-10">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "D", role: "Frontend Dev" },
              { name: "E", role: "Backend Dev" },
              { name: "A", role: "UI/UX Designer" },
              { name: "D", role: "Product Manager" },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#3a3a3a] text-center hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="w-20 h-20 bg-[#2a2a2a] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  👤
                </div>
                <h4 className="text-white font-medium">{member.name}</h4>
                <p className="text-sm text-[#d4af37]">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Offers Modal */}
      {showOffers && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full border border-[#3a3a3a]">
            <div className="p-4 border-b border-[#3a3a3a] flex justify-between items-center">
              <h3 className="text-white font-bold">Special Offers</h3>
              <button onClick={() => setShowOffers(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#2a2a2a] p-4 rounded-xl border border-[#3a3a3a]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{offer.title}</h4>
                    <span className="text-xs bg-[#d4af37]/10 text-[#d4af37] px-2 py-1 rounded border border-[#d4af37]/20">
                      {offer.code}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{offer.description}</p>
                  <p className="text-gray-600 text-xs mt-2">{offer.expiry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-lg w-full border border-[#3a3a3a]">
            <div className="p-4 border-b border-[#3a3a3a] flex justify-between items-center">
              <h3 className="text-white font-bold">Help & Support</h3>
              <button onClick={() => setShowHelp(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-gray-300">
              <p>For support, please contact us at:</p>
              <div className="p-4 bg-[#2a2a2a] rounded-xl">
                <p className="text-[#d4af37]">support@tablehub.com</p>
                <p className="text-sm text-gray-400 mt-1">+880 1711-123456</p>
              </div>
              <p className="text-sm">We are available 9 AM - 10 PM daily.</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
