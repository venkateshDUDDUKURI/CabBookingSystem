export const APP_NAME = "CabRide";
export const APP_TAGLINE = "Your ride, your way — anytime, anywhere.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Book a Ride", href: "/book" },
  { label: "My Rides", href: "/history" },
  { label: "Profile", href: "/profile" },
] as const;

export const CAB_TYPES = [
  {
    id: "mini",
    name: "Mini",
    description: "Affordable rides for daily commute",
    capacity: 4,
    baseFare: 30,
    perKmRate: 8,
    icon: "🚗",
    eta: "3 min",
  },
  {
    id: "sedan",
    name: "Sedan",
    description: "Comfortable rides with extra legroom",
    capacity: 4,
    baseFare: 50,
    perKmRate: 12,
    icon: "🚙",
    eta: "5 min",
  },
  {
    id: "suv",
    name: "SUV",
    description: "Spacious rides for groups and luggage",
    capacity: 6,
    baseFare: 80,
    perKmRate: 16,
    icon: "🚐",
    eta: "7 min",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury rides for special occasions",
    capacity: 4,
    baseFare: 120,
    perKmRate: 22,
    icon: "✨",
    eta: "10 min",
  },
] as const;

export type CabType = (typeof CAB_TYPES)[number];

export const POPULAR_LOCATIONS = [
  "MG Road, Bangalore",
  "Connaught Place, Delhi",
  "Marine Drive, Mumbai",
  "Park Street, Kolkata",
  "Anna Nagar, Chennai",
  "Banjara Hills, Hyderabad",
  "Koregaon Park, Pune",
  "Ashram Road, Ahmedabad",
] as const;

export const RIDE_STATUSES = {
  SEARCHING: "searching",
  CONFIRMED: "confirmed",
  ARRIVING: "arriving",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type RideStatus = (typeof RIDE_STATUSES)[keyof typeof RIDE_STATUSES];
