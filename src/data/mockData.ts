import { Restaurant, MenuItem, Booking, User } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Handi Restaurant',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
    rating: 4.5,
    distance: 1.2,
    priceRange: '$$',
    cuisine: 'Bangladeshi',
    address: '123 Gulshan Avenue, Dhaka',
    openingHours: '11:00 AM - 11:00 PM',
    photos: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop',
    ],
    capacity: {
      twoSeat: 8,
      threeSeat: 6,
      fourSeat: 10,
    },
    reservationRules: {
      gracePeriod: 20,
      penaltyFee: 200,
      maxDuration: 2,
      cancellationPolicy: 'Free cancellation up to 2 hours before reservation',
    },
  },
  {
    id: '2',
    name: 'Kasturi Restaurant',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
    rating: 4.7,
    distance: 2.5,
    priceRange: '$$$',
    cuisine: 'Mughlai',
    address: '456 Banani Road, Dhaka',
    openingHours: '12:00 PM - 12:00 AM',
    photos: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=800&h=600&fit=crop',
    ],
    capacity: {
      twoSeat: 6,
      threeSeat: 4,
      fourSeat: 8,
    },
    reservationRules: {
      gracePeriod: 15,
      penaltyFee: 300,
      maxDuration: 2.5,
      cancellationPolicy: 'Free cancellation up to 3 hours before reservation',
    },
  },
  {
    id: '3',
    name: 'Kacchi Bhai',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop',
    rating: 4.8,
    distance: 0.8,
    priceRange: '$$',
    cuisine: 'Bangladeshi',
    address: '789 Dhanmondi, Dhaka',
    openingHours: '11:30 AM - 10:30 PM',
    photos: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop',
    ],
    capacity: {
      twoSeat: 10,
      threeSeat: 8,
      fourSeat: 12,
    },
    reservationRules: {
      gracePeriod: 20,
      penaltyFee: 250,
      maxDuration: 2,
      cancellationPolicy: 'Free cancellation up to 1 hour before reservation',
    },
  },
  {
    id: '4',
    name: 'Sultan Dines',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
    rating: 4.6,
    distance: 3.1,
    priceRange: '$$$',
    cuisine: 'Fine Dining',
    address: '321 Uttara, Dhaka',
    openingHours: '5:00 PM - 11:00 PM',
    photos: [
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&h=600&fit=crop',
    ],
    capacity: {
      twoSeat: 5,
      threeSeat: 4,
      fourSeat: 6,
    },
    reservationRules: {
      gracePeriod: 10,
      penaltyFee: 400,
      maxDuration: 2,
      cancellationPolicy: 'Free cancellation up to 4 hours before reservation',
    },
  },
  {
    id: '5',
    name: 'Bhoj Restaurant',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
    rating: 4.4,
    distance: 1.7,
    priceRange: '$',
    cuisine: 'Bengali',
    address: '555 Mirpur Road, Dhaka',
    openingHours: '11:00 AM - 10:00 PM',
    photos: [
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599974579688-8dbdd335339f?w=800&h=600&fit=crop',
    ],
    capacity: {
      twoSeat: 7,
      threeSeat: 5,
      fourSeat: 9,
    },
    reservationRules: {
      gracePeriod: 20,
      penaltyFee: 150,
      maxDuration: 1.5,
      cancellationPolicy: 'Free cancellation up to 2 hours before reservation',
    },
  },
];

