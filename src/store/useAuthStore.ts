import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email?: string; password?: string; provider?: 'google' | 'credentials'; googleUser?: any }) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async ({ email, password, provider, googleUser }) => {
        // 1. Google Login Logic
        if (provider === 'google' && googleUser) {
          const user: User = {
            id: googleUser.id || `g_${Date.now()}`,
            name: googleUser.name || 'Google User',
            email: googleUser.email || 'user@gmail.com',
            phone: '',
            role: 'user', // Default to user for Google Sign In
            savedRestaurants: [],
            paymentMethods: []
          };
          set({ user, isAuthenticated: true });
          return;
        }

        // 2. Credentials Login Logic (Mock Only)
        // Hardcoded Credentials for Demo Stability
        if (email === 'admin@tablehub.com' && password === 'admin123') {
          set({
            user: {
              id: 'admin_1',
              name: 'Super Admin',
              email,
              phone: '',
              role: 'admin',
              savedRestaurants: [],
              paymentMethods: []
            },
            isAuthenticated: true
          });
        } else if (email === 'manager@handi.com' && password === 'manager123') {
          set({
            user: {
              id: 'mgr_1',
              name: 'Handi Manager',
              email,
              phone: '01700000000',
              role: 'restaurant',
              managedRestaurantId: '1', // Manages "Handi Restaurant" (ID: 1)
              savedRestaurants: [],
              paymentMethods: []
            },
            isAuthenticated: true
          });
        } else if (email === 'user@example.com' && password === 'user123') {
           set({
            user: {
              id: 'u_1',
              name: 'Regular User',
              email,
              phone: '01800000000',
              role: 'user',
              savedRestaurants: [],
              paymentMethods: []
            },
            isAuthenticated: true
          });
        } else if (email && password) {
          // Allow any other email/pass for user role for generic testing
           set({
            user: {
              id: `u_${Date.now()}`,
              name: email.split('@')[0],
              email,
              phone: '',
              role: 'user',
              savedRestaurants: [],
              paymentMethods: []
            },
            isAuthenticated: true
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
