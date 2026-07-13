import { getAddress, isAddress, type Address } from "viem";
import { HANIX_CONTRACT } from "@/lib/contracts";

export const EXPLORER_BASE = "https://sepolia.basescan.org";

export function getChecksumAddress(value: string): Address | null {
  if (!isAddress(value)) return null;
  try {
    return getAddress(value);
  } catch {
    return null;
  }
}

export function assertAddress(value: string): Address {
  const checksummed = getChecksumAddress(value);
  if (!checksummed) {
    throw new Error("Invalid Ethereum address");
  }
  return checksummed;
}

export function explorerAddressUrl(address: string) {
  return `${EXPLORER_BASE}/address/${address}`;
}

export function explorerTokenUrl(address: string = HANIX_CONTRACT.address) {
  return `${EXPLORER_BASE}/token/${address}`;
}

export function explorerTxUrl(hash: string) {
  return `${EXPLORER_BASE}/tx/${hash}`;
}

export function explorerTokenTransfersUrl(
  address: string = HANIX_CONTRACT.address
) {
  return `${EXPLORER_BASE}/token/${address}#transfers`;
}

export function isTargetChain(chainId: number | undefined) {
  return chainId === HANIX_CONTRACT.chainId;
}

export function shortenHash(hash: string, chars = 6) {
  if (!hash || hash.length < chars * 2 + 2) return hash;
  return `${hash.slice(0, chars + 2)}…${hash.slice(-chars)}`;
}

export function blockIdenticonGradient(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash) % 360;
  const h2 = (h1 + 48) % 360;
  return `linear-gradient(135deg, hsl(${h1} 65% 45%), hsl(${h2} 70% 28%))`;
}
