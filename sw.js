if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const f=e=>i(e,o),l={module:{uri:o},exports:c,require:f};s[o]=Promise.all(r.map((e=>l[e]||f(e)))).then((e=>(n(...e),c)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Callback-658a7e10.js",revision:null},{url:"assets/ForgotPassword-df0af5f7.js",revision:null},{url:"assets/index-664b9a6a.css",revision:null},{url:"assets/index-77e614cf.js",revision:null},{url:"assets/Register-fb469537.js",revision:null},{url:"assets/Reset-7b4791a1.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"9b617102f1b29abbfc58cccdd0fa0f9f"},{url:"favicon.ico",revision:"4c90bbdd4860e5aed669c6c7dc427dc0"},{url:"apple-touch-icon.png",revision:"e5fc5bd4d78f067da0beef55b47fc3ae"},{url:"browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"favicon-16x16.png",revision:"e75891b5704884ce925fa1e80e1758c1"},{url:"favicon-32x32.png",revision:"af25dceb4eb026f5863a0582c2cb4e90"},{url:"safari-pinned-tab.svg",revision:"665738a7ace54986fae610a438464a42"},{url:"mstile-150x150.png",revision:"bd13730092700e2c405f05e0c04c4b00"},{url:"android-chrome-192x192.png",revision:"b1210c28d52a5981f8d5903205afbf80"},{url:"android-chrome-384x384.png",revision:"900ef600cfd29ae14ab92fcc7e59d108"},{url:"img/bottom.svg",revision:"26593d0ea3c3ee48feff7fa777e04cff"},{url:"manifest.webmanifest",revision:"9c0353753d8b83455db6263fdf136d32"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
