"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConnectWallet } from "@/components/web3/connect-wallet";
import { ContractAddress } from "@/components/web3/contract-address";
import { TokenBalance } from "@/components/web3/token-balance";
import { TotalSupply } from "@/components/web3/total-supply";
import { TokenInfo } from "@/components/web3/token-info";
import { AddToMetaMask } from "@/components/web3/add-to-metamask";
import { NetworkStatus } from "@/components/web3/network-status";
import { ExplorerLinks } from "@/components/web3/explorer-links";
import { LiveBadges } from "@/components/web3/live-badges";
import { Skeleton } from "@/components/ui/skeleton";

const SendHnx = dynamic(
  () =>
    import("@/components/web3/send-hnx").then((m) => m.SendHnx),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full rounded-[var(--radius)]" />,
  }
);

export function DashboardSection() {
  return (
    <section id="dashboard" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[110px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live Dashboard"
          title="On-chain Hanix controls"
          description="Connect MetaMask on Base Sepolia to read live balances, inspect the verified contract, add HNX to your wallet, and send tokens."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          <NetworkStatus />
          <ConnectWallet size="lg" showDetails />
          <AddToMetaMask />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <LiveBadges />
        </motion.div>

        <div className="mb-4">
          <ExplorerLinks />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <TokenBalance />
              <TotalSupply />
            </div>
            <ContractAddress />
            <SendHnx />
          </div>
          <TokenInfo />
        </div>
      </div>
    </section>
  );
}
