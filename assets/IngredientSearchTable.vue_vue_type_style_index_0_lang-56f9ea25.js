import{d as v,A as y,v as $,o as c,s as h,w as r,a as e,t as d,f as t,e as D,B as C,j as _,r as m,C as T,b as x,c as V}from"./index-c0e1a657.js";const B={class:"d-flex fx-col vcenter"},E={class:"my-0 ml-3 text-white font-s3"},N={class:"grix xs2 gutter-xs2 py-4"},R=["href"],A=["src"],F=e("div",{class:"divider white my-3"},null,-1),M=e("p",{class:"text-center"},"Nutriments / 100g",-1),q={class:"d-flex fx-col px-3"},L={class:"nutri"},O=e("span",null,"Kcal",-1),P={class:"nutri"},U=e("span",null,"Fat",-1),j={class:"nutri"},z=e("span",null,"Saturated Fat",-1),H={class:"nutri"},K=e("span",null,"Carbs",-1),G={class:"nutri"},J=e("span",null,"Sugars",-1),Q={class:"nutri"},W=e("span",null,"Proteins",-1),X={class:"nutri"},Y=e("span",null,"Salt",-1),de=v({__name:"IngredientDetailModal",props:["type"],setup(g){const i=g,s=y(),o=$();return(u,a)=>{const l=_("ax-btn"),f=_("ax-modal");return c(),h(f,{class:"bg-dark rounded-1 shadow-1 h100",modelValue:t(s).isModalDetailOpened,"onUpdate:modelValue":a[2]||(a[2]=n=>t(s).isModalDetailOpened=n)},{header:r(()=>[e("div",B,[e("p",E,d(t(s).selectedIngredient.product_name),1),e("div",N,[e("a",{class:"btn secondary py-1 px-3 rounded-2 font-s2",href:`https://fr.openfoodfacts.org/produit/${t(s).selectedIngredient.openfoodfact_id}`,target:"_blank"}," DETAILS ",8,R),i.type=="create"&&t(o).recipeCreate.ingredients.find(n=>n.id==t(s).selectedIngredient.id)==null?(c(),h(l,{key:0,onClick:a[0]||(a[0]=n=>t(o).addIngredientToCreateRecipe()),class:"primary font-s2 px-3 py-1 rounded-2"},{default:r(()=>[D("ADD")]),_:1})):C("",!0),i.type=="edit"&&t(o).recipeEdit.ingredients.find(n=>n.id==t(s).selectedIngredient.id)==null?(c(),h(l,{key:1,onClick:a[1]||(a[1]=n=>t(o).addIngredientToEditRecipe()),class:"primary font-s2 px-3 py-1 rounded-2"},{default:r(()=>[D("ADD")]),_:1})):C("",!0)]),e("img",{style:{"max-height":"30vh"},class:"responsive-media",src:t(s).selectedIngredient.img},null,8,A)]),F]),default:r(()=>{var n,p,I,b,S,k,w;return[M,e("div",q,[e("div",L,[O,e("span",null,d(+((n=t(s).selectedIngredient)==null?void 0:n.kcal)),1)]),e("div",P,[U,e("span",null,d(+((p=t(s).selectedIngredient)==null?void 0:p.fat)),1)]),e("div",j,[z,e("span",null,d(+((I=t(s).selectedIngredient)==null?void 0:I.saturated_fat)),1)]),e("div",H,[K,e("span",null,d(+((b=t(s).selectedIngredient)==null?void 0:b.carbohydrates)),1)]),e("div",G,[J,e("span",null,d(+((S=t(s).selectedIngredient)==null?void 0:S.sugars)),1)]),e("div",Q,[W,e("span",null,d(+((k=t(s).selectedIngredient)==null?void 0:k.proteins)),1)]),e("div",X,[Y,e("span",null,d(+((w=t(s).selectedIngredient)==null?void 0:w.salt)),1)])])]}),_:1},8,["modelValue"])}}});const Z={class:"grix xs1 sm2"},ie=v({__name:"IngredientSearch",setup(g){const i=m("product_name"),s=m(""),o=y();return T(s,(u,a)=>{u.length>2&&o.searchIngredientBy(i.value,s.value)}),(u,a)=>{const l=_("ax-form-control"),f=_("ax-form-field"),n=_("ax-form");return c(),h(n,{class:"d-flex fx-col"},{default:r(()=>[e("div",Z,[e("div",null,[x(f,{label:"Search"},{default:r(()=>[x(l,{tag:"input",modelValue:s.value,"onUpdate:modelValue":a[0]||(a[0]=p=>s.value=p),type:"text"},null,8,["modelValue"])]),_:1})])])]),_:1})}}}),ee=[{text:"Product Name",value:"product_name",sortable:!0}],te={key:0,class:"py-2"},se={key:1,class:"spinner text-blue mx-auto my-5"},ne=e("svg",{viewBox:"25 25 50 50"},[e("circle",{class:"spinner-path",cx:"50",cy:"50",r:"20",fill:"none","stroke-width":"3"})],-1),ae=[ne],le=v({__name:"IngredientSearchTable",setup(g){const i=m(""),s=m(""),o=y();return(u,a)=>{const l=_("EasyDataTable");return t(o).isLoading?(c(),V("div",se,ae)):(c(),V("div",te,[x(l,{"search-field":i.value,"search-value":s.value,"table-class-name":"customize-table","header-text-direction":"center","body-text-direction":"center","buttons-pagination":"","empty-message":"Search ingredients","rows-per-page":10,headers:t(ee),items:t(o).ingredients,alternating:"","hide-rows-per-page":"",onClickRow:t(o).showIngredientDetails},null,8,["search-field","search-value","headers","items","onClickRow"])]))}}});export{ie as _,le as a,de as b};
