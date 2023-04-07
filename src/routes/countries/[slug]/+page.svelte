<script lang="ts">
  import lookup from "country-code-lookup";

  export let data;
  const {
    country,
    travelAdvisory,
    wikiArticle,
    currencyConversion,
    slug,
  } = data;
  // travel advisory
  const travelAdvisoryReq: any = Object.values(travelAdvisory)[0];
  const travelAdvisoryData: any = Object.values(travelAdvisory)[1];
  const currentCountryAdvisory: any = Object.values(travelAdvisoryData)[0];
  const travelAdvisoryResponseCode: any = travelAdvisoryReq.reply.code;

  const countryItem = country[0];

  const countryLanguages: any = Object.values(countryItem.languages);

  const countryCurrenciesValues: any = Object.values(countryItem.currencies);
  const { new_amount, new_currency } = currencyConversion;

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

<div class="main">
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
      <div class="tabs">
        <a href="./{name.common},{name.official}/travel/">Travel</a>
        <a href="./{name.common},{name.official}/history/">History</a>
        <a href="./{name.common},{name.official}/culture/">Culture</a>
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
        {#if new_amount !== undefined}
          <p>$1 USD = {new_amount} {new_currency}</p>
        {/if}
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

      {#if travelAdvisoryResponseCode == 200}
        <!-- Advisory API seems to default to...Niue Island? Adding a check for that. -->
        {#if currentCountryAdvisory.iso_alpha2 !== "NU"}
          <div class="travel-advisory">
            <b>Travel Advisory:</b>
            <p>{currentCountryAdvisory.advisory.message}</p>
            <a target="_blank" href={currentCountryAdvisory.advisory.source}
              >Source</a
            >
          </div>
        {/if}
      {/if}
    </div>

    {#if wikiArticle.type !== "disambiguation"}
      <div class="container wiki-blob">
        <h3>Summary</h3>
        <div class="summary">{@html wikiArticle.extract_html}</div>
      </div>
    {/if}
    
    <!-- <hr style="padding: 5px; background: #e3e3e3"> -->
  </div>

  <!-- likely affecting load time... will move it to separate page... one day -->
  <!-- {#if cities.length !== 0}
    <div class="country-cities">
      <h3>Most Populated Cities of {name.common}</h3>
      <div class="city-wrap">
        {#each cities as { is_capital, latitude, longitude, name, population, country }}
          <div class="city">
            <h1>{name}</h1>
            {#if is_capital == true}
              <b>Capital</b>
            {/if}

            <p>Coordinates: {latitude}, {longitude}</p>
            {#if population}
              <p>Population: {population.toLocaleString()}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <hr />
  {/if} -->

  <!-- causes too many errors (missing thumbnail?) -->
  <!-- {#if webcamResults.length > 0}
    <div class="webcams">
      <h3>Webcams from around {name.common}</h3>
      <div class="webcam-wrap">
        {#each webcamResults as { location, player, title }}
          <div class="webcam">
            <p>{title}</p>
            <iframe
              {title}
              src={player.day.embed}
              frameborder="0"
              width="300"
              height="200"
            />
          </div>
        {/each}
      </div>
    </div>
  {/if} -->
</div>

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
