import{j as e,a as j}from"./ticketStore.MgM2ncU-.js";import{r as o}from"./index.LFf77hJu.js";import{S as k}from"./consts.pxyDyKIt.js";function v({name:r,quantity:a,itsKg:s}){const n={position:"fixed",top:"1rem",right:"1rem"},[l,d]=o.useState(!0);return o.useEffect(()=>{const t=setTimeout(()=>{d(!1)},3e3);return()=>{clearTimeout(t)}},[]),l?e.jsxs("div",{id:"toast-default",className:"flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",role:"alert",style:n,children:[e.jsxs("div",{className:"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200",children:[e.jsx("svg",{className:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 20",children:e.jsx("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"})}),e.jsx("span",{className:"sr-only",children:"Fire icon"})]}),e.jsxs("div",{className:"ms-3 text-sm font-normal",children:["Se agregaron ",a," ",s?"KG":null," ",r]}),e.jsxs("button",{type:"button",onClick:()=>d(!l),className:"ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700","data-dismiss-target":"#toast-default","aria-label":"Close",children:[e.jsx("span",{className:"sr-only",children:"Close"}),e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14",children:e.jsx("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})})]})]}):null}const N=({handleSubtract:r,handleAdd:a,saveItem:s,price:n})=>e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-3xl font-bold text-gray-900 mr-1 dark:text-white",children:["$",n.toFixed(2)]}),e.jsx("button",{className:"text-white border px-3 py-2 text-xl bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800 dark:text-white",onClick:r,children:"-"}),e.jsx("button",{onClick:s,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center sm:text-large dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Agregar a ticket"}),e.jsx("button",{className:"text-white border px-3 py-2 text-xl bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg hover:bg-blue-800",onClick:a,children:"+"})]}),C=({setQuantity:r,saveItem:a,item:s})=>e.jsxs("div",{className:"grid grid-cols-2",children:[e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsxs("span",{className:"text-3xl font-bold text-gray-900 mr-1 dark:text-white",children:["$",s.price.toFixed(2)]}),e.jsx("span",{className:"text-xl font-bold text-gray-900 mr-1 dark:text-white",children:"/Kg"})]}),e.jsxs("div",{className:"grid grid-rows-2",children:[e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsx("input",{type:"number",min:"1",value:s.quantity,id:"Line1Qty",onChange:n=>r(parseFloat(n.target.value)),className:"h-8 w-8 rounded border-gray-200 bg-gray-50 p-0 mr-2 text-center text-xl text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"}),e.jsx("span",{className:"text-xl my-2 font-bold text-gray-900 mr-1 dark:text-white",children:"Kgs"})]}),e.jsx("div",{children:e.jsx("button",{onClick:a,className:"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Agregar a ticket"})})]})]});function I({name:r,price:a,image:s,id:n,unit:l,category:d}){const[t,i]=o.useState(1),[x,g]=o.useState(!1),[m,b]=o.useState(0);console.log(s.image_path.thumbnail);const u={id:n,name:r,price:a,quantity:t,imageUrl:s,unit:l,thumbnail:s.image_path.thumbnail},h=()=>{i(t+1)},{image_path:p}=s,{primary:f}=p,y=()=>{t!==0&&i(t-1)},c=w=>{w.preventDefault(),t===0&&i(t+1),g(!0),j(u),b(t),i(1)};return e.jsxs("div",{className:"relative item-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("img",{className:"p-8 rounded-t-lg",src:k+f+"/",alt:"product image"}),u.unit==="KG"&&t>0?e.jsxs("span",{className:"absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full",children:[t," KGS"]}):t>1&&e.jsx("span",{className:"absolute top-3 right-3 bg-blue-700 text-white px-2 py-2 rounded-full",children:t}),e.jsxs("div",{className:"px-5 pb-5",children:[e.jsx("h2",{className:"text-xl font-semibold tracking-tight text-gray-900 dark:text-white",children:r}),e.jsxs("div",{className:"flex items-center mt-2.5 mb-5",children:[e.jsx("div",{className:"flex items-center space-x-1 rtl:space-x-reverse",children:e.jsx("p",{className:"text-gray-900 dark:text-white",children:d})}),e.jsx("span",{className:"text-gray-900 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3",children:l})]}),u.unit==="KG"?e.jsx(C,{item:u,setQuantity:i,saveItem:c,price:a}):e.jsx(N,{handleSubtract:y,handleAdd:h,saveItem:c,price:a})]}),x&&e.jsx(v,{name:r,quantity:m,itsKg:l==="KG"})]})}export{I as default};
