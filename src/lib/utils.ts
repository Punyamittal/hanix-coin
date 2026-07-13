import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string, chars = 4) {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}

export function formatTokenAmount(
  value: bigint | undefined,
  decimals = 18,
  maxFractionDigits = 4
) {
  if (value === undefined) return "—";
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const base = 10n ** BigInt(decimals);
  const whole = abs / base;
  const fraction = abs % base;
  const fractionStr = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, maxFractionDigits)
    .replace(/0+$/, "");
  const wholeFormatted = whole.toLocaleString("en-US");
  const amount = fractionStr
    ? `${wholeFormatted}.${fractionStr}`
    : wholeFormatted;
  return negative ? `-${amount}` : amount;
}

