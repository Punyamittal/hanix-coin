"use client";

import { useState } from "react";
import { PlusCircle, Check, AlertTriangle } from "lucide-react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { HANIX_CONTRACT } from "@/lib/contracts";
import { useHanix } from "@/hooks/useHanix";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown;
      }) => Promise<unknown>;
    };
  }
}

export function AddToMetaMask() {
  const { isConnected } = useAccount();
  const { symbol, decimals } = useHanix();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);

  const addToken = async () => {
    if (!window.ethereum) {
      setStatus("error");
      toast.error("MetaMask not detected");
      return;
    }

    setPending(true);
    try {
      const added = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: HANIX_CONTRACT.address,
            symbol: symbol || HANIX_CONTRACT.symbol,
            decimals: decimals || HANIX_CONTRACT.decimals,
            image: `${window.location.origin}/coin.png`,
          },
        },
      });

      if (added) {
        setStatus("success");
        toast.success("HNX added to MetaMask");
      } else {
        setStatus("error");
        toast.error("Token was not added");
      }
    } catch {
      setStatus("error");
      toast.error("Could not add token");
    } finally {
      setPending(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      disabled={!isConnected || pending}
      onClick={addToken}
      aria-label="Add HNX to MetaMask"
      className="w-full sm:w-auto"
    >
      {status === "success" ? (
        <Check className="h-4 w-4 text-gold" />
      ) : status === "error" ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <PlusCircle className="h-4 w-4" />
      )}
      {!isConnected
        ? "Connect wallet first"
        : pending
          ? "Adding…"
          : status === "success"
            ? "Added to MetaMask"
            : status === "error"
              ? "Failed — try again"
              : "Add HNX to MetaMask"}
    </Button>
  );
}
