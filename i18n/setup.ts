import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: 'Hello',
      assistantWelcome: "Hi, I'm your Paytm Assistant. How can I help?",
    },
  },
  hi: {
    translation: {
      greeting: 'नमस्ते',
      assistantWelcome: 'हाय, मैं आपका Paytm सहायक हूँ। मैं कैसे मदद कर सकता हूँ?',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;