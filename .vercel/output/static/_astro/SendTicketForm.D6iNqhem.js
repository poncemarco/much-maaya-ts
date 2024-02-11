import{j as e,t as f,O as q,r as M}from"./ticketStore.sbQnIEue.js";import{r as s}from"./index.LFf77hJu.js";import{u as N}from"./index.0CZuico2.js";const T=async n=>{const{user:i,items:l,outterItems:x,couppon:o}=n,b="https://rama-ws.com/api/v1/orders/";let m;m=Object.values(l).map(a=>({id:a.id,quantity:a.quantity}));let h;h=Object.values(x).map(a=>({name:a.name,quantityDescription:a.quantityDescription,description:a.description}));const g={items:m,outterItems:h,phone:i.phone,name:i.name,email:i.email,user:i,couppon:o};try{if(!(await fetch(b,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)})).ok)throw new Error("Network response was not ok");return!0}catch{return!1}};function B(){const[n,i]=s.useState(""),[l,x]=s.useState(""),[o,b]=s.useState(""),[m,h]=s.useState(""),[g,a]=s.useState(!1),[p,k]=s.useState(!1),[C,y]=s.useState(!1),[d,j]=s.useState({phone:"",name:"",email:""}),c=N(f),w=N(q);Object.values(c).reduce((r,u)=>r+u.price*u.quantity,0);const O=async r=>{if(r.preventDefault(),!C){let t={};l.length<3&&(t={...t,name:"El nombre debe tener al menos 3 caracteres"}),n.length<10&&(t={...t,phone:"El número de teléfono debe tener al menos 10 caracteres"}),o.length<5&&(t={...t,email:"El email debe tener al menos 5 caracteres"}),j({phone:t.phone,name:t.name,email:t.email}),Object.keys(c).length<1&&alert("No hay productos en el ticket");return}j({phone:"",name:"",email:""}),k(!0);let u;u=Object.values(c).map(t=>({id:t.id,quantity:t.quantity}));let v;v=Object.values(w).map(t=>({name:t.name,quantityDescription:t.quantityDescription,description:t.description}));const S=await T({items:u,outterItems:v,phone:n,name:l,email:o,user:{phone:n,name:l,email:o},couppon:m});a(S),k(!1),Object.values(c).map(t=>{f.get()[t.id],f.setKey(t.id,void 0)}),Object.values(w).map(t=>{M(t.name)})};return s.useEffect(()=>{Object.keys(c).length>0&&n.length>9&&l.length>2&&o.length>5?y(!0):y(!1)},[c,n,l,o]),e.jsxs("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mb-8",children:[p&&e.jsx("div",{className:"text-center",children:e.jsxs("div",{role:"status",children:[e.jsxs("svg",{"aria-hidden":"true",className:"inline w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),e.jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),e.jsx("span",{className:"sr-only text-gray-900 dark:text-white",children:"Enviando..."})]})}),g?e.jsxs("div",{className:"flex flex-col items-center justify-center text-green-500 font-medium my-24",children:[e.jsxs("div",{className:"w-full container mx-auto my-8 p-8 rounded shadow-lg mb-8 flex items-center justify-center",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-circle-check",width:"40",height:"40",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"}),e.jsx("path",{d:"M9 12l2 2l4 -4"})]}),e.jsx("p",{className:"ml-2",children:"Pedido enviado"})]}),e.jsxs("div",{className:"w-full container mx-auto my-8 p-8 rounded shadow-lg",children:[e.jsx("h1",{className:"text-gray-900 text-2xl font-bold mb-6 flex items-center justify-center dark:text-white",children:"Gracias!"}),e.jsxs("div",{className:"flex items-center mb-8",children:[e.jsx("div",{className:"flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-check",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M5 12l5 5l10 -10"})]})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("h2",{className:"text-gray-900 text-lg font-semibold dark:text-white",children:"Ya recibimos tu pedido"}),e.jsx("p",{className:"text-gray-900 dark:text-white",children:"En un momento nos pondremos en contacto contigo para confirmar tu pedido vía Whatsapp o email."})]})]})]})]}):e.jsx("div",{children:e.jsxs("div",{className:"max-w-sm mx-auto",children:[e.jsxs("div",{className:"mb-5",children:[d.name&&e.jsx("p",{className:"text-red-500 text-xs italic mb-2",children:d.name}),e.jsx("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tu nombre / Empresa"}),e.jsx("input",{type:"text",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",name:"name",onChange:r=>x(r.target.value),minLength:3,required:!0})]}),e.jsxs("div",{className:"mb-5",children:[d.phone&&e.jsx("p",{className:"text-red-500 text-xs italic mb-2",children:d.phone}),e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Tu Whatsapp"}),e.jsx("input",{type:"tel",id:"tel",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"55 4647 6943",name:"tel",minLength:10,onChange:r=>i(r.target.value),required:!0})]}),e.jsxs("div",{className:"mb-5",children:[d.email&&e.jsx("p",{className:"text-red-500 text-xs italic mb-2",children:d.email}),e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email"}),e.jsx("input",{type:"email",id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"ejemplo@gmail.com",name:"email",onChange:r=>b(r.target.value),required:!0})]}),e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{htmlFor:"tel",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Cupón"}),e.jsx("input",{type:"text",id:"coupon",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",name:"coupon",value:m,onChange:r=>h(r.target.value),required:!0})]}),e.jsx("div",{className:"flex items-start mb-5"}),e.jsx("button",{onClick:r=>O(r),className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Enviar pedido"})]})})]})}export{B as default};
