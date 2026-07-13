"use client";

import { Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { useHanix } from "@/hooks/useHanix";
import { Skeleton } from "@/components/ui/skeleton";

export function TokenBalance() {
  const { isConnected } = useAccount();
  const { balanceFormatted, isBalanceLoading } = useHanix();

  return (
    <div className="clay h-full p-5">
      <div className="relative z-10">
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-gold">
          <Wallet className="h-4 w-4" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          Your Balance
        </p>
        {!isConnected ? (
          <p className="mt-2 text-sm text-muted">Connect wallet to read balance</p>
        ) : isBalanceLoading && !balanceFormatted ? (
          <Skeleton className="mt-3 h-8 w-36" />
        ) : (
          <p className="mt-2 font-head text-2xl uppercase tracking-tight text-foreground">
            {balanceFormatted}
          </p>
        )}
      </div>
    </div>
  );
}
