import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const TARGET_CHAIN = baseSepolia;

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected({
      shimDisconnect: true,
      unstable_shimAsyncInject: 2_000,
    }),
  ],
  transports: {
    [baseSepolia.id]: http(
      process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || undefined,
      {
        retryCount: 3,
        timeout: 20_000,
      }
    ),
  },
  ssr: true,
  multiInjectedProviderDiscovery: true,
});
