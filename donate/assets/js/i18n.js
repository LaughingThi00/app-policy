const DEFAULT_LANG = "en";
const SUPPORTED_LANGS = ["en", "vi"];

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && key in acc ? acc[key] : undefined), obj);
}

async function loadMessages(lang) {
  const response = await fetch(`./assets/i18n/${lang}.json`, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Cannot load language file: ${lang}`);
  }
  return response.json();
}

function applyLanguageUI(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("bg-white", active);
    btn.classList.toggle("text-accent-700", active);
    btn.classList.toggle("shadow-sm", active);
    btn.classList.toggle("text-gray-500", !active);
  });
}

function applyTranslations(messages) {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const value = getNestedValue(messages, key);
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    const [attrName, key] = node.dataset.i18nAttr.split(":");
    const value = getNestedValue(messages, key);
    if (attrName && typeof value === "string") {
      node.setAttribute(attrName, value);
    }
  });
}

function detectInitialLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved && SUPPORTED_LANGS.includes(saved)) {
    return saved;
  }
  return DEFAULT_LANG;
}

async function setLanguage(lang) {
  const language = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  const messages = await loadMessages(language);
  applyTranslations(messages);
  applyLanguageUI(language);
  localStorage.setItem("lang", language);
}

function setupLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetLang = btn.dataset.lang;
      if (targetLang) {
        await setLanguage(targetLang);
      }
    });
  });
}

async function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  setupLanguageSwitcher();
  try {
    await setLanguage(detectInitialLanguage());
  } catch (_error) {
    await setLanguage(DEFAULT_LANG);
  }
}

document.addEventListener("DOMContentLoaded", init);
