export function copyText(text: string): void {
  const tag = document.createElement("input");
  tag.setAttribute("id", "cp_zdy_input");
  tag.value = text;
  document.getElementsByTagName("body")[0].appendChild(tag);
  (document.getElementById("cp_zdy_input") as Nullable | HTMLElement).select();
  document.execCommand("copy");
  (document.getElementById("cp_zdy_input") as HTMLElement).remove();
}
