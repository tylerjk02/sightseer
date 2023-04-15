<script lang="ts">
  import lookup from "country-code-lookup";

  export let data;
  const { country, slug } = data;

  const countryItem = country[0];

  let countryLanguages: any;
  if (countryItem.languages) {
    countryLanguages = Object.values(countryItem.languages);
  }

  const countryCurrenciesValues: any = Object.values(countryItem.currencies);

  const countryDrivingSide: any = Object.values(countryItem.car);

  const {
    name,
    region,
    coatOfArms,
    demonyms,
    flags,
    area,
    capital,
    population,
    independent,
    landlocked,
    borders,
    tld,
    unMember,
  } = countryItem;

  const countryRegion = region;

  let borderList: any[] = [];
  let borderString: string[] = [];
  if (borders) {
    for (let i = 0; i < borders.length; i++) {
      borderList.push(lookup.byIso(borders[i]));
    }
    for (let i = 0; i < borderList.length; i++) {
      borderString.push(borderList[i].country);
    }
  }
</script>

<main class="main">
  <div class="region">
    <div class="trace-back">
      <a href="/">continents</a>/<a href="/continents/{region.toLowerCase()}"
        >{region.toLowerCase()}</a
      >/
      <p>{name.common.toLowerCase()}</p>
    </div>
  </div>

  <div class="country">
    <div class="top">
      <div class="tabs" data-sveltekit-preload-data="off">
        <a href="./{name.common},{name.official}/travel/">Travel</a>
        <!-- <a href="./{name.common},{name.official}/cities">Cities</a> -->
        <a href="./{name.common},{name.official}/history/">History</a>
        <a href="./{name.common},{name.official},{demonyms.eng.m}/culture/"
          >Culture</a
        >
        <a href="./{name.common},{name.official}/photos/">Photos</a>

        <a href="./{name.common},{name.official}/nature/">Nature</a>

        <!-- <a href="./{name.common},{name.official}/news">News</a> -->
      </div>

      <div class="container country-info">
        <div class="country-political-images">
          {#if coatOfArms.hasOwnProperty("svg")}
            <img class="country-coa" src={coatOfArms.svg} alt="Coat of Arms" />
          {/if}
          <img class="country-flag" src={flags.svg} alt={flags.alt} />
        </div>
        <h1>{name.common}</h1>
        <p><b>{name.official}</b></p>
        <div class="area">
          <b>Size</b>: {area.toLocaleString()}km<sup>2</sup>
        </div>
        <p><b>Capital</b>: {capital}</p>

        {#if borders}
          <p><b>Borders</b>: {borderString.join(", ")}</p>
        {/if}
        {#if population}
          <p><b>Population</b>: {population.toLocaleString()}</p>
        {/if}
        {#if landlocked == true}
          <div class="landlocked"><b>Landlocked</b></div>
        {/if}
        {#if independent == false}
          <div class="independent"><b>Non-Independent</b></div>
        {/if}
        {#if unMember == true}
          <b>UN Member</b>: Yes
        {:else}
          <b>UN Member</b>: No
        {/if}
      </div>
    </div>

    <hr />

    <div class="container important-info">
      <h3>Things to Know</h3>
      {#if countryLanguages.length == 1}
        <div class="language">
          <b>Official Language</b>: {countryLanguages}
        </div>
      {:else}
        <div class="language">
          <b>Official Languages</b>: {countryLanguages.join(", ")}
        </div>
      {/if}
      <div class="demonym">
        <b>Citizen Demonym</b>: <b>Male</b>: {demonyms.eng.m}, <b>Female</b>: {demonyms
          .eng.f}
      </div>
      <div class="currency">
        <b>Currency</b>: {countryCurrenciesValues[0].name} ({countryCurrenciesValues[0]
          .symbol})

        <!-- Currency Conversion -->
        {#await data.streamed.currency}
          Converting...
        {:then conversion}
          {#if conversion.new_amount !== undefined}
            <p>$1 USD = {conversion.new_amount} {conversion.new_currency}</p>
          {/if}
        {:catch error}
          {console.error(error)}
        {/await}
        <!-- End Currency Conversion -->
      </div>
      {#if countryDrivingSide[1] !== undefined}
        <div class="driving-side">
          <b>Driving Side</b>: {countryDrivingSide[1].charAt(0).toUpperCase() +
            countryDrivingSide[1].slice(1)}
        </div>
      {/if}
      {#if tld !== ""}
        <div class="top-level-domain">
          <b>Top-Level Domain</b>: {tld}
        </div>
      {/if}

      <!-- Travel Advisory -->
      {#await data.streamed.travel}
        Loading...
      {:then response}
        <div class="travel-advisory">
          <b>Travel Advisory:</b>
          <p>{response.advisory.message}</p>
          <a target="_blank" href={response.advisory.source}>Source</a>
        </div>
      {:catch error}
        {console.error(error)}
      {/await}
      <!-- End Travel Advisory -->
    </div>

    {#await data.streamed.article}
      Loading...
    {:then article}
      {#if article.type !== "disambiguation"}
        <div class="container wiki-blob">
          <h3>Summary</h3>
          <div class="summary">{@html article.extract_html}</div>
        </div>
      {/if}
    {:catch error}
      {console.error(error)}
    {/await}
    <!-- {#if wikiArticle.type !== "disambiguation"}

    {/if} -->

    <!-- <hr style="padding: 5px; background: #e3e3e3"> -->
  </div>
</main>

<style lang="scss">
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 0;
  }

  .wiki-blob {
    padding-bottom: 10px !important;
  }
  .country {
    .top {
      width: 100%;
      justify-content: space-between;
      display: flex;
      flex-direction: row-reverse;
      background: #e3e3e3;
      padding: 5px 5px 5px 0;
    }
    .tabs {
      background: #e3e3e3;
      display: flex;
      flex-direction: column;
      gap: 5px;

      a {
        text-align: center;
        text-decoration: none;
        background: #222222;
        color: #ffffff;
        padding: 0 15px;
        font-size: 18px;
      }
      a:hover {
        background: #343434;
        text-decoration: underline;
      }
    }
    .container {
      background: #e3e3e3;
      padding: 0 10px;

      h3 {
        padding: 5px 0;
        font-size: 36px;
      }
    }

    .country-political-images {
      display: flex;
      gap: 10px;
      align-items: center;

      .country-coa {
        width: 65px;
      }
      .country-flag {
        width: 70px;
      }
    }
  }
</style>
