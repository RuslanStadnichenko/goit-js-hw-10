import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-9808d4ac.js";const i=document.querySelector(".form"),u=i.querySelector('input[name="delay"]'),m=i.querySelectorAll('input[name="state"]');i.querySelector('button[type="submit"]');function l(s,e){s==="fulfilled"?r.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight",timeout:e}):s==="rejected"&&r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight",timeout:e})}i.addEventListener("submit",function(s){s.preventDefault();const e=parseInt(u.value),n=Array.from(m).find(t=>t.checked);if(!n){r.error({title:"Error",message:"Please select a state",position:"topRight"});return}const o=n.value;new Promise((t,c)=>{o==="fulfilled"?setTimeout(()=>t(e),e):o==="rejected"&&setTimeout(()=>c(e),e)}).then(t=>l(o,t)).catch(t=>l(o,t))});
//# sourceMappingURL=commonHelpers2.js.map
