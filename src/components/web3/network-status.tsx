"use client";

import { useAccount } from "wagmi";
import { useHanix } from "@/hooks/useHanix";
import { TARGET_CHAIN } from "@/lib/wagmi";
import { Skeleton } from "@/components/ui/skeleton";

export function NetworkStatus() {
  const { isConnected, chainId } = useAccount();
  const { blockNumber } = useHanix();

  if (!isConnected) {
    return (
      <div className="clay-pill inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted">
        <span className="h-2 w-2 rounded-full bg-muted" />
        Wallet disconnected
      </div>
    );
  }

  const onTarget = chainId === TARGET_CHAIN.id;

  return (
    <div
      className={`clay-pill inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium ${
        onTarget ? "text-emerald-400" : "text-red-400"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          onTarget
            ? "animate-pulse bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            : "bg-red-400"
        }`}
      />
      {onTarget ? "Connected to Base Sepolia" : "Wrong Network"}
      {onTarget && (
        <span className="border-l border-white/10 pl-2 font-mono text-[10px] text-muted">
          {blockNumber !== undefined ? (
            `#${blockNumber.toLocaleString()}`
          ) : (
            <Skeleton className="inline-block h-3 w-10" />
          )}
        </span>
      )}
    </div>
  );
}
