import { LINKS } from "@/lib/constants";
import { HANIX_CONTRACT } from "@/lib/contracts";
import { truncateAddress } from "@/lib/utils";

export function HeroContractBadge() {
  const address = HANIX_CONTRACT.address;

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div className="clay-pill inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs text-muted sm:text-sm">
        <span className="hidden text-gold/80 sm:inline">Contract</span>
        <span className="text-foreground">{truncateAddress(address, 5)}</span>
      </div>
      <a
        href={LINKS.basescan}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-pill inline-flex h-9 items-center gap-2 px-4 text-xs font-semibold text-foreground transition hover:border-gold/50 hover:bg-gold/10"
      >
        View Contract
      </a>
    </div>
  );
}
