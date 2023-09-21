import{d as T,u as A,v as N,E as R,y as S,o as z,c as D,a as s,t as d,f as e,b as o,w as r,g as w,e as u,l as C,j as n}from"./index-73bb5d91.js";import{u as E}from"./ticket-b7207fb5.js";const F={class:"container mt-5"},I={class:"profile-card p-3 rounded-2"},P=s("h2",{class:"my-2"},"Account summary",-1),U={class:"profile-card p-3 rounded-2 my-3"},j=s("h2",{class:"my-2"},"Send ticket",-1),q=s("span",{class:"text-grey text-center"},"Found a bug ? A feature idea ? Send us your thoughts",-1),L={class:"my-5 d-flex fx-center"},K=T({__name:"Profile",setup(G){const _=A(),a=E(),l=N();R(async()=>{await l.getRecipes(),await l.getFavourites()});const V=async()=>{await a.createTicket()},p=S(()=>l.recipes.filter(i=>{var t;return i.user_id===((t=_.user)==null?void 0:t.id)}).length),f=S(()=>l.recipes.filter(i=>{var t;return(t=l.favourites)==null?void 0:t.some(c=>i.id===c.recipe_id)}).length);return(i,t)=>{const c=n("ax-form-control"),x=n("ax-form-field"),g=n("Icon"),h=n("ax-btn"),B=n("ax-form"),M=n("router-link");return z(),D("div",F,[s("div",I,[P,s("ul",null,[s("li",null,d(e(p))+" created recipe"+d(e(p)<2?"":"s"),1),s("li",null,d(e(f))+" favourite recipe"+d(e(f)<2?"":"s"),1)])]),s("div",U,[j,q,o(B,{onSubmit:C(V,["prevent"]),class:"mt-4"},{default:r(()=>{var y,k,b,v;return[o(x,{label:"Title"},{default:r(()=>[o(c,{tag:"input",rules:[e(w)],modelValue:e(a).ticketCreate.title,"onUpdate:modelValue":t[0]||(t[0]=m=>e(a).ticketCreate.title=m),type:"text"},null,8,["rules","modelValue"])]),_:1}),o(x,{label:"Messsage"},{default:r(()=>[o(c,{rules:[e(w)],modelValue:e(a).ticketCreate.message,"onUpdate:modelValue":t[1]||(t[1]=m=>e(a).ticketCreate.message=m),tag:"textarea"},{default:r(()=>[u("Message")]),_:1},8,["rules","modelValue"])]),_:1}),o(h,{disabled:(((k=(y=e(a).ticketCreate)==null?void 0:y.message)==null?void 0:k.length)||0)<2||(((v=(b=e(a).ticketCreate)==null?void 0:b.title)==null?void 0:v.length)||0)<2,class:"primary d-flex rounded-1 mx-auto mt-3",size:"small"},{default:r(()=>[o(g,{class:"mr-1",icon:"material-symbols:mail-outline",width:"20"}),u(" Send ")]),_:1},8,["disabled"])]}),_:1},8,["onSubmit"])]),s("div",L,[o(M,{class:"btn py-2 rounded-1 tertiary mx-auto text-white",to:"/tickets"},{default:r(()=>[u("Show my tickets")]),_:1}),o(h,{onClick:C(e(_).logout,["prevent"]),class:"red py-2 dark-1 d-flex rounded-1 mx-auto",size:"small"},{default:r(()=>[o(g,{class:"mr-1",icon:"material-symbols:power-rounded",width:"20"}),u(" Disconnect ")]),_:1},8,["onClick"])])])}}});export{K as default};
