import{j as e,t as f,O as L,r as M}from"./ticketStore.MgM2ncU-.js";import{r as a}from"./index.LFf77hJu.js";import{u as S}from"./index.0CZuico2.js";const q="https://rama-ws.com",F=async s=>{const{user:n,items:i,outterItems:c,couppon:l}=s,b="https://rama-ws.com/api/v1/orders/";let d;d=Object.values(i).map(r=>({id:r.id,quantity:r.quantity}));let u;u=Object.values(c).map(r=>({name:r.name,quantityDescription:r.quantityDescription,description:r.description}));const h={items:d,outterItems:u,phone:n.phone,name:n.name,email:n.email,user:n,couppon:l};try{if(!(await fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)})).ok)throw new Error("Network response was not ok");return!0}catch{return!1}},T=async s=>{const n=`${q}/api/v1/locations/get-postal-address/?postal_code=${s}`,c=await(await fetch(n)).json();return console.log(c),c},Z=()=>{const[s,n]=a.useState(""),[i,c]=a.useState(""),[l,b]=a.useState([]),[d,u]=a.useState({street:"",city:"",state:"",county:"",neighborhood:""});function h(r){n(r.target.value)}return a.useEffect(()=>{if(s.length<5)return;(async()=>{try{const m=await T(s),k=m.neighborhoods.map(y=>y.name);u({street:"",city:"",state:m.state,county:m.county,neighborhood:""}),b(k),c("")}catch{c("Error al obtener la dirección")}})()},[s]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"max-w-sm mx-auto mb-8",children:[e.jsx("label",{htmlFor:"website-admin",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Código Postal"}),e.jsxs("div",{className:"flex",children:[e.jsx("span",{className:"inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-900 dark:border-gray-600",children:e.jsxs("svg",{className:"w-6 h-6 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("path",{stroke:"currentColor",strokeLinecap:"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),e.jsx("path",{stroke:"currentColor",strokeLinecap:"round","stroke-linejoin":"round","stroke-width":"2",d:"M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"})]})}),e.jsx("input",{type:"text",id:"website-admin",className:"rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"03430",onChange:h})]})]}),d.county&&e.jsxs("div",{className:"max-w-sm mx-auto mb-8",children:[e.jsx("label",{htmlFor:"website-admin",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Alcaldía/Municipio"}),e.jsxs("div",{className:"flex",children:[e.jsx("span",{className:"inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-900 dark:border-gray-600",children:e.jsxs("svg",{className:"w-6 h-6 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("path",{stroke:"currentColor",strokeLinecap:"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),e.jsx("path",{stroke:"currentColor",strokeLinecap:"round","stroke-linejoin":"round","stroke-width":"2",d:"M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"})]})}),e.jsx("input",{type:"text",id:"website-admin",className:"rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",value:d.county,onChange:h})]})]}),l.length>0&&e.jsxs("div",{className:"max-w-sm mx-auto mb-8",children:[e.jsx("label",{htmlFor:"countries",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Selecciona tu colonia"}),e.jsx("select",{id:"countries",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:l.map(r=>e.jsx("option",{value:r,children:r},r))})]}),d.state&&e.jsxs("div",{className:"max-w-sm mx-auto mb-8",children:[e.jsx("label",{htmlFor:"website-admin",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Calle y número"}),e.jsxs("div",{className:"flex",children:[e.jsx("span",{className:"inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-900 dark:border-gray-600",children:e.jsxs("svg",{className:"w-6 h-6 text-gray-800 dark:text-white","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("path",{stroke:"currentColor",strokeLinecap:"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}),e.jsx("path",{stroke:"currentColor",strokeLinecap:"round","stroke-linejoin":"round","stroke-width":"2",d:"M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"})]})}),e.jsx("input",{type:"text",id:"website-admin",placeholder:"Calle Benito Juárez #1234",className:"rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:r=>u({...d,street:r.target.value})})]})]})]})};function I(){const[s,n]=a.useState(""),[i,c]=a.useState(""),[l,b]=a.useState(""),[d,u]=a.useState(""),[h,r]=a.useState(!1),[m,k]=a.useState(!1),[y,w]=a.useState(!1),[x,j]=a.useState({phone:"",name:"",email:""}),g=S(f),v=S(L);Object.values(g).reduce((o,p)=>o+p.price*p.quantity,0);const E=async o=>{if(o.preventDefault(),!y){let t={};i.length<3&&(t={...t,name:"El nombre debe tener al menos 3 caracteres"}),s.length<10&&(t={...t,phone:"El número de teléfono debe tener al menos 10 caracteres"}),l.length<5&&(t={...t,email:"El email debe tener al menos 5 caracteres"}),j({phone:t.phone,name:t.name,email:t.email}),Object.keys(g).length<1&&alert("No hay productos en el ticket");return}j({phone:"",name:"",email:""}),k(!0);let p;p=Object.values(g).map(t=>({id:t.id,quantity:t.quantity}));let N;N=Object.values(v).map(t=>({name:t.name,quantityDescription:t.quantityDescription,description:t.description}));const C=await F({items:p,outterItems:N,phone:s,name:i,email:l,user:{phone:s,name:i,email:l},couppon:d});r(C),C&&(Object.values(g).map(t=>{f.get()[t.id],f.setKey(t.id,void 0)}),Object.values(v).map(t=>{M(t.name)})),k(!1)};return a.useEffect(()=>{Object.keys(g).length>0&&s.length>9&&i.length>2&&l.length>5?w(!0):w(!1)},[g,s,i,l]),e.jsxs("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mb-8",children:[m&&e.jsx("div",{className:"text-center",children:e.jsxs("div",{role:"status",children:[e.jsxs("svg",{"aria-hidden":"true",className:"inline w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),e.jsx("span",{className:"sr-only text-gray-900 dark:text-white",children:"Enviando..."})]})}),h?e.jsxs("div",{className:"flex flex-col items-center justify-center text-green-500 font-medium my-24",children:[e.jsxs("div",{className:"w-full container mx-auto my-8 p-8 rounded shadow-lg mb-8 flex items-center justify-center",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-circle-check",width:"40",height:"40",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}),e.jsx("path",{d:"M9 12l2 2l4 -4"})]}),e.jsx("p",{className:"ml-2",children:"Pedido enviado"})]}),e.jsxs("div",{className:"w-full container mx-auto my-8 p-8 rounded shadow-lg",children:[e.jsx("h1",{className:"text-gray-900 text-2xl font-bold mb-6 flex items-center justify-center dark:text-white",children:"Gracias!"}),e.jsxs("div",{className:"flex items-center mb-8",children:[e.jsx("div",{className:"flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-check",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M5 12l5 5l10 -10"})]})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h2",{className:"text-gray-900 text-lg font-semibold dark:text-white",children:"Ya recibimos tu pedido"}),e.jsx("p",{className:"text-gray-900 dark:text-white",children:"En un momento nos pondremos en contacto contigo para confirmar tu pedido vía Whatsapp o email."})]})]})]})]}):e.jsx("div",{children:e.jsxs("div",{className:"max-w-sm mx-auto",children:[e.jsxs("div",{className:"mb-5",children:[x.name&&e.jsx("p",{className:"text-red-500 text-xs italic mb-2",children:x.name}),e.jsx("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tu nombre / Empresa"}),e.jsx("input",{type:"text",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",name:"name",onChange:o=>c(o.target.value),minLength:3,required:!0})]}),e.jsxs("div",{className:"mb-5",children:[x.phone&&e.jsx("p",{className:"text-red-500 text-xs italic mb-2",children:x.phone}),e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tu Whatsapp"}),e.jsx("input",{type:"tel",id:"tel",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"55 4647 6943",name:"tel",minLength:10,onChange:o=>n(o.target.value),required:!0})]}),e.jsxs("div",{className:"mb-5",children:[x.email&&e.jsx("p",{className:"text-red-500 text-xs italic mb-2",children:x.email}),e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email"}),e.jsx("input",{type:"email",id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"ejemplo@gmail.com",name:"email",onChange:o=>b(o.target.value),required:!0})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Cupón"}),e.jsx("input",{type:"text",id:"coupon",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",name:"coupon",value:d,onChange:o=>u(o.target.value),required:!0})]}),e.jsx("div",{className:"flex items-start mb-5"}),e.jsx(Z,{}),e.jsx("button",{onClick:o=>E(o),className:"text-white bg-blue-700 mb-12 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Enviar pedido"})]})})]})}export{I as default};
