const s=({fetch:e,params:t})=>{const n=async o=>await(await e(`https://restcountries.com/v3.1/region/${o}`)).json();return{slug:t.slug,continents:n(t.slug)}},c=Object.freeze(Object.defineProperty({__proto__:null,load:s},Symbol.toStringTag,{value:"Module"}));export{c as _,s as l};
