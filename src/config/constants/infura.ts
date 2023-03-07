const infuraIds = [
  "63769a285db84fa0808e1c8c4b625504",
  "94db4720d1424890a0b42e26259feebd",
  "ef1dd383f7b24535a0f596117898f7c4",
  "dab8745ec8b24d5093a08a837a25282c",
  "623f2f247aa542519ccfc03d39dd5fbc", // eco
  "299cc7bc201f4ff090f8c470c62538ba", // eco
  "6de866e4f6284a5bab5a596b605c0a09", // eco
  "f5b78972d5db4c288edb8fe9cf19bab6", // eco
];

const randomI = Math.floor(Math.random() * infuraIds.length + 1) - 1;
export const randomInfuraId = infuraIds[randomI];

export const infuraUrl = {
  1: "https://mainnet.infura.io/v3/" + randomInfuraId,
  5: "https://goerli.infura.io/v3/" + randomInfuraId,
  11155111: "https://sepolia.infura.io/v3/" + randomInfuraId,
};
