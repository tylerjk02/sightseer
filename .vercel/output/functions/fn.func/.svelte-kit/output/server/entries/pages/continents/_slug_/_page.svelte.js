import { c as create_ssr_component, e as escape, d as each, f as add_attribute } from "../../../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".continent.svelte-1rksl3x.svelte-1rksl3x{margin:5px}.trace-back.svelte-1rksl3x.svelte-1rksl3x{display:flex;gap:1px;margin:5px 0 0 0}.country.svelte-1rksl3x.svelte-1rksl3x{background:#e3e3e3;padding:1rem;margin:5px;display:flex;align-items:center;gap:5px}.country-flag.svelte-1rksl3x img.svelte-1rksl3x{width:65px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { continents, slug } = data;
  continents.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="continent svelte-1rksl3x"><div class="trace-back svelte-1rksl3x"><a href="/">home</a>/<p>${escape(slug)}</p></div>
  ${slug == "americas" ? `<h1>Countries in the ${escape(slug.charAt(0).toLocaleUpperCase() + slug.slice(1))}</h1>` : `<h1>Countries in ${escape(slug.charAt(0).toLocaleUpperCase() + slug.slice(1))}</h1>`}
  <div class="list">${each(continents, ({ name, flag, flags, altSpellings }) => {
    return `<div class="country svelte-1rksl3x"><div class="country-flag svelte-1rksl3x"><img${add_attribute("src", flags.svg, 0)}${add_attribute("alt", flags.alt, 0)} class="svelte-1rksl3x"></div>
        <div class="country-info"><a href="${"/countries/" + escape(name.official, true)}">${escape(name.common)}</a>
          <p>${escape(name.official)}</p></div>
      </div>`;
  })}</div>
</div>`;
});
export {
  Page as default
};
