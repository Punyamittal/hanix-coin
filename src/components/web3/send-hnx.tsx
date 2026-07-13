"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits } from "viem";
import { Send, Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { HANIX_CONTRACT } from "@/lib/contracts";
import { hanixAbi } from "@/lib/abi/hanix";
import { useHanix } from "@/hooks/useHanix";
import { TARGET_CHAIN } from "@/lib/wagmi";
import {
  assertAddress,
  explorerTxUrl,
  getChecksumAddress,
  shortenHash,
} from "@/lib/web3";

export function SendHnx() {
  const { address, isConnected, chainId } = useAccount();
  const { decimals, symbol, balanceFormatted, balance, refetch } = useHanix();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");

  const { writeContract, data: hash, isPending, error, reset } =
    useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const wrongNetwork = isConnected && chainId !== TARGET_CHAIN.id;

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success("Transfer confirmed", {
        description: shortenHash(hash),
        action: {
          label: "Explorer",
          onClick: () => window.open(explorerTxUrl(hash), "_blank"),
        },
      });
      void refetch();
    }
  }, [isSuccess, hash, refetch]);

  useEffect(() => {
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("user rejected") || msg.includes("denied")) {
        toast.error("Transaction rejected");
      } else {
        toast.error("Transfer failed", {
          description: error.message.slice(0, 140),
        });
      }
    }
  }, [error]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    reset();

    if (!isConnected || !address) {
      setFormError("Connect your wallet first.");
      return;
    }
    if (wrongNetwork) {
      setFormError("Switch to Base Sepolia to send HNX.");
      return;
    }

    let recipient: `0x${string}`;
    try {
      recipient = assertAddress(to);
    } catch {
      setFormError("Enter a valid recipient address.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setFormError("Enter an amount greater than zero.");
      return;
    }

    try {
      const value = parseUnits(amount, decimals);
      if (balance !== undefined && value > balance) {
        setFormError("Insufficient HNX balance.");
        return;
      }

      writeContract({
        address: HANIX_CONTRACT.address as `0x${string}`,
        abi: hanixAbi,
        functionName: "transfer",
        args: [recipient, value],
      });
      toast.message("Confirm in your wallet…");
    } catch {
      setFormError("Could not parse amount.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="clay-soft space-y-4 p-5 sm:p-6">
      <div className="relative z-10">
        <div className="mb-1 flex items-center gap-2">
          <Send className="h-4 w-4 text-gold" />
          <h3 className="font-head text-lg uppercase tracking-tight text-foreground">
            Send HNX
          </h3>
        </div>
        <p className="text-sm text-muted">
          Transfer on Base Sepolia. Balance:{" "}
          {balanceFormatted ?? "—"}
        </p>
      </div>

      <div className="relative z-10 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            Recipient
          </span>
          <input
            value={to}
            onChange={(e) => {
              const raw = e.target.value.trim();
              const checksummed = getChecksumAddress(raw);
              setTo(checksummed ?? raw);
            }}
            placeholder="0x…"
            className="w-full rounded-[var(--radius)] border border-gold/25 bg-black/40 px-4 py-3 font-mono text-sm text-foreground outline-none transition focus:border-gold"
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            Amount ({symbol})
          </span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            inputMode="decimal"
            className="w-full rounded-[var(--radius)] border border-gold/25 bg-black/40 px-4 py-3 font-mono text-sm text-foreground outline-none transition focus:border-gold"
          />
        </label>
      </div>

      {formError && (
        <p className="relative z-10 text-sm text-red-400">{formError}</p>
      )}

      {isSuccess && hash && (
        <p className="relative z-10 inline-flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          Sent.{" "}
          <a
            href={explorerTxUrl(hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline"
          >
            {shortenHash(hash)}
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>
      )}

      <div className="relative z-10">
        <Button
          type="submit"
          disabled={!isConnected || isPending || isConfirming || wrongNetwork}
          className="w-full"
        >
          {(isPending || isConfirming) && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {isPending
            ? "Confirm in wallet…"
            : isConfirming
              ? "Sending…"
              : `Send ${symbol}`}
        </Button>
      </div>
    </form>
  );
}
