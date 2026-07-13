"use client";

import { ExternalLink, FileCode2, History, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { HANIX_CONTRACT } from "@/lib/contracts";
import {
  explorerAddressUrl,
  explorerTokenTransfersUrl,
  explorerTokenUrl,
} from "@/lib/web3";

export function ExplorerLinks() {
  const { address, isConnected } = useAccount();

  return (
    <div className="clay p-4">
      <div className="relative z-10 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <a
            href={explorerTokenUrl(HANIX_CONTRACT.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileCode2 className="h-3.5 w-3.5" />
            View Contract
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href={explorerTokenTransfersUrl(HANIX_CONTRACT.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <History className="h-3.5 w-3.5" />
            View Transactions
          </a>
        </Button>
        {isConnected && address ? (
          <Button variant="outline" size="sm" asChild>
            <a
              href={explorerAddressUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Wallet className="h-3.5 w-3.5" />
              View Wallet
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <Wallet className="h-3.5 w-3.5" />
            View Wallet
          </Button>
        )}
        <Button variant="secondary" size="sm" asChild>
          <a
            href={explorerAddressUrl(HANIX_CONTRACT.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open BaseScan
          </a>
        </Button>
      </div>
    </div>
  );
}
