var ee=Object.defineProperty,te=Object.defineProperties;var ne=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var ue=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;var I=(e,n,o)=>n in e?ee(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o,O=(e,n)=>{for(var o in n||(n={}))ue.call(n,o)&&I(e,o,n[o]);if(j)for(var o of j(n))oe.call(n,o)&&I(e,o,n[o]);return e},R=(e,n)=>te(e,ne(n));import{c as G,a as se,r as S,w as re,T as B,b as C,d as T,e as m,o as g,f as D,g as a,h as v,u,F as H,i as F,j as U,k as x,l as z,t as V,m as ae,n as le,D as Y,B as ie,C as ce,p as de,q as me,s as pe,E as _e,v as fe,x as ve,P as we,y as be,R as Fe,z as ge,S as ke,A as ye,G as Ee}from"./vendor.3dcbbd06.js";const Ce=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const _ of d.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&i(_)}).observe(document,{childList:!0,subtree:!0});function o(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerpolicy&&(d.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?d.credentials="include":t.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(t){if(t.ep)return;t.ep=!0;const d=o(t);fetch(t.href,d)}};Ce();const J=(e,n={prefix:"\uFFE5"})=>{if(typeof e=="number"&&(e=e.toFixed(2)),e)return`${n.prefix||""}${e}${n.suffix||""}`},K=e=>{let o=(new Date(e.end).getTime()-new Date(e.begin).getTime())/864e5;return o<1&&(o=1),parseFloat(e.price)/o},De=e=>{const n=K(e);return J((Math.round(n*100)/100).toFixed(2),{prefix:"\uFFE5",suffix:"/\u5929"})},he=e=>{const n=new Date(e);n.setHours(0);const o=new Date,i=(n.getTime()-o.getTime())/864e5,t=Math.ceil(Math.abs(i));return n.getTime()<o.getTime()?`\u5DF2\u7ECF\u8FC7\u671F${t}\u5929`:`${t}\u5929\u540E\u8FC7\u671F`},Ae=G(()=>{const e=new Date;switch(!0){case(e.getHours()>=18||e.getHours()<2):return"\u665A\u4E0A\u597D\uFF01";case e.getHours()>=12:return"\u4E0B\u5348\u597D\uFF01";case e.getHours()>=5:return"\u65E9\u4E0A\u597D";case e.getHours()>=2:return"\u4FEE\u4ED9\u5462\uFF1F\uFF1F\uFF1F\uFF1F"}return"\u65E9\u4E0A\u597D"}),L=(e,n=2)=>(typeof e=="number"&&(e=e.toFixed(0)),e.padStart(2,"0")),q=e=>e?`${L(e.getFullYear())}-${L(e.getMonth()+1)}-${L(e.getDate())}`:null,h=se.create({baseURL:"https://service-466d0vou-1257579590.gz.apigw.tencentcs.com/release",timeout:5e3}),k=S({username:"",password:""}),xe=()=>{try{const e=JSON.parse(window.localStorage.getItem("cred")||"");Object.assign(k,e)}catch{}};xe();re(k,()=>{window.localStorage.setItem("cred",JSON.stringify(k))},{deep:!0});h.interceptors.request.use(e=>(e.auth=k,e));h.interceptors.response.use(e=>e,e=>{if(e.response.status===401&&!e.response.config.url.includes("info")){B("\u8BF7\u5148\u767B\u5F55");return}throw e});const Be=async()=>await h.get("/info"),$e=async e=>await h.get("/subscribes"),Ve=async e=>await h.post("/subscribes",R(O({},e),{begin:q(e.begin),end:q(e.end)})),Ue=async e=>{const n=O({},e);return delete n.id,delete n.ct,delete n.mt,await h.put(`/subscribes/${e.id}`,n)},Se=async e=>await h.delete(`/subscribes/${e}`),Q=(e,n=void 0)=>{const o=S({field:""}),i=C(!1);return S({show_picker:i,begin_pick:(_,c=void 0,r=void 0)=>{o.field=_,n&&c?o.value=new n(c):o.value=c,o.transformer=r,i.value=!0},confirm_pick:_=>{const c=b=>o.transformer?o.transformer(b):b,r={[o.field]:c((_==null?void 0:_.value)||_||o.value)};Object.assign(e,r),i.value=!1},picking:o})},P=e=>Q(e),qe=e=>Q(e,Date);var W=(e,n)=>{const o=e.__vccOpts||e;for(const[i,t]of n)o[i]=t;return o};const Te={id:"creation"},Ne=T({props:{show:{type:Boolean,default(){return!1}}},emits:["update:show","success","cancel"],setup(e,{emit:n}){const o=e,i={auto_renew:!1,name:"",begin:new Date,end:new Date,renew_period:30,price:"10.0"},t=S({auto_renew:!1,name:"",begin:new Date,end:new Date,renew_period:30,price:"10.0"}),d=()=>{Object.assign(t,i)},_=async()=>{const p=await Ve(t);p.data.code===200&&(B.success("\u6DFB\u52A0\u6210\u529F"),n("success",p.data.data),d())},c=P(t),r=P(t),b=p=>p.toLocaleDateString(),y=p=>`${p}\u5929`;return(p,s)=>{const w=m("van-field"),E=m("van-checkbox"),A=m("van-cell-group"),$=m("van-form"),l=m("van-dialog"),N=m("van-datetime-picker"),M=m("van-popup"),Z=m("van-picker");return g(),D(H,null,[a(l,{show:o.show,"onUpdate:show":s[6]||(s[6]=f=>p.$emit("update:show",f)),"show-cancel-button":"",onConfirm:_,onCancel:s[7]||(s[7]=()=>{p.$emit("cancel",null)})},{default:v(()=>[F("div",Te,[a($,null,{default:v(()=>[a(A,{inset:""},{default:v(()=>[a(w,{modelValue:u(t).name,"onUpdate:modelValue":s[0]||(s[0]=f=>u(t).name=f),name:"\u8BA2\u9605\u540D\u79F0",label:"\u8BA2\u9605\u540D\u79F0",placeholder:"\u8BA2\u9605\u540D\u79F0",rules:[{required:!0,message:"\u8BA2\u9605\u81F3\u5C11\u6709\u4E2A\u540D\u79F0"}]},null,8,["modelValue"]),a(w,{modelValue:u(t).price,"onUpdate:modelValue":s[1]||(s[1]=f=>u(t).price=f),name:"\u4EF7\u683C",label:"\u4EF7\u683C",placeholder:"\u4EF7\u683C",rules:[{required:!0,message:"\u8FD8\u5F97\u6709\u4E2A\u4EF7\u683C"}]},null,8,["modelValue"]),a(w,{"model-value":b(u(t).begin),name:"\u5F00\u59CB\u65F6\u95F4",label:"\u5F00\u59CB\u65F6\u95F4",readonly:"",onClick:s[2]||(s[2]=f=>u(c).begin_pick("begin",u(t).begin))},null,8,["model-value"]),a(w,{"model-value":b(u(t).end),name:"\u5230\u671F\u65F6\u95F4",label:"\u5230\u671F\u65F6\u95F4",onClick:s[3]||(s[3]=f=>u(c).begin_pick("end",u(t).end)),readonly:""},null,8,["model-value"]),a(w,{label:"\u81EA\u52A8\u7EED\u8D39"},{input:v(()=>[a(E,{modelValue:u(t).auto_renew,"onUpdate:modelValue":s[4]||(s[4]=f=>u(t).auto_renew=f),shape:"square"},null,8,["modelValue"])]),_:1}),u(t).auto_renew?(g(),U(w,{key:0,"model-value":y(u(t).renew_period),readonly:"",onClick:s[5]||(s[5]=f=>u(r).begin_pick("renew_period",30)),name:"\u7EED\u8D39\u5468\u671F",label:"\u7EED\u8D39\u5468\u671F"},null,8,["model-value"])):x("",!0)]),_:1})]),_:1})])]),_:1},8,["show"]),a(M,{show:u(c).show_picker,"onUpdate:show":s[10]||(s[10]=f=>u(c).show_picker=f),position:"bottom","close-on-click-overlay":!1},{default:v(()=>[a(N,{modelValue:u(c).picking.value,"onUpdate:modelValue":s[8]||(s[8]=f=>u(c).picking.value=f),type:"date",title:"\u9009\u62E9\u5E74\u6708\u65E5",onConfirm:u(c).confirm_pick,onCancel:s[9]||(s[9]=f=>u(c).show_picker=!1)},null,8,["modelValue","onConfirm"])]),_:1},8,["show"]),a(M,{show:u(r).show_picker,"onUpdate:show":s[12]||(s[12]=f=>u(r).show_picker=f),position:"bottom","close-on-click-overlay":!1},{default:v(()=>[a(Z,{columns:[{text:"30\u5929",value:30},{text:"90\u5929",value:90},{text:"365\u5929",value:365}],title:"\u7EED\u8BA2\u65F6\u95F4",onConfirm:u(r).confirm_pick,onCancel:s[11]||(s[11]=f=>u(r).show_picker=!1)},null,8,["onConfirm"])]),_:1},8,["show"])],64)}}});var Oe=W(Ne,[["__scopeId","data-v-4410809e"]]);const Le={id:"creation"},Pe=T({props:{show:{type:Boolean,default(){return!1}},subscribe:{type:Object,required:!0}},emits:["update:show","success","cancel"],setup(e,{emit:n}){const o=e,i=qe(o.subscribe),t=P(o.subscribe),d=async()=>{await Ue(o.subscribe),n("success",o.subscribe),n("update:show",!1)},_=c=>`${c}\u5929`;return(c,r)=>{const b=m("van-field"),y=m("van-checkbox"),p=m("van-cell-group"),s=m("van-form"),w=m("van-dialog"),E=m("van-datetime-picker"),A=m("van-popup"),$=m("van-picker");return g(),D(H,null,[a(w,{show:e.show,"onUpdate:show":r[6]||(r[6]=l=>c.$emit("update:show",l)),"show-cancel-button":"",onConfirm:d,onCancel:r[7]||(r[7]=()=>{c.$emit("cancel",null)})},{default:v(()=>[F("div",Le,[a(s,null,{default:v(()=>[a(p,{inset:""},{default:v(()=>[a(b,{modelValue:e.subscribe.name,"onUpdate:modelValue":r[0]||(r[0]=l=>e.subscribe.name=l),name:"\u8BA2\u9605\u540D\u79F0",label:"\u8BA2\u9605\u540D\u79F0",placeholder:"\u8BA2\u9605\u540D\u79F0",rules:[{required:!0,message:"\u8BA2\u9605\u81F3\u5C11\u6709\u4E2A\u540D\u79F0"}]},null,8,["modelValue"]),a(b,{modelValue:e.subscribe.price,"onUpdate:modelValue":r[1]||(r[1]=l=>e.subscribe.price=l),name:"\u4EF7\u683C",label:"\u4EF7\u683C",placeholder:"\u4EF7\u683C",rules:[{required:!0,message:"\u8FD8\u5F97\u6709\u4E2A\u4EF7\u683C"}]},null,8,["modelValue"]),a(b,{"model-value":e.subscribe.begin,name:"\u5F00\u59CB\u65F6\u95F4",label:"\u5F00\u59CB\u65F6\u95F4",readonly:"",onClick:r[2]||(r[2]=l=>u(i).begin_pick("begin",e.subscribe.begin,u(q)))},null,8,["model-value"]),a(b,{"model-value":e.subscribe.end,name:"\u5230\u671F\u65F6\u95F4",label:"\u5230\u671F\u65F6\u95F4",onClick:r[3]||(r[3]=l=>u(i).begin_pick("end",e.subscribe.end,u(q))),readonly:""},null,8,["model-value"]),a(b,{label:"\u81EA\u52A8\u7EED\u8D39"},{input:v(()=>[a(y,{modelValue:e.subscribe.auto_renew,"onUpdate:modelValue":r[4]||(r[4]=l=>e.subscribe.auto_renew=l),shape:"square"},null,8,["modelValue"])]),_:1}),e.subscribe.auto_renew?(g(),U(b,{key:0,"model-value":_(e.subscribe.renew_period),readonly:"",onClick:r[5]||(r[5]=l=>u(t).begin_pick("renew_period",30)),name:"\u7EED\u8D39\u5468\u671F",label:"\u7EED\u8D39\u5468\u671F"},null,8,["model-value"])):x("",!0)]),_:1})]),_:1})])]),_:1},8,["show"]),a(A,{show:u(i).show_picker,"onUpdate:show":r[9]||(r[9]=l=>u(i).show_picker=l),position:"bottom","close-on-click-overlay":!1},{default:v(()=>[a(E,{"model-value":u(i).picking.value,type:"date",title:"\u9009\u62E9\u5E74\u6708\u65E5",onConfirm:u(i).confirm_pick,onCancel:r[8]||(r[8]=l=>u(i).show_picker=!1)},null,8,["model-value","onConfirm"])]),_:1},8,["show"]),a(A,{show:u(t).show_picker,"onUpdate:show":r[11]||(r[11]=l=>u(t).show_picker=l),position:"bottom","close-on-click-overlay":!1},{default:v(()=>[a($,{columns:[{text:"30\u5929",value:30},{text:"90\u5929",value:90},{text:"365\u5929",value:365}],title:"\u7EED\u8BA2\u65F6\u95F4",onConfirm:u(t).confirm_pick,onCancel:r[10]||(r[10]=l=>u(t).show_picker=!1)},null,8,["onConfirm"])]),_:1},8,["show"])],64)}}});var He=W(Pe,[["__scopeId","data-v-205715de"]]);const Me=T({props:["show"],emits:["update:show","success"],setup(e,{emit:n}){const o=async()=>{try{await Be(),n("update:show",!1),n("success"),B("\u767B\u5F55\u6210\u529F");return}catch{B("\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u6B63\u786E\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165")}};return(i,t)=>{const d=m("van-field"),_=m("van-form"),c=m("van-dialog");return g(),U(c,{show:e.show,onConfirm:o},{default:v(()=>[a(_,null,{default:v(()=>[a(d,{modelValue:u(k).username,"onUpdate:modelValue":t[0]||(t[0]=r=>u(k).username=r),label:"\u7528\u6237\u540D"},null,8,["modelValue"]),a(d,{modelValue:u(k).password,"onUpdate:modelValue":t[1]||(t[1]=r=>u(k).password=r),label:"\u5BC6\u7801",type:"password"},null,8,["modelValue"])]),_:1})]),_:1},8,["show"])}}});const je={id:"main"},Ie={id:"summary"},Re=F("div",{class:"summary-desc"},"\u4ECA\u65E5\u8BA2\u9605\u6D88\u8017",-1),ze={key:0,class:"summary-num"},Ge={id:"list",ref:"list"},Ye={style:{"border-bottom":"1px solid black"}},Je={class:"sub-content-wrapper"},Ke={class:"sub-content"},Qe={class:"sub-name inline-text"},We={key:0},Xe=le("\u81EA\u52A8\u7EED\u8D39"),Ze={class:"sub-content-right"},et={class:"inline-text sub-price"},tt={class:"inline-text sub-expire"},nt=T({setup(e){const n=C([]),o=C(!1),i=async()=>{var p;o.value=!0;try{const s=await $e({});s.status===200&&(n.value=((p=s.data)==null?void 0:p.data)||[])}catch{}finally{o.value=!1}},t=G(()=>{const p=n.value.reduce((s,w)=>{const E=new Date;return isNaN(parseFloat(w.price))||!w.renew_period||new Date(w.end).getTime()<E.getTime()?s:s+K(w)},0);return J(p)});z(()=>{i()});const d=C(!1),_=C(!1),c=C(),r=p=>{c.value=p,_.value=!0},b=async p=>{try{await Y.confirm({title:`\u786E\u8BA4\u5220\u9664${p.name}\u5417\uFF1F`}),await Se(p.id),await i(),B.success("\u5220\u9664\u6210\u529F")}catch{B("\u53D6\u6D88\u5220\u9664")}},y=C(!1);return z(()=>{(!k.password||!k.username)&&(y.value=!0)}),(p,s)=>{const w=m("van-button"),E=m("van-tag"),A=m("van-swipe-cell"),$=m("van-empty");return g(),D("div",je,[F("div",Ie,[F("div",null,V(u(Ae)),1),Re,o.value?x("",!0):(g(),D("div",ze,V(u(t)!=="0.00"?u(t):""),1))]),F("div",Ge,[F("div",{id:"list-plus",onClick:s[0]||(s[0]=l=>d.value=!0)},"+"),(g(!0),D(H,null,ae(n.value,l=>(g(),D("div",{class:"sub",key:l.id},[F("div",Ye,[a(A,null,{left:v(()=>[a(w,{square:"",type:"success",onClick:N=>r(l),text:"\u4FEE\u6539"},null,8,["onClick"])]),right:v(()=>[a(w,{square:"",type:"danger",text:"\u5220\u9664",onClick:N=>b(l)},null,8,["onClick"])]),default:v(()=>[F("div",Je,[F("div",Ke,[F("div",Qe,V(l.name),1),l.auto_renew?(g(),D("div",We,[a(E,{type:"success"},{default:v(()=>[Xe]),_:1})])):x("",!0),F("div",Ze,[F("div",et,V(u(De)(l)),1),F("div",tt,V(u(he)(l.end)),1)])])])]),_:2},1024)])]))),128)),n.value.length?x("",!0):(g(),U($,{key:0,description:"\u7A7A\u7A7A\u5982\u4E5F"}))],512),a(Oe,{show:d.value,"onUpdate:show":s[1]||(s[1]=l=>d.value=l),onSuccess:i},null,8,["show"]),c.value?(g(),U(He,{key:0,show:_.value,"onUpdate:show":s[2]||(s[2]=l=>_.value=l),subscribe:c.value,onSuccess:i},null,8,["show","subscribe"])):x("",!0),a(Me,{show:y.value,"onUpdate:show":s[3]||(s[3]=l=>y.value=l),onSuccess:i},null,8,["show"])])}}}),ut=e=>(e.use(ie),e.use(ce),e.use(de),e.use(me),e.use(pe),e.use(Y),e.use(_e),e.use(fe),e.use(ve),e.use(we),e.use(be),e.use(Fe),e.use(ge),e.use(ke),e.use(ye),e),X=Ee(nt);ut(X);X.mount("#app");