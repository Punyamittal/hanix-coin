import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36",
};

const pixelSizes = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 144,
};

export function Logo({ className, showWordmark = false, size = "md" }: LogoProps) {
  const px = pixelSizes[size];
  const isHero = size === "xl";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {isHero ? (
        // Native img avoids /_next/image round-trip so the LCP coin paints sooner.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/coin.png"
          alt={showWordmark ? "" : "Hanix logo"}
          width={px}
          height={px}
          decoding="sync"
          fetchPriority="high"
          className={cn(sizes[size], "shrink-0 object-contain")}
          aria-hidden={showWordmark}
        />
      ) : (
        <Image
          src="/coin.png"
          alt={showWordmark ? "" : "Hanix logo"}
          width={px}
          height={px}
          sizes={`${px}px`}
          quality={75}
          className={cn(sizes[size], "shrink-0 object-contain")}
          aria-hidden={showWordmark}
        />
      )}
      {showWordmark && (
        <span className="font-head text-lg uppercase tracking-[0.14em] text-foreground">
          HANIX
        </span>
      )}
    </div>
  );
}
