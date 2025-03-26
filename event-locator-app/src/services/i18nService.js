import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

const i18nService = {
    init: (defaultLanguage) => {
        i18next
            .use(Backend)
            .init({
                lng: defaultLanguage,
                fallbackLng: 'en',
                backend: {
                    loadPath: path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json'),
                },
                interpolation: {
                    escapeValue: false,
                },
            });
    },

    setLanguage: (language) => {
        i18next.changeLanguage(language);
    },

    translate: (key, options) => {
        return i18next.t(key, options);
    },
};

export default i18nService;