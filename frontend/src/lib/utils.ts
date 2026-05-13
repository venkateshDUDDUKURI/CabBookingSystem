export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateBookingId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "CB-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function estimateDistance(pickup: string, drop: string): number {
  const hash = (pickup + drop)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 2 + (hash % 25);
}

export function estimateFare(
  distance: number,
  baseFare: number,
  perKmRate: number
): number {
  return baseFare + distance * perKmRate;
}

export function estimateDuration(distance: number): number {
  return Math.ceil(distance * 3);
}
