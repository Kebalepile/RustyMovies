import serviceWorker from "./workers/serviceWorker/installServiceWorker.js";
import nav from "./components/navigation/nav.js";
import pwaInstallPrompt from "./components/prompts/pwaInstallPrompt.js";
import Home from "./components/pages/home.js";

nav();

const installButton = document.querySelector("#install");

pwaInstallPrompt(installButton);

/**
 * @description remove install button once web app is installed
 */
if (window.matchMedia(" (display-mode: standalone)").matches) {
  // PWA is installed

  if (installButton) installButton.remove();
}
Home();
serviceWorker();
// (function () {
//   let intervalId = setInterval(function a() {
//       try {
//           (function b(i) {
//               if (('' + (i / i)).length !== 1 || i % 20 === 0) {
//                   (function () { }).constructor('debugger')()
//               } else {
//                   debugger
//               }
//               b(++i)
//           })(0)
//       } catch (e) {
//           clearInterval(intervalId);
//           intervalId = setInterval(a);
//       }
//   });
// })();
