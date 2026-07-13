"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import {
  Wallet,
  LogOut,
  RefreshCw,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { TARGET_CHAIN } from "@/lib/wagmi";
import {
  blockIdenticonGradient,
  explorerAddressUrl,
  getChecksumAddress,
} from "@/lib/web3";

function hasInjectedProvider() {
  return typeof window !== "undefined" && Boolean(window.ethereum);
}

async function waitForInjectedProvider(timeoutMs = 2500) {
  if (hasInjectedProvider()) return true;

  return new Promise<boolean>((resolve) => {
    const started = Date.now();

    const onEthereum = () => {
      cleanup();
      resolve(true);
    };

    const tick = window.setInterval(() => {
      if (hasInjectedProvider()) {
        cleanup();
        resolve(true);
      } else if (Date.now() - started >= timeoutMs) {
        cleanup();
        resolve(false);
      }
    }, 100);

    const cleanup = () => {
      window.clearInterval(tick);
      window.removeEventListener("ethereum#initialized", onEthereum);
    };

    window.addEventListener("ethereum#initialized", onEthereum, {
      once: true,
    });
  });
}

export function ConnectWallet({
  variant = "secondary",
  size = "default",
  showDetails = false,
}: {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  showDetails?: boolean;
}) {
  const { address, isConnected, chainId, status } = useAccount();
  const { connectAsync, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [providerReady, setProviderReady] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    void waitForInjectedProvider().then(setProviderReady);
  }, []);

  const wrongNetwork = isConnected && chainId !== TARGET_CHAIN.id;
  const connector = connectors[0];

  const onConnect = async () => {
    reset();

    const ready = await waitForInjectedProvider();
    if (!ready || !hasInjectedProvider()) {
      toast.error("Wallet provider not found", {
        description:
          "Install MetaMask (or unlock it), then refresh this page and try again.",
        action: {
          label: "Get MetaMask",
          onClick: () =>
            window.open("https://metamask.io/download/", "_blank"),
        },
      });
      return;
    }

    if (!connector) {
      toast.error("No connector available");
      return;
    }

    setConnecting(true);
    try {
      await connectAsync({ connector, chainId: TARGET_CHAIN.id });
      toast.success("Wallet connected");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Connection failed";

      if (/provider not found/i.test(message)) {
        toast.error("Wallet provider not found", {
          description:
            "MetaMask may still be injecting. Refresh the page and click Connect again.",
        });
      } else if (/rejected|denied/i.test(message)) {
        toast.error("Connection rejected");
      } else {
        toast.error("Connection failed", {
          description: message.slice(0, 140),
        });
      }
    } finally {
      setConnecting(false);
    }
  };

  const onCopy = async () => {
    if (!address) return;
    const checksummed = getChecksumAddress(address) ?? address;
    try {
      await navigator.clipboard.writeText(checksummed);
      setCopied(true);
      toast.success("Address copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy address");
    }
  };

  if (isConnected && address && wrongNetwork) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size={size}
          disabled={isSwitching}
          onClick={() =>
            switchChain(
              { chainId: TARGET_CHAIN.id },
              {
                onSuccess: () => toast.success("Switched to Base Sepolia"),
                onError: (err) =>
                  toast.error("Network switch failed", {
                    description: err.message.slice(0, 120),
                  }),
              }
            )
          }
          aria-label="Switch to Base Sepolia"
        >
          {isSwitching ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          )}
          Switch to Base Sepolia
        </Button>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <div className="clay-pill inline-flex items-center gap-2 px-2.5 py-1.5">
          <span
            aria-hidden
            className="h-7 w-7 shrink-0 rounded-full border border-gold/30"
            style={{ background: blockIdenticonGradient(address) }}
          />
          <span className="font-mono text-sm text-foreground">
            {truncateAddress(address, 4)}
          </span>
          <button
            type="button"
            onClick={onCopy}
            className="rounded p-1 text-muted transition hover:text-gold"
            aria-label="Copy wallet address"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-gold" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <a
            href={explorerAddressUrl(address)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded p-1 text-muted transition hover:text-gold"
            aria-label="View wallet on BaseScan"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        {showDetails && (
          <span className="text-xs text-emerald-400">
            {status === "connected" ? "Connected" : status}
          </span>
        )}
        <Button
          variant="outline"
          size={size}
          onClick={() => {
            disconnect();
            toast.message("Wallet disconnected");
          }}
          aria-label="Disconnect wallet"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        variant={variant}
        size={size}
        disabled={isPending || connecting || !connector}
        onClick={() => void onConnect()}
        aria-label="Connect wallet"
      >
        <Wallet className="h-4 w-4" />
        {isPending || connecting
          ? "Connecting…"
          : providerReady
            ? "Connect Wallet"
            : "Detecting wallet…"}
      </Button>
      {error && (
        <p className="max-w-xs text-xs text-red-400">{error.message}</p>
      )}
      {!providerReady && (
        <p className="max-w-xs text-xs text-muted">
          Waiting for MetaMask. If nothing appears, install it and refresh.
        </p>
      )}
    </div>
  );
}
