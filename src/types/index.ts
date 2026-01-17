export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: number;
  priceRange: string;
  cuisine: string;
  address: string;
  openingHours: string;
  photos: string[];
  capacity: {
    twoSeat: number;
    threeSeat: number;
    fourSeat: number;
  };
  reservationRules: {
    gracePeriod: number;
    penaltyFee: number;
    maxDuration: number;
    cancellationPolicy: string;
  };
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  date: string;
  time: string;
  duration: number;
  tableType: 2 | 3 | 4;
  numberOfPeople: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  qrCode: string;
  specialInstructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'restaurant' | 'admin';
  managedRestaurantId?: string;
  savedRestaurants: string[];
  paymentMethods: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  last4?: string;
  upiId?: string;
}
