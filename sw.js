if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const d=e=>n(e,c),a={module:{uri:c},exports:o,require:d};i[c]=Promise.all(r.map((e=>a[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-06d9bd09.css",revision:null},{url:"assets/index-15e32ae7.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"d26db7fb2858ca79ac234df725a5408a"},{url:"favicon.ico",revision:"4c90bbdd4860e5aed669c6c7dc427dc0"},{url:"apple-touch-icon.png",revision:"e5fc5bd4d78f067da0beef55b47fc3ae"},{url:"browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"favicon-16x16.png",revision:"e75891b5704884ce925fa1e80e1758c1"},{url:"favicon-32x32.png",revision:"af25dceb4eb026f5863a0582c2cb4e90"},{url:"safari-pinned-tab.svg",revision:"665738a7ace54986fae610a438464a42"},{url:"mstile-150x150.png",revision:"bd13730092700e2c405f05e0c04c4b00"},{url:"android-chrome-192x192.png",revision:"b1210c28d52a5981f8d5903205afbf80"},{url:"android-chrome-384x384.png",revision:"900ef600cfd29ae14ab92fcc7e59d108"},{url:"manifest.webmanifest",revision:"b736ac32f17c00379dac6afb2db98253"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
