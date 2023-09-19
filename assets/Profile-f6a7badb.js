import{d as v,u as S,o as w,c as V,a as o,b as e,w as a,f as t,g as k,e as r,l as y,j as l}from"./index-c0e1a657.js";import{u as T}from"./ticket-0e69e39c.js";const A={class:"container mt-5"},B=o("div",{class:"profile-card p-3 rounded-2"},[o("h2",{class:"my-2"},"Account summary"),o("ul",null,[o("li",null,"0 Created recipes"),o("li",null,"3 Favourite recipes")])],-1),M={class:"profile-card p-3 rounded-2 my-3"},N=o("h2",{class:"my-2"},"Send ticket",-1),z=o("span",{class:"text-grey text-center"},"Found a bug ? A feature idea ? Send us your thoughts",-1),F={class:"my-5 d-flex fx-center"},q=v({__name:"Profile",setup(I){const h=S(),s=T(),g=async()=>{await s.createTicket()};return(P,n)=>{const c=l("ax-form-control"),d=l("ax-form-field"),u=l("Icon"),m=l("ax-btn"),b=l("ax-form"),C=l("router-link");return w(),V("div",A,[B,o("div",M,[N,z,e(b,{onSubmit:y(g,["prevent"]),class:"mt-4"},{default:a(()=>{var _,p,f,x;return[e(d,{label:"Title"},{default:a(()=>[e(c,{tag:"input",rules:[t(k)],modelValue:t(s).ticketCreate.title,"onUpdate:modelValue":n[0]||(n[0]=i=>t(s).ticketCreate.title=i),type:"text"},null,8,["rules","modelValue"])]),_:1}),e(d,{label:"Messsage"},{default:a(()=>[e(c,{rules:[t(k)],modelValue:t(s).ticketCreate.message,"onUpdate:modelValue":n[1]||(n[1]=i=>t(s).ticketCreate.message=i),tag:"textarea"},{default:a(()=>[r("Message")]),_:1},8,["rules","modelValue"])]),_:1}),e(m,{disabled:(((p=(_=t(s).ticketCreate)==null?void 0:_.message)==null?void 0:p.length)||0)<2||(((x=(f=t(s).ticketCreate)==null?void 0:f.title)==null?void 0:x.length)||0)<2,class:"primary d-flex rounded-1 mx-auto mt-3",size:"small"},{default:a(()=>[e(u,{class:"mr-1",icon:"material-symbols:mail-outline",width:"20"}),r(" Send ")]),_:1},8,["disabled"])]}),_:1},8,["onSubmit"])]),o("div",F,[e(C,{class:"btn py-2 rounded-1 tertiary mx-auto text-white",to:"/tickets"},{default:a(()=>[r("Show my tickets")]),_:1}),e(m,{onClick:y(t(h).logout,["prevent"]),class:"red py-2 dark-1 d-flex rounded-1 mx-auto",size:"small"},{default:a(()=>[e(u,{class:"mr-1",icon:"material-symbols:power-rounded",width:"20"}),r(" Disconnect ")]),_:1},8,["onClick"])])])}}});export{q as default};
