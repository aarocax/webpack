export { translator };

import { language_es } from './languages/language_es.js';
import { language_en } from './languages/language_en.js';

function translator(string) {
	var t = (window.location.pathname.indexOf("/es/") === -1) ? language_en : language_es;
	return (string in t) ? t[string] : string;
}
