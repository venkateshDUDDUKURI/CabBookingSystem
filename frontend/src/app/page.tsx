import Link from "next/link";
import {
  Car,
  Shield,
  Clock,
  MapPin,
  CreditCard,
  Star,
  ArrowRight,
  Phone,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your cab in real-time on the map from pickup to destination.",
  },
  {
    icon: Shield,
    title: "Safe Rides",
    description: "Verified drivers, SOS button, and ride-sharing with trusted contacts.",
  },
  {
    icon: Clock,
    title: "Quick Pickup",
    description: "Average pickup time under 5 minutes in metro cities.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "Pay via UPI, cards, wallets, or cash. Transparent fare estimates.",
  },
  {
    icon: Star,
    title: "Rated Drivers",
    description: "Choose from top-rated drivers with verified profiles and reviews.",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Round-the-clock customer support via chat, call, or email.",
  },
];

const stats = [
  { value: "10M+", label: "Rides Completed" },
  { value: "50K+", label: "Active Drivers" },
  { value: "100+", label: "Cities Covered" },
  { value: "4.8", label: "Average Rating" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Car className="h-4 w-4" />
              Trusted by millions
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your ride, your way —{" "}
              <span className="text-primary">anytime, anywhere.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Book a cab in seconds. Track your ride in real-time. Pay
              effortlessly. Experience the future of urban mobility with
              CabRide.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-secondary shadow-lg transition-all hover:bg-primary-dark hover:shadow-primary/25"
              >
                Book a Ride
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-8 py-3.5 text-base font-bold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why choose <span className="text-primary">CabRide</span>?
            </h2>
            <p className="mt-4 text-lg text-muted">
              Everything you need for a seamless ride experience
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-secondary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted">
              Book your ride in 3 easy steps
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter Location",
                desc: "Type your pickup and drop-off locations or use GPS to auto-detect.",
              },
              {
                step: "02",
                title: "Choose a Cab",
                desc: "Pick from Mini, Sedan, SUV, or Premium based on your needs and budget.",
              },
              {
                step: "03",
                title: "Enjoy the Ride",
                desc: "Your driver arrives, track in real-time, and pay seamlessly at the end.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-secondary">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
            Ready to ride?
          </h2>
          <p className="mt-4 text-lg text-secondary/70">
            Download the app or book right from your browser. Your first ride is
            on us!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-secondary/90"
            >
              Book Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-secondary/30 px-8 py-3.5 text-base font-bold text-secondary transition-all hover:border-secondary/50 hover:bg-secondary/5"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
