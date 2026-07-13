export const SITE = {
  name: "Hanix",
  ticker: "HNX",
  tagline: "A modern ERC-20 token built on Base.",
  description:
    "Hanix is a lightweight cryptocurrency created as a full-stack Web3 project showcasing smart contract development, blockchain deployment, and modern decentralized application architecture.",
  url: "https://hanix.app",
} as const;

export const LINKS = {
  contractAddress: "0x0000000000000000000000000000000000000000",
  basescan: "https://basescan.org/token/0x0000000000000000000000000000000000000000",
  github: "https://github.com/hanix-protocol/hanix",
  whitepaper: "/whitepaper.pdf",
  documentation: "https://docs.hanix.app",
  twitter: "https://x.com/hanixprotocol",
  discord: "https://discord.gg/hanix",
  app: "#",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Whitepaper", href: "#whitepaper" },
  { label: "FAQ", href: "#faq" },
] as const;

export const ABOUT_ITEMS = [
  {
    title: "Solidity",
    description:
      "Custom smart contracts written in Solidity with a focus on clarity, gas efficiency, and maintainable architecture.",
  },
  {
    title: "ERC-20 Smart Contracts",
    description:
      "Fully compliant ERC-20 implementation leveraging battle-tested OpenZeppelin standards for token behavior.",
  },
  {
    title: "Base Blockchain",
    description:
      "Deployed on Base for fast finality, Ethereum security, and near-negligible transaction costs.",
  },
  {
    title: "Web3 Wallet Integration",
    description:
      "Seamless wallet connectivity through Wagmi and Viem, ready for real on-chain interactions.",
  },
  {
    title: "Blockchain Security",
    description:
      "Ownership controls, minting restrictions, and transparent on-chain verification built into the contract design.",
  },
  {
    title: "Modern Frontend Development",
    description:
      "A production-grade Next.js interface with motion, accessibility, and a premium design system.",
  },
] as const;

export const FEATURES = [
  {
    icon: "Zap",
    title: "Fast Transactions",
    description: "Built on Base for low fees and near-instant confirmation times.",
  },
  {
    icon: "Shield",
    title: "Secure",
    description: "ERC-20 smart contract using OpenZeppelin for audited building blocks.",
  },
  {
    icon: "Globe",
    title: "Decentralized",
    description: "Runs completely on-chain with no custodial intermediaries.",
  },
  {
    icon: "Coins",
    title: "Low Cost",
    description: "Extremely low deployment and transaction costs on Base L2.",
  },
  {
    icon: "Puzzle",
    title: "Open Source",
    description: "Transparent, verifiable code you can inspect and audit yourself.",
  },
  {
    icon: "Rocket",
    title: "Portfolio Project",
    description: "Built to demonstrate end-to-end blockchain engineering skills.",
  },
] as const;

export const TOKENOMICS = [
  { label: "Token Name", value: "Hanix", icon: "BadgeCheck" },
  { label: "Ticker", value: "HNX", icon: "Hash" },
  { label: "Network", value: "Base", icon: "Network" },
  { label: "Standard", value: "ERC-20", icon: "FileCode" },
  { label: "Total Supply", value: "1,000,000 HNX", icon: "Layers" },
  { label: "Decimals", value: "18", icon: "CircleDot" },
  { label: "Mintable", value: "No", icon: "Lock" },
  { label: "Burnable", value: "Optional", icon: "Flame" },
  { label: "Tax", value: "0%", icon: "Percent" },
  { label: "Owner", value: "Renounced (placeholder)", icon: "UserX" },
] as const;

export const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "complete" as const,
    items: [
      { label: "Smart Contract", done: true },
      { label: "Website", done: true },
      { label: "Base Deployment", done: true },
      { label: "Wallet Integration", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Growth",
    status: "current" as const,
    items: [
      { label: "Explorer Integration", done: false },
      { label: "Analytics Dashboard", done: false },
      { label: "Community Building", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "Expansion",
    status: "upcoming" as const,
    items: [
      { label: "DAO Governance", done: false },
      { label: "NFT Integration", done: false },
      { label: "Staking", done: false },
    ],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is Hanix?",
    answer:
      "Hanix (HNX) is an ERC-20 token deployed on the Base blockchain. It was built as a full-stack Web3 project to demonstrate smart contract development, on-chain deployment, and modern decentralized application architecture.",
  },
  {
    question: "Why Base?",
    answer:
      "Base offers Ethereum-grade security with significantly lower fees and faster confirmations. It is an ideal network for lightweight tokens and applications that prioritize usability without sacrificing decentralization.",
  },
  {
    question: "How can I buy HNX?",
    answer:
      "Once liquidity is available, you can acquire HNX through Base-compatible DEXs using a Web3 wallet. Until then, the contract address and BaseScan link are provided so you can verify the token on-chain.",
  },
  {
    question: "Is this open source?",
    answer:
      "Yes. The smart contract and frontend codebase are intended to be transparent and verifiable. You can review the repository on GitHub and inspect the verified contract on BaseScan.",
  },
  {
    question: "What wallet do I need?",
    answer:
      "Any Base-compatible wallet works — including MetaMask, Coinbase Wallet, Rainbow, and WalletConnect-supported apps. Use the Connect Wallet button to get started once on-chain features are enabled.",
  },
] as const;
