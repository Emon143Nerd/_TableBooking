import { useState, useEffect } from "react";
import { UserPortal } from "./components/user/UserPortal";
import { AdminPortal } from "./components/admin/AdminPortal";
import { RestaurantPortal } from "./components/restaurant/RestaurantPortal";
import { useAuthStore } from "./store/useAuthStore";
import { Loader2 } from "lucide-react";

export default function Router() {
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial auth check
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && user?.role === "admin") {
    return <AdminPortal />;
  }

  if (isAuthenticated && user?.role === "restaurant") {
    return <RestaurantPortal />;
  }

  // Default to User Portal (Landing Page) for unauthenticated users and regular users
  return <UserPortal />;
}
