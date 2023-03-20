import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
const app = "";
const Header_svelte_svelte_type_style_lang = "";
const css = {
  code: ".header.svelte-o4q58e.svelte-o4q58e{box-shadow:0 0 3px rgb(0,0,0,0.5);border-radius:3px;width:fit-content;background:#b4eaff;padding:5px 10px 5px 10px;margin:5px}.brand.svelte-o4q58e a.svelte-o4q58e{text-decoration:none;color:#222222;font-size:22px;font-weight:bold}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header class="header svelte-o4q58e"><div class="brand svelte-o4q58e"><a href="/" class="svelte-o4q58e">Sightseer</a></div>
</header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
