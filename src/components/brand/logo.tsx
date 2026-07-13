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
  xl: "h-28 w-28 md:h-36 md:w-36",
};

const pixelSizes = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 144,
};

export function Logo({ className, showWordmark = false, size = "md" }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/coin.png"
        alt={showWordmark ? "" : "Hanix logo"}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className={cn(sizes[size], "shrink-0 object-contain")}
        priority={size === "xl"}
        aria-hidden={showWordmark}
      />
      {showWordmark && (
        <span className="font-head text-lg uppercase tracking-[0.14em] text-foreground">
          HANIX
        </span>
      )}
    </div>
  );
}
