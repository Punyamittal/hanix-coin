"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { LINKS } from "@/lib/constants";
import { HANIX_CONTRACT } from "@/lib/contracts";
import { truncateAddress, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getChecksumAddress } from "@/lib/web3";

export function ContractAddress({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const address =
    getChecksumAddress(HANIX_CONTRACT.address) ?? HANIX_CONTRACT.address;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Contract address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      toast.error("Could not copy address");
    }
  };

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div className="clay-pill inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs text-muted sm:text-sm">
          <span className="hidden text-gold/80 sm:inline">Contract</span>
          <span className="text-foreground">
            {truncateAddress(address, 5)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy contract address"}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-gold" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={LINKS.basescan}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Contract
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("clay flex w-full flex-col gap-4 p-5 sm:p-6")}>
      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
          Hanix Contract
        </p>
        <p className="mt-2 break-all font-mono text-sm text-foreground sm:text-base">
          {truncateAddress(address, 5)}
        </p>
        <p className="mt-1 hidden font-mono text-xs text-muted sm:block">
          {address}
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy contract address"}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-gold" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <a
            href={LINKS.basescan}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View contract on BaseScan"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View on BaseScan
          </a>
        </Button>
      </div>
    </div>
  );
}
