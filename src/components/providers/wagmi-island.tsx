"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const Web3ReadyContext = createContext(false);

export function useWeb3Ready() {
  return useContext(Web3ReadyContext);
}

export function WagmiIsland({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [WagmiTree, setWagmiTree] = useState<ComponentType<{
    children: ReactNode;
  }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const load = () => {
      void import("@/components/providers/wagmi-tree").then((mod) => {
        if (!cancelled) setWagmiTree(() => mod.WagmiTree);
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(load, { timeout: 2500 });
    } else {
      timer = setTimeout(load, 200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  if (!WagmiTree) {
    return (
      <Web3ReadyContext.Provider value={false}>
        {fallback ?? (
          <Button variant="outline" disabled>
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </Web3ReadyContext.Provider>
    );
  }

  return (
    <Web3ReadyContext.Provider value>
      <WagmiTree>{children}</WagmiTree>
    </Web3ReadyContext.Provider>
  );
}
