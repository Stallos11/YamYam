import{u as b}from"./ticket-0963c595.js";import{d as R,u as C,G as L,r as f,y as g,l as E,C as V,o as c,c as r,a as e,t as o,f as s,F as B,x as F,z,b as d,w as h,m as I,j as _}from"./index-f29967e5.js";const N={class:"container"},j={class:"d-flex vcenter"},A={class:"w100"},G={class:"d-flex"},H={class:""},M={class:"ml-auto"},U={class:"grey dark-1 p-3 rounded-2 my-2 light-shadow-2 ml-5"},q={class:"text-right font-s1 mb-0"},J={class:"text-right font-s1 mb-0"},K={key:0,class:"my-5"},O={key:1,class:"text-center mt-4"},X=R({__name:"TicketDetails",setup(P){const t=b(),k=C(),v=L(),u=I(),n=f(""),i=f(),x=g(()=>t.selectedTicket.status==="in progress"?"En cours":"Fermé");E(()=>{t.getTicket(u.params.id),t.getTicketResponses(u.params.id)});const T=async()=>{if(n.value.length<2){v.setError("Invalid response");return}await t.insertResponse(n.value)},y=g(()=>t.selectedTicketResponses);return V(y,(m,l)=>{m.length!==l.length&&setTimeout(()=>{i.value.scrollTop=i.value.scrollHeight,n.value=""},100)}),(m,l)=>{const w=_("ax-form-control"),S=_("ax-form-field"),D=_("ax-form");return c(),r("div",N,[e("div",j,[e("div",A,[e("h2",null,o(s(t).selectedTicket.title),1),e("div",G,[e("p",H,o(s(x)),1),e("p",M,o(new Date(s(t).selectedTicket.created_at).toLocaleDateString()),1)])])]),e("div",{ref_key:"conv",ref:i,class:"conv px-2"},[e("div",U,[e("p",null,o(s(t).selectedTicket.message),1),e("p",q,o(new Date(s(t).selectedTicket.created_at).toLocaleTimeString()+" "+new Date(s(t).selectedTicket.created_at).toLocaleDateString()),1)]),(c(!0),r(B,null,F(s(t).selectedTicketResponses,a=>{var p;return c(),r("div",{class:z([a.user_id==((p=s(k).user)==null?void 0:p.id)?"ml-5 grey dark-1":"mr-5 grey dark-4","p-3 rounded-2 my-2 light-shadow-2"])},[e("p",null,o(a.message),1),e("p",J,o(new Date(a.created_at).toLocaleTimeString()+" "+new Date(a.created_at).toLocaleDateString()),1)],2)}),256))],512),s(t).selectedTicket.status==="in progress"?(c(),r("div",K,[d(D,null,{default:h(()=>[d(S,{label:"Réponse"},{default:h(()=>[d(w,{modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=a=>n.value=a),tag:"textarea"},null,8,["modelValue"])]),_:1})]),_:1}),e("button",{onClick:T,class:"btn primary rounded-2 px-4 py-1"},"Envoyer")])):(c(),r("div",O," Impossible de répondre, le ticket est fermé. "))])}}});export{X as default};