import { c as create_ssr_component } from "../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".region-link.svelte-1ox2u8u.svelte-1ox2u8u{width:20%;position:relative;text-align:center;color:white}.centered.svelte-1ox2u8u.svelte-1ox2u8u{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);font-size:42px;background:#333333ce;padding:5px 15px;border-radius:10px}.region-link.svelte-1ox2u8u.svelte-1ox2u8u:hover{z-index:1000;transform:scale(104%);transition:all 0.3s}.regions.svelte-1ox2u8u.svelte-1ox2u8u{display:flex;align-items:center}.region-img.svelte-1ox2u8u.svelte-1ox2u8u{width:100%;height:200px}.main.svelte-1ox2u8u h1.svelte-1ox2u8u{margin:5px 0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="main svelte-1ox2u8u"><h1 class="svelte-1ox2u8u">Choose a region</h1>
  <div class="regions svelte-1ox2u8u"><a class="region-link svelte-1ox2u8u" href="/continents/africa"><img class="region-img svelte-1ox2u8u" src="/img/africa.jpg" alt="">
      <div class="centered svelte-1ox2u8u">Africa</div></a>
    <a class="region-link svelte-1ox2u8u" href="/continents/asia"><img class="region-img svelte-1ox2u8u" src="/img/asia.jpg" alt="">
      <div class="centered svelte-1ox2u8u">Asia</div></a>
    <a class="region-link svelte-1ox2u8u" href="/continents/europe"><img class="region-img svelte-1ox2u8u" src="/img/europe.jpg" alt="">
      <div class="centered svelte-1ox2u8u">Europe</div></a>
    <a class="region-link svelte-1ox2u8u" href="/continents/americas"><img class="region-img svelte-1ox2u8u" src="/img/americas.jpg" alt="">
      <div class="centered svelte-1ox2u8u">Americas</div></a>
    <a class="region-link svelte-1ox2u8u" href="/continents/oceania"><img class="region-img svelte-1ox2u8u" src="/img/oceania.jpg" alt="">
      <div class="centered svelte-1ox2u8u">Oceania</div></a></div>
</main>`;
});
export {
  Page as default
};
