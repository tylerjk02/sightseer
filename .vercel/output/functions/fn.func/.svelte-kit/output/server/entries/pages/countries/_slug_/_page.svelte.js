import { c as create_ssr_component, e as escape, f as add_attribute, d as each } from "../../../../chunks/index.js";
import lookup from "country-code-lookup";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".photo-header.svelte-1msz1bc.svelte-1msz1bc{padding:5px 0;font-size:36px}.country-cities.svelte-1msz1bc.svelte-1msz1bc{background:#e3e3e3}.country-cities.svelte-1msz1bc h3.svelte-1msz1bc{padding:5px 0;font-size:36px}.city.svelte-1msz1bc.svelte-1msz1bc{border:1px solid #222;padding:2px;margin:5px 0}.country-images.svelte-1msz1bc.svelte-1msz1bc{margin:0px auto;width:min-content;display:grid;grid-template-columns:repeat(4, auto);gap:5px}.trace-back.svelte-1msz1bc.svelte-1msz1bc{display:flex;gap:1px;margin:5px 0}.main.svelte-1msz1bc.svelte-1msz1bc{margin:5px}.country.svelte-1msz1bc.svelte-1msz1bc{background:#e3e3e3;padding:1rem}.country-flag.svelte-1msz1bc.svelte-1msz1bc{width:70px}.country-coa.svelte-1msz1bc.svelte-1msz1bc{width:65px}.country-political-images.svelte-1msz1bc.svelte-1msz1bc{display:flex;gap:10px;align-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { country, photos, cities } = data;
  const countryItem = country[0];
  const { results } = photos;
  const { name, region, coatOfArms, flags, area, capital, languages, population, independent, landlocked, borders } = countryItem;
  let borderList = [];
  let borderString = [];
  if (borders) {
    for (let i = 0; i < borders.length; i++) {
      borderList.push(lookup.byIso(borders[i]));
    }
    for (let i = 0; i < borderList.length; i++) {
      borderString.push(borderList[i].country);
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="main svelte-1msz1bc"><div class="region"><div class="trace-back svelte-1msz1bc"><a href="/">home</a>/<a href="${"/continents/" + escape(region.toLowerCase(), true)}">${escape(region.toLowerCase())}</a>/
      <p>${escape(name.common.toLowerCase())}</p></div></div>

  <div class="country svelte-1msz1bc"><div class="country-political-images svelte-1msz1bc">${coatOfArms.hasOwnProperty("svg") ? `<img class="country-coa svelte-1msz1bc"${add_attribute("src", coatOfArms.svg, 0)} alt="Coat of Arms">` : ``}
      <img class="country-flag svelte-1msz1bc"${add_attribute("src", flags.svg, 0)}${add_attribute("alt", flags.alt, 0)}></div>
    <div class="country-info"><div class="country-top"><h1>${escape(name.common)}</h1>
        <p>${escape(name.official)}</p>
        <p>Capital: <b>${escape(capital)}</b></p></div>
      <div class="country-mid"><h2>Geography:</h2>
        <p>${escape(area.toLocaleString())}km<sup>2</sup></p>
        ${borders ? `<p>Borders: ${escape(borderString.join(", "))}</p>` : ``}
        <h2>Demographics:</h2>
        <p>Population: ${escape(population.toLocaleString())}</p></div></div></div>
  <hr>
  ${cities.length !== 0 ? `<div class="country-cities svelte-1msz1bc"><h3 class="svelte-1msz1bc">Most Populated Cities of ${escape(name.common)}</h3>

      ${each(cities, ({ is_capital, latitude, longitude, name: name2, population: population2 }) => {
    return `<div class="city svelte-1msz1bc"><h1>${escape(name2)}</h1>
          ${is_capital == true ? `<b>Capital</b>` : ``}
          <p>Coordinates: ${escape(latitude)}, ${escape(longitude)}</p>
          <p>Population: ${escape(population2.toLocaleString())}</p>
        </div>`;
  })}</div>` : ``}
  <h3 class="photo-header svelte-1msz1bc">Photos relating to ${escape(name.common)}</h3>
  <div class="country-images svelte-1msz1bc">${each(results, (image) => {
    return `<img${add_attribute("src", image.urls.raw + "&w=300&h=400&fit=crop", 0)} alt="">`;
  })}</div>
</div>`;
});
export {
  Page as default
};
