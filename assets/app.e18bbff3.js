import{_ as c,R as _,o as i,c as r,C as f,x as g,a as y,h as w,A as b,B as T,a2 as $,z as C,a3 as E,T as V,u as m,a4 as n,K as p,a5 as A,a6 as k,a7 as D,a8 as B,a9 as P,aa as R,ab as x,ac as S,ad as j,ae as L,af as N,d as I,p as O,k as F,ag as H,ah as Y,ai as z}from"./chunks/framework.ed8d50c3.js";import{t as u}from"./chunks/theme.e5ed02c3.js";const G={name:"TotalVisitors",setup:()=>({DEV:_("DEV")})},J={key:0,class:"visitor",src:"https://visitor-badge.laobi.icu/badge?page_id=jy_pages",title:"How many people visit this page",onerror:"this.style.display='none'"};function K(e,t,a,o,d,l){return e.DEV?f("",!0):(i(),r("img",J))}const M=c(G,[["render",K],["__scopeId","data-v-020bf1d6"]]);const U={name:"Copyright",setup:()=>{const e=_("DEV"),t=g();return{DEV:e,route:t}}},q={class:"copyright_container"},Q=["src"];function W(e,t,a,o,d,l){return i(),r("div",q,[y(" Copyright © 2023-present JY "),e.DEV?f("",!0):(i(),r("img",{key:0,class:"visitor",src:`https://visitor-badge.laobi.icu/badge?page_id=jy_pages_${e.route.path}`,title:"How many people visit this page",onerror:"this.style.display='none'"},null,8,Q))])}const X=c(U,[["render",W],["__scopeId","data-v-2f912d8a"]]);const Z={name:"BackToTop",setup:()=>{let e=w(!1);window&&window.addEventListener("scroll",()=>{window.pageYOffset>300?e.value=!0:e.value=!1});function t(){const a=document.getElementsByClassName("aside-container"),[o]=a||[];o&&o.scrollTo({top:0,behavior:"smooth"}),window&&window.scrollTo({top:0,behavior:"smooth"})}return{handleBackTop:t,isShow:e}}};function ee(e,t,a,o,d,l){return i(),b(V,{name:"fade"},{default:T(()=>[$(C("div",{id:"back_to_top",title:"返回顶部",onClick:t[0]||(t[0]=(...v)=>e.handleBackTop&&e.handleBackTop(...v))},null,512),[[E,e.isShow]])]),_:1})}const te=c(Z,[["render",ee],["__scopeId","data-v-cf48bfb7"]]);const ae={...u,Layout:()=>{var a;const{frontmatter:e}=m(),t={class:((a=e.value)==null?void 0:a.layoutClass)||""};return n(u.Layout,t,{"nav-bar-title-after":()=>n(M),"doc-after":()=>n(X),"aside-bottom":()=>n(te)})},enhanceApp({app:e,router:t}){e.provide("DEV",!1)}};function h(e){if(e.extends){const t=h(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const s=h(ae),oe=I({name:"VitePressApp",setup(){const{site:e}=m();return O(()=>{F(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),H(),Y(),z(),s.setup&&s.setup(),()=>n(s.Layout)}});async function se(){const e=ie(),t=ne();t.provide(k,e);const a=D(e.route);return t.provide(B,a),t.component("Content",P),t.component("ClientOnly",R),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:t,router:e,siteData:x}),{app:t,router:e,data:a}}function ne(){return S(oe)}function ie(){let e=p,t;return j(a=>{let o=L(a);return e&&(t=o),(e||t===o)&&(o=o.replace(/\.js$/,".lean.js")),p&&(e=!1),N(()=>import(o),[])},s.NotFound)}p&&se().then(({app:e,router:t,data:a})=>{t.go().then(()=>{A(t.route,a.site),e.mount("#app")})});export{se as createApp};