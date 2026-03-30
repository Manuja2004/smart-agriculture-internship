// frontend/js/language.js — Replaces React LanguageContext
// Must be loaded AFTER translations.js

(function () {
  'use strict';

  function getLanguage() {
    return localStorage.getItem('language') || 'en';
  }

  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }

  function t(key) {
    var lang = getLanguage();
    return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  }

  // Helper: get text based on current language (en, mr, hi)
  function getText(en, mr, hi) {
    var lang = getLanguage();
    if (lang === 'mr') return mr;
    if (lang === 'hi') return hi;
    return en;
  }

  // Set lang attribute on load
  document.documentElement.lang = getLanguage();

  // Expose globally
  window.Lang = { getLanguage: getLanguage, setLanguage: setLanguage, t: t, getText: getText };
})();
