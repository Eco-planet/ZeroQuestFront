//import { Nullable } from "@/shims-vue";

// import { ExternalProvider } from '@ethersproject/providers'
interface ISystemConfig {
  dappType: number;
}

export interface Window {
  systemConfig: ISystemConfig;
  // ethereum: ExternalProvider
  ethereum: Nullable;
}
