"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/stores/booking-store";
import { CAB_TYPES, POPULAR_LOCATIONS } from "@/lib/constants";
import {
  formatCurrency,
  estimateDistance,
  estimateFare,
  estimateDuration,
  generateBookingId,
  cn,
} from "@/lib/utils";
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  ArrowRight,
  LocateFixed,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import type { Ride } from "@/stores/booking-store";

export default function BookPage() {
  const router = useRouter();
  const { pickup, drop, selectedCab, setPickup, setDrop, setSelectedCab, bookRide } =
    useBookingStore();
  const [pickupSearch, setPickupSearch] = useState("");
  const [dropSearch, setDropSearch] = useState("");
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);

  const distance = pickup && drop ? estimateDistance(pickup, drop) : 0;
  const selectedCabData = CAB_TYPES.find((c) => c.id === selectedCab);
  const fare =
    selectedCabData && distance > 0
      ? estimateFare(distance, selectedCabData.baseFare, selectedCabData.perKmRate)
      : 0;
  const duration = distance > 0 ? estimateDuration(distance) : 0;

  const filteredPickup = POPULAR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(pickupSearch.toLowerCase())
  );
  const filteredDrop = POPULAR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(dropSearch.toLowerCase())
  );

  const handleBooking = () => {
    if (!pickup) {
      toast.error("Please enter pickup location");
      return;
    }
    if (!drop) {
      toast.error("Please enter drop location");
      return;
    }
    if (!selectedCab) {
      toast.error("Please select a cab type");
      return;
    }

    const ride: Ride = {
      id: generateBookingId(),
      pickup,
      drop,
      cabType: selectedCabData?.name ?? "",
      fare,
      distance,
      duration,
      status: "searching",
      createdAt: new Date().toISOString(),
    };

    bookRide(ride);
    toast.success("Searching for nearby drivers...");
    router.push("/tracking");
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Book a Ride</h1>
        <p className="mt-1 text-sm text-muted">
          Enter your pickup and drop locations to get started
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column — Location + Cab Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Inputs */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-bold">Where to?</h2>

              <div className="mt-4 space-y-4">
                {/* Pickup */}
                <div className="relative">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                    </div>
                    <input
                      type="text"
                      value={pickup || pickupSearch}
                      onChange={(e) => {
                        setPickupSearch(e.target.value);
                        setPickup("");
                        setShowPickupSuggestions(true);
                      }}
                      onFocus={() => setShowPickupSuggestions(true)}
                      placeholder="Enter pickup location"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-10 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
                      title="Use current location"
                      onClick={() => {
                        setPickup("Current Location (GPS)");
                        setShowPickupSuggestions(false);
                        setPickupSearch("");
                      }}
                    >
                      <LocateFixed className="h-5 w-5" />
                    </button>
                  </div>
                  {showPickupSuggestions && pickupSearch && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-border bg-card p-2 shadow-lg">
                      {filteredPickup.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setPickup(loc);
                            setPickupSearch("");
                            setShowPickupSuggestions(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-primary/5"
                        >
                          <Search className="h-4 w-4 text-muted" />
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Connector Line */}
                <div className="ml-[18px] h-4 w-0.5 bg-border" />

                {/* Drop */}
                <div className="relative">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <div className="h-3 w-3 rounded-full bg-danger" />
                    </div>
                    <input
                      type="text"
                      value={drop || dropSearch}
                      onChange={(e) => {
                        setDropSearch(e.target.value);
                        setDrop("");
                        setShowDropSuggestions(true);
                      }}
                      onFocus={() => setShowDropSuggestions(true)}
                      placeholder="Enter drop location"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  {showDropSuggestions && dropSearch && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-border bg-card p-2 shadow-lg">
                      {filteredDrop.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setDrop(loc);
                            setDropSearch("");
                            setShowDropSuggestions(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-primary/5"
                        >
                          <Search className="h-4 w-4 text-muted" />
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {distance > 0 && (
                <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Navigation className="h-4 w-4" />
                    {distance} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    ~{duration} min
                  </span>
                </div>
              )}
            </div>

            {/* Cab Selection */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-bold">Choose your ride</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CAB_TYPES.map((cab) => {
                  const cabFare =
                    distance > 0
                      ? estimateFare(distance, cab.baseFare, cab.perKmRate)
                      : cab.baseFare;
                  return (
                    <button
                      key={cab.id}
                      onClick={() => setSelectedCab(cab.id)}
                      className={cn(
                        "rounded-xl border-2 p-4 text-left transition-all",
                        selectedCab === cab.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{cab.icon}</span>
                          <div>
                            <div className="font-bold">{cab.name}</div>
                            <div className="text-xs text-muted">
                              {cab.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">
                            {formatCurrency(cabFare)}
                          </div>
                          <div className="text-xs text-muted">{cab.eta} away</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {cab.capacity} seats
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {formatCurrency(cab.perKmRate)}/km
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column — Fare Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-bold">Ride Summary</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <div className="text-xs text-muted">Pickup</div>
                    <div className="font-medium">
                      {pickup || "Not selected"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-danger" />
                  <div>
                    <div className="text-xs text-muted">Drop-off</div>
                    <div className="font-medium">{drop || "Not selected"}</div>
                  </div>
                </div>
              </div>

              {selectedCabData && (
                <div className="mt-4 rounded-xl bg-primary/5 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedCabData.icon}</span>
                    <span className="font-bold">{selectedCabData.name}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Distance</span>
                  <span className="font-medium">
                    {distance > 0 ? `${distance} km` : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Duration</span>
                  <span className="font-medium">
                    {duration > 0 ? `~${duration} min` : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Base Fare</span>
                  <span className="font-medium">
                    {selectedCabData
                      ? formatCurrency(selectedCabData.baseFare)
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-bold">Total Fare</span>
                  <span className="text-lg font-extrabold text-primary">
                    {fare > 0 ? formatCurrency(fare) : "—"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!pickup || !drop || !selectedCab}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-secondary shadow-lg transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm Booking
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="mt-3 text-center text-xs text-muted">
                You can cancel within 2 minutes of booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
