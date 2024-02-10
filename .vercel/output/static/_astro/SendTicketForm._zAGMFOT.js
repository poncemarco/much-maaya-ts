import{j as e,t as c,O as j,r as v}from"./ticketStore.sbQnIEue.js";import{u as b}from"./index.0CZuico2.js";import{r as o}from"./index.LFf77hJu.js";const w="https://rama-ws.com",N=async l=>{const n=`${w}/api/v1/orders/`;return await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}).then(a=>{if(!a.ok)throw new Error("Network response was not ok");return!0}).catch(a=>!1)};function E(){const[l,n]=o.useState(""),[d,a]=o.useState(""),[g,x]=o.useState(""),[h,p]=o.useState(!1),i=b(c),u=b(j);Object.values(i).reduce((r,s)=>r+s.price*s.quantity,0);const f=async()=>{let r;r=Object.values(i).map(t=>({id:t.id,quantity:t.quantity}));let s;s=Object.values(u).map(t=>({name:t.name,quantityDescription:t.quantityDescription,description:t.description}));const m={items:r,outterItems:s,phone:l,name:d,email:g};console.log(m);const k=await N(m);p(k),Object.values(i).map(t=>{c.get()[t.id],c.setKey(t.id,void 0)}),Object.values(u).map(t=>{v(t.name)})};return e.jsx("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mb-8",children:e.jsxs("div",{className:"max-w-sm mx-auto",children:[e.jsxs("div",{className:"mb-5",children:[e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tu nombre / Empresa"}),e.jsx("input",{type:"text",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",name:"name",onChange:r=>a(r.target.value),required:!0})]}),e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tu Whatsapp"}),e.jsx("input",{type:"tel",id:"tel",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"55 4647 6943",name:"tel",onChange:r=>n(r.target.value),required:!0})]}),e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email"}),e.jsx("input",{type:"tel",id:"tel",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"ejemplo@gmail.com",name:"email",onChange:r=>x(r.target.value),required:!0})]}),e.jsxs("div",{className:"flex items-start mb-5",children:[e.jsx("div",{className:"flex items-center h-5",children:e.jsx("input",{id:"remember",type:"checkbox",value:d,className:"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800",onChange:r=>a(r.target.value),required:!0})}),e.jsx("label",{htmlFor:"remember",className:"ms-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:"Recordarme"})]}),h?e.jsxs("div",{className:"flex items-center justify-center text-green-500 font-medium my-8",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-circle-check",width:"40",height:"40",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}),e.jsx("path",{d:"M9 12l2 2l4 -4"})]}),e.jsx("p",{className:"ml-2",children:"Pedido enviado"})]}):e.jsx("button",{onClick:f,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Enviar pedido"})]})})}export{E as default};
