import{_ as d}from"./donut-7c1b401e.js";import{d as i,v as l,m as p,o as t,c as o,f as r,F as _,x as u,s as f,b as m,w as x,e as b,a as e,j as h,G as v}from"./index-545fec28.js";const g={class:"container mt-4"},y=e("div",{class:"d-flex vcenter"},[e("div",{class:"fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"}),e("h2",{class:"font-w400 text-center m-3 font-s5"},"My recipes"),e("div",{class:"fx-grow bd-2 bd-grey bd-dark-3 bd-b-solid"})],-1),k={key:1,class:"h100 d-flex fx-col vcenter fx-center"},w=e("img",{class:"responsive-media p-3",src:d,alt:""},null,-1),R=e("p",null,"No recipe found",-1),S=i({__name:"MyRecipes",setup(B){const s=l();return p(async()=>{await s.getFavourites(),await s.getUserRecipes()}),(C,N)=>{var a;const c=h("ax-btn");return t(),o("div",g,[y,(a=r(s).userRecipes)!=null&&a.length?(t(!0),o(_,{key:0},u(r(s).userRecipes,n=>(t(),f(v,{recipe:n},null,8,["recipe"]))),256)):(t(),o("div",k,[w,R,m(c,{to:"/feed",tag:"router-link",class:"primary rounded-2 py-1 px-4"},{default:x(()=>[b("Show recipes")]),_:1})]))])}}});export{S as default};