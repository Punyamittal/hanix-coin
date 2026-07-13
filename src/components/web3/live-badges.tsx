"use client";

import { Boxes, ShieldCheck, Activity } from "lucide-react";
import { useHanix } from "@/hooks/useHanix";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateAddress } from "@/lib/utils";

export function LiveBadges() {
  const {
    blockNumber,
    contractAddress,
    ownerFormatted,
    isLoading,
    lastTransferAt,
  } = useHanix();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="clay-pill flex items-center gap-3 px-4 py-3">
        <Activity className="h-4 w-4 shrink-0 text-emerald-400" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Live Chain
          </p>
          {blockNumber !== undefined ? (
            <p className="font-mono text-sm text-foreground">
              Block {blockNumber.toLocaleString()}
            </p>
          ) : (
            <Skeleton className="mt-1 h-4 w-24" />
          )}
        </div>
      </div>

      <div className="clay-pill flex items-center gap-3 px-4 py-3">
        <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Verified Contract
          </p>
          <p className="font-mono text-sm text-foreground">
            {truncateAddress(contractAddress, 4)}
          </p>
        </div>
      </div>

      <div className="clay-pill flex items-center gap-3 px-4 py-3">
        <Boxes className="h-4 w-4 shrink-0 text-gold" />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Owner
          </p>
          {isLoading && !ownerFormatted ? (
            <Skeleton className="mt-1 h-4 w-24" />
          ) : (
            <p className="font-mono text-sm text-foreground">
              {ownerFormatted ?? "—"}
            </p>
          )}
          {lastTransferAt && (
            <p className="text-[10px] text-muted">
              Transfer watched · {new Date(lastTransferAt).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
