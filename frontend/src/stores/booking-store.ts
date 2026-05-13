"use client";

import { create } from "zustand";
import type { RideStatus } from "@/lib/constants";

export interface Ride {
  id: string;
  pickup: string;
  drop: string;
  cabType: string;
  fare: number;
  distance: number;
  duration: number;
  status: RideStatus;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  rating?: number;
  createdAt: string;
}

interface BookingState {
  pickup: string;
  drop: string;
  selectedCab: string;
  currentRide: Ride | null;
  rideHistory: Ride[];
  setPickup: (pickup: string) => void;
  setDrop: (drop: string) => void;
  setSelectedCab: (cab: string) => void;
  bookRide: (ride: Ride) => void;
  updateRideStatus: (status: RideStatus) => void;
  cancelRide: () => void;
  completeRide: (rating?: number) => void;
}

const mockHistory: Ride[] = [
  {
    id: "CB-ABCD1234",
    pickup: "MG Road, Bangalore",
    drop: "Koramangala, Bangalore",
    cabType: "Sedan",
    fare: 186,
    distance: 8.5,
    duration: 25,
    status: "completed",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 9876543211",
    vehicleNumber: "KA 01 AB 1234",
    rating: 4,
    createdAt: "2026-05-10T14:30:00Z",
  },
  {
    id: "CB-EFGH5678",
    pickup: "Indiranagar, Bangalore",
    drop: "Whitefield, Bangalore",
    cabType: "Mini",
    fare: 224,
    distance: 15,
    duration: 45,
    status: "completed",
    driverName: "Suresh Babu",
    driverPhone: "+91 9876543212",
    vehicleNumber: "KA 05 CD 5678",
    rating: 5,
    createdAt: "2026-05-08T09:15:00Z",
  },
  {
    id: "CB-IJKL9012",
    pickup: "HSR Layout, Bangalore",
    drop: "Electronic City, Bangalore",
    cabType: "SUV",
    fare: 352,
    distance: 12,
    duration: 35,
    status: "completed",
    driverName: "Anil Sharma",
    driverPhone: "+91 9876543213",
    vehicleNumber: "KA 03 EF 9012",
    rating: 3,
    createdAt: "2026-05-05T18:45:00Z",
  },
  {
    id: "CB-MNOP3456",
    pickup: "Jayanagar, Bangalore",
    drop: "Majestic, Bangalore",
    cabType: "Mini",
    fare: 98,
    distance: 6,
    duration: 20,
    status: "cancelled",
    createdAt: "2026-05-03T11:00:00Z",
  },
];

export const useBookingStore = create<BookingState>((set) => ({
  pickup: "",
  drop: "",
  selectedCab: "",
  currentRide: null,
  rideHistory: mockHistory,

  setPickup: (pickup) => set({ pickup }),
  setDrop: (drop) => set({ drop }),
  setSelectedCab: (cab) => set({ selectedCab: cab }),

  bookRide: (ride) =>
    set((state) => ({
      currentRide: ride,
      rideHistory: [ride, ...state.rideHistory],
    })),

  updateRideStatus: (status) =>
    set((state) => ({
      currentRide: state.currentRide
        ? { ...state.currentRide, status }
        : null,
    })),

  cancelRide: () =>
    set((state) => ({
      currentRide: state.currentRide
        ? { ...state.currentRide, status: "cancelled" as const }
        : null,
    })),

  completeRide: (rating) =>
    set((state) => ({
      currentRide: state.currentRide
        ? {
            ...state.currentRide,
            status: "completed" as const,
            rating,
          }
        : null,
    })),
}));
