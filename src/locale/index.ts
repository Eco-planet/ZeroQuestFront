import { createI18n } from "vue-i18n";
import en from "./modules/en";
import kr from "./modules/kr";
import LS from "@/utils/localStorage";
import { locales } from "@/config/constants/locale";

export default createI18n({
  locale: LS.getItem("locale") || locales[0].name,
  messages: {
    en,
    kr,
  },
});