export const mockMenuItems: MenuItem[] = [
  // Handi Restaurant
  { id: 'm1', restaurantId: '1', name: 'Beef Tehari', category: 'Rice', description: 'Aromatic rice with tender beef', price: 350, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop', available: true },
  { id: 'm2', restaurantId: '1', name: 'Chicken Roast', category: 'Main Course', description: 'Spicy roasted chicken', price: 450, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=400&fit=crop', available: true },
  { id: 'm3', restaurantId: '1', name: 'Shutki Bhorta', category: 'Appetizers', description: 'Dried fish mash', price: 180, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=400&fit=crop', available: true },
  { id: 'm4', restaurantId: '1', name: 'Dal Bhaji', category: 'Sides', description: 'Lentil with vegetables', price: 120, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop', available: true },
  { id: 'm5', restaurantId: '1', name: 'Borhani', category: 'Drinks', description: 'Traditional yogurt drink', price: 80, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop', available: true },
  
  // Kasturi Restaurant
  { id: 'm6', restaurantId: '2', name: 'Mutton Rezala', category: 'Main Course', description: 'Creamy mutton curry', price: 650, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop', available: true },
  { id: 'm7', restaurantId: '2', name: 'Chicken Korma', category: 'Main Course', description: 'Rich chicken in spiced gravy', price: 550, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop', available: true },
  { id: 'm8', restaurantId: '2', name: 'Naan Roti', category: 'Breads', description: 'Tandoori flatbread', price: 40, image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop', available: true },
  { id: 'm9', restaurantId: '2', name: 'Shahi Firni', category: 'Desserts', description: 'Creamy rice pudding', price: 150, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop', available: true },
  
  // Kacchi Bhai
  { id: 'm10', restaurantId: '3', name: 'Mutton Kacchi', category: 'Biryani', description: 'Mutton biryani cooked in dum', price: 480, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop', available: true },
  { id: 'm11', restaurantId: '3', name: 'Beef Kacchi', category: 'Biryani', description: 'Beef biryani with aromatic spices', price: 420, image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400&h=400&fit=crop', available: true },
  { id: 'm12', restaurantId: '3', name: 'Bakarkhani', category: 'Breads', description: 'Traditional thick flatbread', price: 50, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop', available: true },
  { id: 'm13', restaurantId: '3', name: 'Jali Kabab', category: 'Appetizers', description: 'Grilled minced meat skewers', price: 280, image: 'https://images.unsplash.com/photo-1626323107982-177d43e5f634?w=400&h=400&fit=crop', available: true },
  
  // Sultan Dines
  { id: 'm14', restaurantId: '4', name: 'Chingri Malaikari', category: 'Seafood', description: 'Prawns in coconut curry', price: 850, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop', available: true },
  { id: 'm15', restaurantId: '4', name: 'Hilsa Fish Curry', category: 'Seafood', description: 'Fresh hilsa in mustard gravy', price: 950, image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=400&fit=crop', available: true },
  { id: 'm16', restaurantId: '4', name: 'Shorshe Ilish', category: 'Seafood', description: 'Hilsa in mustard sauce', price: 920, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=400&fit=crop', available: true },
  { id: 'm17', restaurantId: '4', name: 'Mishti Doi', category: 'Desserts', description: 'Sweet yogurt dessert', price: 120, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=400&fit=crop', available: true },
  
  // Bhoj Restaurant
  { id: 'm18', restaurantId: '5', name: 'Ilish Paturi', category: 'Seafood', description: 'Hilsa wrapped in banana leaf', price: 680, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop', available: true },
  { id: 'm19', restaurantId: '5', name: 'Morog Polao', category: 'Rice', description: 'Chicken pilaf with aromatic spices', price: 380, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=400&fit=crop', available: true },
  { id: 'm20', restaurantId: '5', name: 'Shingara', category: 'Appetizers', description: 'Bengali samosa with vegetables', price: 60, image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=400&fit=crop', available: true },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    restaurantId: '1',
    restaurantName: 'Handi Restaurant',
    userId: 'u1',
    date: '2025-11-28',
    time: '19:00',
    duration: 1.5,
    tableType: 2,
    numberOfPeople: 2,
    status: 'upcoming',
    price: 200,
    qrCode: 'QR-B1-12345',
    specialInstructions: 'Window seat preferred',
  },
  {
    id: 'b2',
    restaurantId: '3',
    restaurantName: 'Kacchi Bhai',
    userId: 'u1',
    date: '2025-11-30',
    time: '20:00',
    duration: 2,
    tableType: 4,
    numberOfPeople: 4,
    status: 'upcoming',
    price: 400,
    qrCode: 'QR-B2-67890',
  },
  {
    id: 'b3',
    restaurantId: '2',
    restaurantName: 'Kasturi Restaurant',
    userId: 'u1',
    date: '2025-11-20',
    time: '18:30',
    duration: 2,
    tableType: 3,
    numberOfPeople: 3,
    status: 'completed',
    price: 350,
    qrCode: 'QR-B3-11223',
  },
];

export const mockUser: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  savedRestaurants: ['1', '3'],
  paymentMethods: [
    { id: 'pm1', type: 'card', last4: '4242' },
    { id: 'pm2', type: 'upi', upiId: 'john@upi' },
  ],
};