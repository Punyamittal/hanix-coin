"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { LINKS } from "@/lib/constants";
import { truncateAddress } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const address = LINKS.contractAddress;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div className="clay-pill inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs text-muted sm:text-sm">
        <span className="hidden text-gold/80 sm:inline">Contract</span>
        <span className="text-foreground">{truncateAddress(address, 6)}</span>
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
            aria-label="View contract on BaseScan"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            BaseScan
          </a>
        </Button>
      </div>
    </div>
  );
}
