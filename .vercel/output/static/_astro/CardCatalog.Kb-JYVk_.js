import{j as e,b as k}from"./ticketStore.XeD6LfZM.js";import{r as d}from"./index.LFf77hJu.js";function w({name:a,quantity:n,itsKg:r}){const i={position:"fixed",top:"1rem",right:"1rem"},[s,l]=d.useState(!0);return d.useEffect(()=>{const t=setTimeout(()=>{l(!1)},3e3);return()=>{clearTimeout(t)}},[]),s?e.jsxs("div",{id:"toast-default",className:"flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",role:"alert",style:i,children:[e.jsxs("div",{className:"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200",children:[e.jsx("svg",{className:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 20",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"})}),e.jsx("span",{className:"sr-only",children:"Fire icon"})]}),e.jsxs("div",{className:"ms-3 text-sm font-normal",children:["Se agregaron ",n," ",r?"KG":null," ",a]}),e.jsxs("button",{type:"button",onClick:()=>l(!s),className:"ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700","data-dismiss-target":"#toast-default","aria-label":"Close",children:[e.jsx("span",{className:"sr-only",children:"Close"}),e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})})]})]}):null}const v=({handleSubtract:a,handleAdd:n,saveItem:r,price:i,quantity:s,unit:l})=>e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-3xl font-bold text-gray-900 mr-1 dark:text-white",children:["$",i.toFixed(2)]}),e.jsx("button",{className:"text-white border px-3 py-2 text-xl bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800 dark:text-white",onClick:a,children:"-"}),e.jsx("button",{onClick:r,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center sm:text-large dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:s&&s>1?`Agregar ${s} ${l=="Caja"?l+"s":l+"es"}`:"Agregar a carrito"}),e.jsx("button",{className:"text-white border px-3 quantity py-2 text-xl bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800",onClick:n,children:"+"})]}),N=({setQuantity:a,saveItem:n,item:r})=>e.jsxs("div",{className:"grid grid-cols-2",children:[e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsxs("span",{className:"text-3xl font-bold text-gray-900 mr-1 dark:text-white",children:["$",r.price.toFixed(2)]}),e.jsx("span",{className:"text-xl font-bold text-gray-900 mr-1 dark:text-white",children:"/Kg"})]}),e.jsxs("div",{className:"grid grid-rows-2",children:[e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsx("input",{type:"number",min:"1",value:r.quantity,id:"Line1Qty",onChange:i=>a(parseFloat(i.target.value)),className:"h-8 w-8 rounded border-gray-200 bg-gray-50 p-0 mr-2 text-center text-xl text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"}),e.jsx("span",{className:"text-xl my-2 font-bold text-gray-900 mr-1 dark:text-white",children:"Kgs"})]}),e.jsx("div",{children:e.jsx("button",{onClick:n,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Agregar a ticket"})})]})]});function K({name:a,price:n,image:r,id:i,unit:s,category:l}){const[t,o]=d.useState(1),[x,g]=d.useState(!1),[m,b]=d.useState(0),c={id:i,name:a,price:n,quantity:t,imageUrl:r,unit:s,thumbnail:r.image_path.thumbnail},h=()=>{o(t+1)},{image_path:p}=r,{primary:f}=p,y=()=>{t!==1&&o(t-1)},u=j=>{j.preventDefault(),t===0&&o(t+1),g(!0),k(c),b(t),o(1)};return e.jsxs("div",{className:"relative item-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("img",{className:"p-8 rounded-t-lg",src:f,alt:"product image"}),c.unit==="KG"&&t>0?e.jsxs("span",{className:"absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full",children:[t," KGS"]}):t>1&&e.jsx("span",{className:"absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full",children:t}),e.jsxs("div",{className:"px-5 pb-5",children:[e.jsx("h2",{className:"text-xl font-semibold tracking-tight text-gray-900 dark:text-white",children:a}),e.jsxs("div",{className:"flex items-center mt-2.5 mb-5",children:[e.jsx("div",{className:"flex items-center space-x-1 rtl:space-x-reverse",children:e.jsx("p",{className:"text-gray-900 dark:text-white",children:l})}),e.jsx("span",{className:"text-gray-900 bg-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3",children:s})]}),c.unit==="KG"?e.jsx(N,{item:c,setQuantity:o,saveItem:u,price:n}):e.jsx(v,{handleSubtract:y,quantity:t,unit:s,handleAdd:h,saveItem:u,price:n})]}),x&&e.jsx(w,{name:a,quantity:m,itsKg:s==="KG"})]})}export{K as default};
