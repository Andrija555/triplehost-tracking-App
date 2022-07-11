import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import { getFromCookies } from "util/functions";

// Translation files
import en from "./translations/en.json";
import hr from "./translations/hr.json";

const resources = {
	en: {
		translation: en,
	},
	hr: {
		translation: hr,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: getFromCookies("lang") || "en",

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
