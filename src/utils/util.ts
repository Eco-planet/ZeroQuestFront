export function copyText(text: string): void {
  const tag = document.createElement("input");
  tag.setAttribute("id", "cp_zdy_input");
  tag.value = text;
  document.getElementsByTagName("body")[0].appendChild(tag);
  (document.getElementById("cp_zdy_input") as Nullable | HTMLElement).select();
  document.execCommand("copy");
  (document.getElementById("cp_zdy_input") as HTMLElement).remove();
};

export const errorMsg = (status: number, code: number): string => {
  if (code === 501) {
    return "error.notEnoughMoney";
  } else if (code === 502) {
    return "error.notEnoughFee";
  } else if (code === 503) {
    return "error.notFoundCoin";
  } else if (code === 504) {
    return "error.notFoundWallet";
  } else if (code === 505) {
    return "error.notEnoughBalance";
  } else if (code === 506) {
    return "error.notTransferPoint";
  } else if (code === 507) {
    return "error.passwordNotMatch";
  } else if (code === 508) {
    return "error.notSupportSwap";
  } else if (code === 509) {
    return "error.lessMiniumCostSwap";
  } else if (code === 510) {
    return "error.failedPointSwap";
  } else {
    return 'error.none';
  }
};