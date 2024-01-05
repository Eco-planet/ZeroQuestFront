import { Window } from "@/types/IGlobals";

declare const window: Window & typeof globalThis;

export const walletTypes = {
  METAMASK: 1,
  WALLET_CONNECT: 2,
  BINANCE_WALLET: 3,
  COINBASE_WALLET: 4,
  LEDGER: 5,
};

export const walletList = [
  {
    label: "Metamask",
    type: walletTypes.METAMASK,
    img: require("@/assets/images/img_logo_metamask.png"),
  },
  {
    label: "WalletConnect",
    type: walletTypes.WALLET_CONNECT,
    img: require("@/assets/images/img_logo_walletconnect.png"),
  },
  {
    label: "Coinbase Wallet",
    type: walletTypes.COINBASE_WALLET,
    img: require("@/assets/images/img_logo_coinbase.png"),
  },
].filter((wallet: Nullable) => {
  if (
    [walletTypes.METAMASK, walletTypes.COINBASE_WALLET].includes(wallet.type) &&
    !window.ethereum
  )
    return false;
  else return true;
});

export const GAS_FEE_DEFAULT = "500000";

export const GAS_LIMIT_TREE_USDT = "200000";
export const SINGLE_MINT_TREE = "20000";

export const GASS_LIMIT_MAX = "12500000";
