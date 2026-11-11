import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// En algunas versiones de Node el localStorage global no es utilizable
// dentro de jsdom; se instala un Storage en memoria equivalente.
function createMemoryStorage() {
  let data = {};
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
    clear: () => { data = {}; },
    key: (i) => Object.keys(data)[i] ?? null,
    get length() { return Object.keys(data).length; },
  };
}

['localStorage', 'sessionStorage'].forEach((name) => {
  Object.defineProperty(globalThis, name, {
    value: createMemoryStorage(),
    configurable: true,
    writable: true,
  });
  Object.defineProperty(window, name, {
    value: globalThis[name],
    configurable: true,
    writable: true,
  });
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
afterEach(() => cleanup());

// jsdom no implementa la reproducción de medios.
window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLElement.prototype.scrollBy = () => {};
