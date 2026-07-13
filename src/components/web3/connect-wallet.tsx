"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";

export function ConnectWallet({
  variant = "secondary",
  size = "default",
}: {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={() => disconnect()}
        aria-label="Disconnect wallet"
      >
        <LogOut className="h-4 w-4" />
        {truncateAddress(address)}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      disabled={isPending}
      onClick={() => {
        const connector = connectors[0];
        if (connector) connect({ connector });
      }}
      aria-label="Connect wallet"
    >
      <Wallet className="h-4 w-4" />
      {isPending ? "Connecting…" : "Connect Wallet"}
    </Button>
  );
}
