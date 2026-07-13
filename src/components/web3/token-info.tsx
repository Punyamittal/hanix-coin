"use client";

import { BadgeCheck, ExternalLink } from "lucide-react";
import { useHanix } from "@/hooks/useHanix";
import { truncateAddress } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  explorerAddressUrl,
  explorerTokenUrl,
} from "@/lib/web3";

export function TokenInfo() {
  const {
    name,
    symbol,
    decimals,
    contractAddress,
    owner,
    ownerFormatted,
    networkName,
    blockNumber,
    isLoading,
  } = useHanix();

  const rows: Array<{
    label: string;
    value: string | null;
    href?: string;
    loading?: boolean;
  }> = [
    { label: "Name", value: name, loading: isLoading },
    { label: "Ticker", value: symbol, loading: isLoading },
    { label: "Network", value: networkName },
    { label: "Decimals", value: String(decimals), loading: isLoading },
    {
      label: "Owner",
      value: ownerFormatted,
      href: owner ? explorerAddressUrl(owner) : undefined,
      loading: isLoading,
    },
    {
      label: "Block",
      value: blockNumber !== undefined ? blockNumber.toLocaleString() : null,
    },
    { label: "Verified", value: "✅ Basescan" },
    {
      label: "Contract",
      value: truncateAddress(contractAddress, 4),
      href: explorerTokenUrl(contractAddress),
    },
  ];

  return (
    <div className="clay-gold h-full p-5">
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-gold" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            Token Info
          </p>
        </div>
        <dl className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0"
            >
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">
                {row.label}
              </dt>
              <dd className="text-right font-medium text-foreground">
                {row.loading && !row.value ? (
                  <Skeleton className="ml-auto h-4 w-20" />
                ) : row.href && row.value ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-sm text-gold hover:underline"
                  >
                    {row.value}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  (row.value ?? "—")
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
