"use client";

import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useReadContracts,
  useWatchBlockNumber,
  useWatchContractEvent,
} from "wagmi";
import { formatUnits, type Address } from "viem";
import { HANIX_CONTRACT } from "@/lib/contracts";
import { hanixAbi } from "@/lib/abi/hanix";
import { formatTokenAmount, truncateAddress } from "@/lib/utils";
import { useCallback, useState } from "react";

const contract = {
  address: HANIX_CONTRACT.address as Address,
  abi: hanixAbi,
} as const;

export function useTotalSupply() {
  return useReadContract({
    ...contract,
    functionName: "totalSupply",
    query: {
      staleTime: 12_000,
    },
  });
}

export function useTokenBalance(account?: Address) {
  return useReadContract({
    ...contract,
    functionName: "balanceOf",
    args: account ? [account] : undefined,
    query: {
      enabled: Boolean(account),
      staleTime: 8_000,
    },
  });
}

export function useTokenOwner() {
  return useReadContract({
    ...contract,
    functionName: "owner",
    query: {
      staleTime: 60_000,
    },
  });
}

export function useLiveBlockNumber() {
  return useBlockNumber({
    watch: true,
    query: {
      staleTime: 4_000,
    },
  });
}

/** Aggregated on-chain reads + live watchers for the dashboard */
export function useHanix() {
  const { address, isConnected, chainId, status } = useAccount();
  const [lastTransferAt, setLastTransferAt] = useState<number | null>(null);

  const infoQuery = useReadContracts({
    contracts: [
      { ...contract, functionName: "name" },
      { ...contract, functionName: "symbol" },
      { ...contract, functionName: "decimals" },
      { ...contract, functionName: "totalSupply" },
      { ...contract, functionName: "owner" },
      { ...contract, functionName: "MAX_SUPPLY" },
    ],
    query: {
      staleTime: 20_000,
    },
  });

  const balanceQuery = useTokenBalance(address);
  const blockQuery = useLiveBlockNumber();

  const refetchAll = useCallback(async () => {
    await Promise.all([infoQuery.refetch(), balanceQuery.refetch(), blockQuery.refetch()]);
  }, [infoQuery, balanceQuery, blockQuery]);

  useWatchBlockNumber({
    onBlockNumber: () => {
      void balanceQuery.refetch();
    },
  });

  useWatchContractEvent({
    ...contract,
    eventName: "Transfer",
    onLogs: () => {
      setLastTransferAt(Date.now());
      void refetchAll();
    },
  });

  const name =
    (infoQuery.data?.[0]?.result as string | undefined) ?? HANIX_CONTRACT.name;
  const symbol =
    (infoQuery.data?.[1]?.result as string | undefined) ??
    HANIX_CONTRACT.symbol;
  const decimals =
    (infoQuery.data?.[2]?.result as number | undefined) ??
    HANIX_CONTRACT.decimals;
  const totalSupply = infoQuery.data?.[3]?.result as bigint | undefined;
  const owner = infoQuery.data?.[4]?.result as Address | undefined;
  const maxSupply = infoQuery.data?.[5]?.result as bigint | undefined;
  const balance = balanceQuery.data;

  return {
    contractAddress: HANIX_CONTRACT.address as Address,
    chainId: HANIX_CONTRACT.chainId,
    networkName: "Base Sepolia",
    name,
    symbol,
    decimals,
    totalSupply,
    totalSupplyFormatted: totalSupply
      ? `${formatTokenAmount(totalSupply, decimals, 0)} ${symbol}`
      : null,
    maxSupply,
    maxSupplyFormatted: maxSupply
      ? `${formatTokenAmount(maxSupply, decimals, 0)} ${symbol}`
      : null,
    owner,
    ownerFormatted: owner ? truncateAddress(owner, 4) : null,
    balance,
    balanceFormatted:
      isConnected && balance !== undefined
        ? `${formatTokenAmount(balance, decimals, 4)} ${symbol}`
        : null,
    blockNumber: blockQuery.data,
    lastTransferAt,
    walletStatus: status,
    isConnected,
    walletChainId: chainId,
    isLoading: infoQuery.isLoading,
    isBalanceLoading: balanceQuery.isLoading,
    isError: infoQuery.isError || balanceQuery.isError,
    refetch: refetchAll,
    formatUnits: (value: bigint) => formatUnits(value, decimals),
  };
}
