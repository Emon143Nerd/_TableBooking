import { create } from 'zustand';
import { MenuItem, Booking, Restaurant } from '../types';
import { mockMenuItems, mockBookings } from '../data/mockData';

// Table Interface (from TableManagement.tsx)
export interface Table {
  id: string;
  type: 2 | 3 | 4 | 6 | 8;
  quantity: number;
  available: number;
  description: string;
  image: string;
  isWindowSide: boolean;
}

// Rules Interface (from ReservationRules.tsx)
export interface ReservationRulesType {
  openingTime: string;
  closingTime: string;
  gracePeriod: number;
  penaltyFee: number;
  maxDuration: number;
  cancellationHours: number;
}

interface RestaurantState {
  menuItems: MenuItem[];
  tables: Table[];
  bookings: Booking[];
  rules: ReservationRulesType;

  // Actions
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  updateMenuItem: (item: MenuItem) => void; // Placeholder for edit

  addTable: (table: Table) => void;
  updateTable: (table: Table) => void;
  deleteTable: (id: string) => void;

  updateBookingStatus: (id: string, status: 'upcoming' | 'completed' | 'cancelled') => void;
  
  updateRules: (rules: ReservationRulesType) => void;
}

// Initial Data
const initialTables: Table[] = [
  { 
    id: '1', 
    type: 2, 
    quantity: 8, 
    available: 5,
    description: 'Window Seat - Perfect for intimate dining with city views',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    isWindowSide: true
  },
  { 
    id: '2', 
    type: 3, 
    quantity: 6, 
    available: 3,
    description: 'Corner Table - Cozy seating in quiet corners',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    isWindowSide: false
  },
  { 
    id: '3', 
    type: 4, 
    quantity: 10, 
    available: 7,
    description: 'Main Hall - Standard dining tables in the main area',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop',
    isWindowSide: false
  },
  { 
    id: '4', 
    type: 6, 
    quantity: 4, 
    available: 2,
    description: 'Private Booth - Semi-private seating with dividers',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
    isWindowSide: false
  },
  { 
    id: '5', 
    type: 4, 
    quantity: 5, 
    available: 3,
    description: 'Window View Tables - Enjoy beautiful outdoor views while dining',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    isWindowSide: true
  },
];

const initialRules: ReservationRulesType = {
  openingTime: '11:00',
  closingTime: '23:00',
  gracePeriod: 20,
  penaltyFee: 10,
  maxDuration: 2,
  cancellationHours: 2,
};

export const useRestaurantStore = create<RestaurantState>((set) => ({
  // Initialize with mock data filtered for "Handi Restaurant" (ID: 1) as implied by the Manager login
  menuItems: mockMenuItems.filter(item => item.restaurantId === '1'),
  tables: initialTables,
  bookings: mockBookings, // Assuming manager sees all for now, or filter by '1' if we want strictly multi-tenant mock
  rules: initialRules,

  addMenuItem: (item) => set((state) => ({ menuItems: [item, ...state.menuItems] })),
  deleteMenuItem: (id) => set((state) => ({ menuItems: state.menuItems.filter(i => i.id !== id) })),
  updateMenuItem: (item) => set((state) => ({ menuItems: state.menuItems.map(i => i.id === item.id ? item : i) })),

  addTable: (table) => set((state) => ({ tables: [...state.tables, table] })),
  updateTable: (table) => set((state) => ({ tables: state.tables.map(t => t.id === table.id ? table : t) })),
  deleteTable: (id) => set((state) => ({ tables: state.tables.filter(t => t.id !== id) })),

  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
  })),

  updateRules: (rules) => set({ rules }),
}));
