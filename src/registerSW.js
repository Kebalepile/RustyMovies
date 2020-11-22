/**
 * @default function init
 * @description registers a service worker and
 *  stores the install prompt event to window.PWAInstallPrompt
 *
 */
export default function init() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.PWAInstallPrompt = e;
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        let registration = await navigator.serviceWorker("/sw.js");
      } catch (err) {}
    });
  }
}
