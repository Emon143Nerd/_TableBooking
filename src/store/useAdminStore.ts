import { create } from 'zustand';

// Types
export interface RestaurantApplication {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  phone: string;
  email: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  description?: string;
  openingHours?: string;
  priceRange?: string;
}

export interface DeletionRequest {
  id: string;
  restaurantId: string;
  restaurantName: string;
  ownerName: string;
  requestDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  cancelledBookings: number;
  joinedDate: string;
  status: 'active' | 'suspended';
}

export interface Dispute {
  id: string;
  type: string;
  restaurant: string;
  customer: string;
  description: string;
  date: string;
  status: 'open' | 'resolved' | 'rejected';
  amount?: number;
}

interface AdminState {
  applications: RestaurantApplication[];
  deletionRequests: DeletionRequest[];
  customers: Customer[];
  disputes: Dispute[];
  
  // Actions
  updateApplicationStatus: (id: string, status: 'approved' | 'rejected') => void;
  addApplication: (app: RestaurantApplication) => void;
  updateDeletionStatus: (id: string, status: 'approved' | 'rejected') => void;
  updateCustomerStatus: (id: string, status: 'active' | 'suspended') => void;
  updateDisputeStatus: (id: string, status: 'resolved' | 'rejected') => void;
}

// Initial Mock Data
const initialApplications: RestaurantApplication[] = [
  {
    id: 'R001',
    name: 'Dhaka Biryani House',
    cuisine: 'Bangladeshi',
    address: '321 Gulshan Avenue, Dhaka',
    phone: '+880 1712-345678',
    email: 'contact@dhakabiryani.com',
    appliedDate: '2025-11-22',
    status: 'pending',
    documents: ['Business License', 'Health Certificate', 'Insurance'],
    description: 'Authentic Bangladeshi biryani and traditional cuisine',
    openingHours: '11:00 AM - 11:00 PM',
    priceRange: '$$',
  },
  {
    id: 'R002',
    name: 'Khana Khazana',
    cuisine: 'Mughlai',
    address: '555 Banani Road, Dhaka',
    phone: '+880 1723-456789',
    email: 'info@khanakhazana.com',
    appliedDate: '2025-11-23',
    status: 'pending',
    documents: ['Business License', 'Health Certificate'],
    description: 'Royal Mughlai cuisine in elegant setting',
    openingHours: '12:00 PM - 12:00 AM',
    priceRange: '$$$',
  },
  {
    id: 'R003',
    name: 'Nanna Biriyani',
    cuisine: 'Bangladeshi',
    address: '123 Dhanmondi, Dhaka',
    phone: '+880 1734-567890',
    email: 'hello@nannabiriyani.com',
    appliedDate: '2025-11-15',
    status: 'approved',
    documents: ['Business License', 'Health Certificate', 'Insurance'],
    description: 'Traditional Dhaka-style biryani',
    openingHours: '11:00 AM - 10:00 PM',
    priceRange: '$$',
  },
  // Adding dashboard items to main list for consistency
  { name: 'Sushi Dreams', cuisine: 'Japanese', appliedDate: '2025-11-22', status: 'pending', id: 'R004', address: '123 Sushi Ln', phone: '', email: '', documents: [] },
  { name: 'Taco Fiesta', cuisine: 'Mexican', appliedDate: '2025-11-23', status: 'pending', id: 'R005', address: '456 Taco St', phone: '', email: '', documents: [] },
  { name: 'Pasta House', cuisine: 'Italian', appliedDate: '2025-11-24', status: 'pending', id: 'R006', address: '789 Pasta Rd', phone: '', email: '', documents: [] },
];

const initialDeletionRequests: DeletionRequest[] = [
  {
    id: 'D001',
    restaurantId: 'R005',
    restaurantName: 'Star Kabab',
    ownerName: 'Karim Rahman',
    requestDate: '2025-11-25',
    reason: 'Relocating business to new city',
    status: 'pending',
  },
  {
    id: 'D002',
    restaurantId: 'R007',
    restaurantName: 'Fusion Delight',
    ownerName: 'Fatima Ahmed',
    requestDate: '2025-11-20',
    reason: 'Closing down due to lease expiration',
    status: 'pending',
  },
];

const initialCustomers: Customer[] = [
  {
    id: 'U001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    totalBookings: 45,
    cancelledBookings: 3,
    joinedDate: '2025-01-15',
    status: 'active',
  },
  {
    id: 'U002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8901',
    totalBookings: 28,
    cancelledBookings: 1,
    joinedDate: '2025-03-22',
    status: 'active',
  },
  {
    id: 'U003',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 234 567 8902',
    totalBookings: 12,
    cancelledBookings: 8,
    joinedDate: '2025-05-10',
    status: 'suspended',
  },
];

const initialDisputes: Dispute[] = [
  {
    id: 'D001',
    type: 'Late Cancellation',
    restaurant: 'The Burger House',
    customer: 'John Doe',
    description: 'Customer cancelled 30 minutes before reservation without valid reason. Requesting penalty fee.',
    date: '2025-11-23',
    status: 'open',
    amount: 10,
  },
  {
    id: 'D002',
    type: 'Service Issue',
    restaurant: 'Pizza Paradise',
    customer: 'Jane Smith',
    description: 'Customer claims table was not ready despite confirmed booking. Requesting refund.',
    date: '2025-11-22',
    status: 'open',
    amount: 15,
  },
  {
    id: 'D003',
    type: 'No-Show Dispute',
    restaurant: 'Biryani Palace',
    customer: 'Bob Johnson',
    description: 'Restaurant claims customer did not show up. Customer states they arrived within grace period.',
    date: '2025-11-21',
    status: 'resolved',
    amount: 12,
  },
];

export const useAdminStore = create<AdminState>((set) => ({
  applications: initialApplications,
  deletionRequests: initialDeletionRequests,
  customers: initialCustomers,
  disputes: initialDisputes,

  updateApplicationStatus: (id, status) => set((state) => ({
    applications: state.applications.map(app => app.id === id ? { ...app, status } : app)
  })),

  addApplication: (app) => set((state) => ({
    applications: [...state.applications, app]
  })),

  updateDeletionStatus: (id, status) => set((state) => ({
    deletionRequests: state.deletionRequests.map(req => req.id === id ? { ...req, status } : req)
  })),

  updateCustomerStatus: (id, status) => set((state) => ({
    customers: state.customers.map(c => c.id === id ? { ...c, status } : c)
  })),

  updateDisputeStatus: (id, status) => set((state) => ({
    disputes: state.disputes.map(d => d.id === id ? { ...d, status } : d)
  })),
}));
