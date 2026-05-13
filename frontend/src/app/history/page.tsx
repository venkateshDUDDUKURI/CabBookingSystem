"use client";

import { useBookingStore } from "@/stores/booking-store";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import {
  MapPin,
  Navigation,
  Clock,
  Star,
  Car,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const statusStyles: Record<string, string> = {
  completed: "bg-accent/10 text-accent",
  cancelled: "bg-danger/10 text-danger",
  in_progress: "bg-primary/10 text-primary",
  searching: "bg-blue-500/10 text-blue-500",
  confirmed: "bg-blue-500/10 text-blue-500",
  arriving: "bg-blue-500/10 text-blue-500",
};

export default function HistoryPage() {
  const { rideHistory } = useBookingStore();
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">(
    "all"
  );

  const filtered =
    filter === "all"
      ? rideHistory
      : rideHistory.filter((r) => r.status === filter);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">My Rides</h1>
            <p className="mt-1 text-sm text-muted">
              {rideHistory.length} total rides
            </p>
          </div>
          <Link
            href="/book"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-secondary hover:bg-primary-dark"
          >
            Book New Ride
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-6 flex gap-2">
          {(["all", "completed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "bg-primary text-secondary"
                  : "bg-card border border-border text-muted hover:text-foreground"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Rides List */}
        <div className="mt-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <Car className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-4 font-bold">No rides found</h3>
              <p className="mt-1 text-sm text-muted">
                {filter === "all"
                  ? "Book your first ride to get started!"
                  : `No ${filter} rides yet.`}
              </p>
            </div>
          ) : (
            filtered.map((ride) => (
              <div
                key={ride.id}
                className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                      {ride.cabType === "Mini"
                        ? "🚗"
                        : ride.cabType === "Sedan"
                        ? "🚙"
                        : ride.cabType === "SUV"
                        ? "🚐"
                        : "✨"}
                    </div>
                    <div>
                      <div className="font-bold">{ride.cabType}</div>
                      <div className="text-xs text-muted">
                        {formatDate(ride.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold",
                        statusStyles[ride.status] ?? "bg-gray-100 text-gray-600"
                      )}
                    >
                      {ride.status.replace("_", " ").toUpperCase()}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-muted">From:</span>
                    <span className="font-medium">{ride.pickup}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-danger" />
                    <span className="text-muted">To:</span>
                    <span className="font-medium">{ride.drop}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {ride.distance} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ride.duration} min
                    </span>
                    {ride.driverName && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {ride.driverName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {ride.rating && (
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-3 w-3 ${
                              s <= ride.rating!
                                ? "fill-primary text-primary"
                                : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-lg font-extrabold text-primary">
                      {formatCurrency(ride.fare)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
