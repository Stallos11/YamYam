if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const o=e=>i(e,n),a={module:{uri:n},exports:c,require:o};s[n]=Promise.all(r.map((e=>a[e]||o(e)))).then((e=>(l(...e),c)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Callback-7c85e3d0.js",revision:null},{url:"assets/Create-0ff7d774.js",revision:null},{url:"assets/Create-7b9ef7a9.css",revision:null},{url:"assets/Details-32e9a276.js",revision:null},{url:"assets/Details-dd0b0640.css",revision:null},{url:"assets/donut-7c1b401e.js",revision:null},{url:"assets/Edit-e71696e6.css",revision:null},{url:"assets/Edit-fba71fe8.js",revision:null},{url:"assets/Favourites-0e406654.js",revision:null},{url:"assets/ForgotPassword-b0498c57.js",revision:null},{url:"assets/index-73bb5d91.js",revision:null},{url:"assets/index-8d058c3d.css",revision:null},{url:"assets/IngredientSearchTable-a9779bc8.css",revision:null},{url:"assets/IngredientSearchTable.vue_vue_type_style_index_0_lang-2c88dca6.js",revision:null},{url:"assets/MyRecipes-7344bbdc.js",revision:null},{url:"assets/Profile-0c6b5ce8.js",revision:null},{url:"assets/Profile-4a33d9c5.css",revision:null},{url:"assets/recipeCategories-db8a3c20.js",revision:null},{url:"assets/Register-9e7927f9.js",revision:null},{url:"assets/Reset-3fae2892.js",revision:null},{url:"assets/ticket-b7207fb5.js",revision:null},{url:"assets/Ticket-ce4a4805.css",revision:null},{url:"assets/Ticket-db18bf7c.js",revision:null},{url:"assets/TicketDetails-0218e64b.css",revision:null},{url:"assets/TicketDetails-63c61df7.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"00f74efb14860cece1f53ef5a4c32bf7"},{url:"favicon.ico",revision:"4c90bbdd4860e5aed669c6c7dc427dc0"},{url:"apple-touch-icon.png",revision:"e5fc5bd4d78f067da0beef55b47fc3ae"},{url:"browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"favicon-16x16.png",revision:"e75891b5704884ce925fa1e80e1758c1"},{url:"favicon-32x32.png",revision:"af25dceb4eb026f5863a0582c2cb4e90"},{url:"safari-pinned-tab.svg",revision:"665738a7ace54986fae610a438464a42"},{url:"mstile-150x150.png",revision:"bd13730092700e2c405f05e0c04c4b00"},{url:"android-chrome-192x192.png",revision:"b1210c28d52a5981f8d5903205afbf80"},{url:"android-chrome-384x384.png",revision:"900ef600cfd29ae14ab92fcc7e59d108"},{url:"img/bg-mobile.png",revision:"5de54222e8e322d34f9f279219017b4f"},{url:"img/bottom.svg",revision:"26593d0ea3c3ee48feff7fa777e04cff"},{url:"img/home-bg.png",revision:"a6b9b78d78828fa116c816c3bcd932b0"},{url:"img/orange.png",revision:"c41cacba1ea3e4a2689c6ebf101582f0"},{url:"manifest.webmanifest",revision:"9c0353753d8b83455db6263fdf136d32"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
