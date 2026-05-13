"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useBookingStore } from "@/stores/booking-store";
import { formatCurrency } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Bell,
  ChevronRight,
  Car,
  Star,
  Navigation,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const { rideHistory } = useBookingStore();

  const completedRides = rideHistory.filter((r) => r.status === "completed");
  const totalSpent = completedRides.reduce((sum, r) => sum + r.fare, 0);
  const totalDistance = completedRides.reduce((sum, r) => sum + r.distance, 0);
  const avgRating =
    completedRides.length > 0
      ? completedRides.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
        completedRides.filter((r) => r.rating).length
      : 0;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <User className="mx-auto h-16 w-16 text-muted" />
          <h1 className="mt-4 text-2xl font-bold">Sign in to view profile</h1>
          <p className="mt-2 text-sm text-muted">
            Login or create an account to access your profile
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-primary px-6 py-3 font-bold text-secondary"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-border px-6 py-3 font-bold"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: CreditCard,
      label: "Payment Methods",
      desc: "Manage your payment options",
    },
    {
      icon: MapPin,
      label: "Saved Addresses",
      desc: "Home, work, and favorite places",
    },
    {
      icon: Bell,
      label: "Notifications",
      desc: "Manage notification preferences",
    },
    {
      icon: Shield,
      label: "Safety",
      desc: "Emergency contacts and safety settings",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Profile Header */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-extrabold text-secondary">
              {user?.name?.charAt(0) ?? "U"}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-extrabold">{user?.name}</h1>
              <div className="mt-1 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:gap-4">
                <span className="flex items-center justify-center gap-1 sm:justify-start">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </span>
                <span className="flex items-center justify-center gap-1 sm:justify-start">
                  <Phone className="h-4 w-4" />
                  {user?.phone}
                </span>
              </div>
            </div>
            <button className="ml-auto rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-primary/5">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: Car,
              value: completedRides.length.toString(),
              label: "Total Rides",
            },
            {
              icon: Navigation,
              value: `${totalDistance} km`,
              label: "Total Distance",
            },
            {
              icon: CreditCard,
              value: formatCurrency(totalSpent),
              label: "Total Spent",
            },
            {
              icon: Star,
              value: avgRating > 0 ? avgRating.toFixed(1) : "—",
              label: "Avg Rating",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <stat.icon className="mx-auto h-6 w-6 text-primary" />
              <div className="mt-2 text-xl font-extrabold">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="mt-6 rounded-2xl border border-border bg-card shadow-sm">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-primary/5 ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-muted">{item.desc}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted" />
            </button>
          ))}
        </div>

        {/* Recent Rides */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Rides</h2>
            <Link
              href="/history"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              View All
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {completedRides.slice(0, 3).map((ride) => (
              <div
                key={ride.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm">
                    {ride.cabType === "Mini"
                      ? "🚗"
                      : ride.cabType === "Sedan"
                      ? "🚙"
                      : ride.cabType === "SUV"
                      ? "🚐"
                      : "✨"}
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {ride.pickup.split(",")[0]} → {ride.drop.split(",")[0]}
                    </div>
                    <div className="text-xs text-muted">
                      {ride.distance} km &bull; {ride.duration} min
                    </div>
                  </div>
                </div>
                <span className="font-bold text-primary">
                  {formatCurrency(ride.fare)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
