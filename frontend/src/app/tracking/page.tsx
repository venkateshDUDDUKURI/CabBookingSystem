"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/stores/booking-store";
import { formatCurrency } from "@/lib/utils";
import {
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Navigation,
  Clock,
  Shield,
  X,
  Car,
} from "lucide-react";
import toast from "react-hot-toast";

const RIDE_STAGES = [
  { status: "searching", label: "Searching for driver...", progress: 10 },
  { status: "confirmed", label: "Driver assigned!", progress: 30 },
  { status: "arriving", label: "Driver is on the way", progress: 50 },
  { status: "in_progress", label: "Ride in progress", progress: 75 },
  { status: "completed", label: "Ride completed!", progress: 100 },
] as const;

export default function TrackingPage() {
  const router = useRouter();
  const { currentRide, updateRideStatus, cancelRide } = useBookingStore();
  const [stageIndex, setStageIndex] = useState(0);
  const [driverEta, setDriverEta] = useState(5);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const simulationStarted = useRef(false);

  useEffect(() => {
    if (!currentRide) {
      router.push("/book");
      return;
    }

    if (simulationStarted.current) return;
    simulationStarted.current = true;

    const stageTimers = [3000, 4000, 5000, 8000];
    let currentIndex = 0;

    const advanceStage = () => {
      if (currentIndex < stageTimers.length) {
        currentIndex++;
        setStageIndex(currentIndex);
        const stage = RIDE_STAGES[currentIndex];
        updateRideStatus(stage.status as Parameters<typeof updateRideStatus>[0]);

        if (stage.status === "confirmed") {
          toast.success("Driver Rajesh Kumar assigned!");
        } else if (stage.status === "arriving") {
          toast("Driver is on the way!");
        } else if (stage.status === "in_progress") {
          toast("Your ride has started!");
        } else if (stage.status === "completed") {
          setShowRating(true);
          toast.success("You have arrived at your destination!");
        }
      }
    };

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;
    for (let i = 0; i < stageTimers.length; i++) {
      delay += stageTimers[i];
      timeouts.push(setTimeout(advanceStage, delay));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [currentRide, router, updateRideStatus]);

  useEffect(() => {
    if (stageIndex >= 2) return;
    const interval = setInterval(() => {
      setDriverEta((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [stageIndex]);

  if (!currentRide) return null;

  const currentStage = RIDE_STAGES[stageIndex];
  const isCompleted = currentStage.status === "completed";
  const isCancelled = currentRide.status === "cancelled";

  const handleCancel = () => {
    cancelRide();
    toast.error("Ride cancelled");
    router.push("/book");
  };

  const handleRatingSubmit = () => {
    setShowRating(false);
    toast.success(`Thanks for rating ${rating} stars!`);
    router.push("/history");
  };

  if (isCancelled) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <X className="mx-auto h-16 w-16 text-danger" />
          <h1 className="mt-4 text-2xl font-bold">Ride Cancelled</h1>
          <button
            onClick={() => router.push("/book")}
            className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-secondary"
          >
            Book Another Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Progress Bar */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold">
              {isCompleted ? "Ride Complete" : "Tracking Your Ride"}
            </h1>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {currentRide.id}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-primary">
                {currentStage.label}
              </span>
              <span className="text-muted">{currentStage.progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${currentStage.progress}%` }}
              />
            </div>
          </div>

          {/* Stage indicators */}
          <div className="mt-4 flex justify-between">
            {RIDE_STAGES.map((stage, i) => (
              <div
                key={stage.status}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`h-3 w-3 rounded-full transition-colors ${
                    i <= stageIndex ? "bg-primary" : "bg-border"
                  }`}
                />
                <span className="hidden text-[10px] text-muted sm:block">
                  {stage.label.replace("...", "").replace("!", "")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Map Placeholder */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex h-64 items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="text-center">
                <Car className="mx-auto h-12 w-12 text-primary animate-bounce" />
                <p className="mt-2 text-sm font-medium text-muted">
                  Live map tracking
                </p>
                <p className="text-xs text-muted">
                  (Requires Maps API integration)
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="text-muted">Pickup</span>
                </div>
                <div className="flex-1 border-t border-dashed border-border" />
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-danger" />
                  <span className="text-muted">Drop</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ride Details */}
          <div className="space-y-4">
            {/* Driver Info */}
            {stageIndex >= 1 && (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider">
                  Your Driver
                </h3>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    RK
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">Rajesh Kumar</div>
                    <div className="text-xs text-muted">
                      KA 01 AB 1234 &bull; White Maruti Dzire
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3 w-3 ${
                            s <= 4
                              ? "fill-primary text-primary"
                              : "text-border"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted">4.8</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm font-medium hover:bg-primary/5">
                    <Phone className="h-4 w-4" />
                    Call
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm font-medium hover:bg-primary/5">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </button>
                </div>
              </div>
            )}

            {/* Trip Info */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider">
                Trip Details
              </h3>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                  <div>
                    <div className="text-xs text-muted">Pickup</div>
                    <div className="font-medium">{currentRide.pickup}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-danger" />
                  <div>
                    <div className="text-xs text-muted">Drop-off</div>
                    <div className="font-medium">{currentRide.drop}</div>
                  </div>
                </div>
                <div className="flex gap-4 border-t border-border pt-3">
                  <div className="flex items-center gap-1.5">
                    <Navigation className="h-4 w-4 text-muted" />
                    <span>{currentRide.distance} km</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted" />
                    <span>~{currentRide.duration} min</span>
                  </div>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted">Fare</span>
                  <span className="text-lg font-extrabold text-primary">
                    {formatCurrency(currentRide.fare)}
                  </span>
                </div>
              </div>
            </div>

            {/* ETA / Cancel */}
            {!isCompleted && (
              <div className="flex gap-3">
                {stageIndex < 2 && (
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
                    <Clock className="h-4 w-4" />
                    ETA: {driverEta} min
                  </div>
                )}
                <button className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  <Shield className="h-4 w-4" />
                  SOS
                </button>
                {stageIndex < 3 && (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger hover:bg-danger/20"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Rating Modal */}
        {showRating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-card p-8 text-center shadow-2xl">
              <h2 className="text-xl font-extrabold">Rate your ride</h2>
              <p className="mt-1 text-sm text-muted">
                How was your experience with Rajesh Kumar?
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)}>
                    <Star
                      className={`h-10 w-10 transition-colors ${
                        s <= rating
                          ? "fill-primary text-primary"
                          : "text-border hover:text-primary/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={handleRatingSubmit}
                disabled={rating === 0}
                className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-secondary disabled:opacity-50"
              >
                Submit Rating
              </button>
              <button
                onClick={() => {
                  setShowRating(false);
                  router.push("/history");
                }}
                className="mt-2 text-sm text-muted hover:text-foreground"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
