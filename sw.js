if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let a={};const o=e=>i(e,n),c={module:{uri:n},exports:a,require:o};s[n]=Promise.all(r.map((e=>c[e]||o(e)))).then((e=>(l(...e),a)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Callback-9a69e317.js",revision:null},{url:"assets/Create-29b4ac33.js",revision:null},{url:"assets/Create-d1df4984.css",revision:null},{url:"assets/Details-7eb83cb9.js",revision:null},{url:"assets/Details-dd0b0640.css",revision:null},{url:"assets/donut-7c1b401e.js",revision:null},{url:"assets/Edit-49d115b5.js",revision:null},{url:"assets/Edit-dd20a10a.css",revision:null},{url:"assets/Favourites-894dce9a.js",revision:null},{url:"assets/ForgotPassword-6ca530d8.js",revision:null},{url:"assets/index-1544c40c.js",revision:null},{url:"assets/index-b29bbf4b.css",revision:null},{url:"assets/IngredientSearchTable-a9779bc8.css",revision:null},{url:"assets/IngredientSearchTable.vue_vue_type_style_index_0_lang-3988329d.js",revision:null},{url:"assets/MyRecipes-1bf43533.js",revision:null},{url:"assets/Profile-4a33d9c5.css",revision:null},{url:"assets/Profile-b3b8c919.js",revision:null},{url:"assets/recipeCategories-210b033d.js",revision:null},{url:"assets/Register-d9b52a0c.js",revision:null},{url:"assets/Reset-ac5d603a.js",revision:null},{url:"assets/Ticket-1f0281a2.js",revision:null},{url:"assets/ticket-6225f696.js",revision:null},{url:"assets/Ticket-ce4a4805.css",revision:null},{url:"assets/TicketDetails-0218e64b.css",revision:null},{url:"assets/TicketDetails-7c52dfa9.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"c800ae31aaff6bbadd288ae127687c70"},{url:"favicon.ico",revision:"4c90bbdd4860e5aed669c6c7dc427dc0"},{url:"apple-touch-icon.png",revision:"e5fc5bd4d78f067da0beef55b47fc3ae"},{url:"browserconfig.xml",revision:"7f2b2f8a4c6863cc7be0a1e4b7963bd9"},{url:"favicon-16x16.png",revision:"e75891b5704884ce925fa1e80e1758c1"},{url:"favicon-32x32.png",revision:"af25dceb4eb026f5863a0582c2cb4e90"},{url:"safari-pinned-tab.svg",revision:"665738a7ace54986fae610a438464a42"},{url:"mstile-150x150.png",revision:"bd13730092700e2c405f05e0c04c4b00"},{url:"android-chrome-192x192.png",revision:"b1210c28d52a5981f8d5903205afbf80"},{url:"android-chrome-384x384.png",revision:"900ef600cfd29ae14ab92fcc7e59d108"},{url:"img/bg-mobile.png",revision:"5de54222e8e322d34f9f279219017b4f"},{url:"img/bottom.svg",revision:"26593d0ea3c3ee48feff7fa777e04cff"},{url:"img/home-bg.png",revision:"a6b9b78d78828fa116c816c3bcd932b0"},{url:"img/orange.png",revision:"c41cacba1ea3e4a2689c6ebf101582f0"},{url:"manifest.webmanifest",revision:"9c0353753d8b83455db6263fdf136d32"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
