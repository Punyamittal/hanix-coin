"use client";

import { Layers } from "lucide-react";
import { formatUnits } from "viem";
import { useTotalSupply } from "@/hooks/useHanix";
import { HANIX_CONTRACT } from "@/lib/contracts";
import { Skeleton } from "@/components/ui/skeleton";

export function TotalSupply() {
  const { data, isLoading, isError, isFetching } = useTotalSupply();

  const formatted =
    data !== undefined
      ? Number(formatUnits(data, HANIX_CONTRACT.decimals)).toLocaleString(
          "en-US"
        )
      : null;

  return (
    <div className="clay h-full p-5">
      <div className="relative z-10">
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-gold">
          <Layers className="h-4 w-4" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          Total Supply
        </p>
        {isLoading ? (
          <Skeleton className="mt-3 h-8 w-40" />
        ) : isError ? (
          <p className="mt-2 text-sm text-red-400">RPC unavailable</p>
        ) : (
          <p className="mt-2 font-head text-2xl uppercase tracking-tight text-foreground">
            {formatted} {HANIX_CONTRACT.symbol}
          </p>
        )}
        <p className="mt-1 text-xs text-muted">
          Live from Base Sepolia
          {isFetching && !isLoading ? " · syncing" : ""}
        </p>
      </div>
    </div>
  );
}

export default TotalSupply;
