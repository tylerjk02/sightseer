<script lang="ts">
  import lookup from "country-code-lookup";
  export let data;

  const { country, travelAdvisory, wikiArticle, webcams, cities, slug } = data;
  // const cities: any = data.cities;
  const webcamResults = webcams.result.webcams;

  const travelAdvisoryReq: any = Object.values(travelAdvisory)[0];
  const travelAdvisoryData: any = Object.values(travelAdvisory)[1];
  const currentCountryAdvisory: any = Object.values(travelAdvisoryData)[0];
  const travelAdvisoryResponseCode = travelAdvisoryReq.reply.code;

  const countryItem = country[0];

  const countryLanguages: any = Object.values(countryItem.languages);
  const countryCurrenciesValues: any = Object.values(countryItem.currencies);
  const countryDrivingSide: any = Object.values(countryItem.car);

  const {
    name,
    region,
    coatOfArms,
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
  <hr />

  <div class="country">
    <div class="top-tabs">
      <a href="./{name.common}/travel/">Travel to {name.common}</a>
    </div>
    <div class="country-political-images">
      {#if coatOfArms.hasOwnProperty("svg")}
        <img class="country-coa" src={coatOfArms.svg} alt="Coat of Arms" />
      {/if}
      <img class="country-flag" src={flags.svg} alt={flags.alt} />
    </div>

    <div class="country-info">
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

  <div class="important-info">
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

    <div class="currency">
      <b>Currency</b>: {countryCurrenciesValues[0].name}
    </div>

    <div class="driving-side">
      <b>Driving Side</b>: {countryDrivingSide[1].charAt(0).toUpperCase() +
        countryDrivingSide[1].slice(1)}
    </div>
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

  <div class="wiki-blob">
    <h3>Short Summary from Wikipedia</h3>
    <div class="summary">{@html wikiArticle.extract_html}</div>
  </div>

  {#if cities.length !== 0}
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
  {/if}
  {#if webcamResults.length > 0}
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
  {/if}
</div>

<style>
  .yt-search {
    text-align: center;
    background: #e3e3e3;
    /* padding: 0 5px 5px 5px; */
  }
  .yt-search h3 {
    padding: 5px 0;
    font-size: 36px;
  }
  .webcam {
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .webcam p {
    margin-bottom: 10px;
  }

  .webcam-wrap {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    /* gap: 5px; */
  }
  .important-info {
    background: #e3e3e3;
    padding: 0 15px;
  }
  .important-info h3 {
    padding: 5px 0;
    font-size: 36px;
  }
  .webcams {
    text-align: center;
    background: #e3e3e3;
    /* padding: 0 5px 5px 5px; */
  }

  .webcams h3 {
    padding: 5px 0;
    font-size: 36px;
  }
  .city-depth img {
    width: 300px;
  }
  .city-depth:first-of-type {
    margin-top: 0;
  }
  .city-depth:last-of-type {
    margin-bottom: 0;
  }
  .city-depth {
    background: #ffffff;
    border: 1px solid black;
    padding: 5px;
    display: flex;
    flex-direction: column;
    /* margin: 3px 0; */
  }
  .city-depth a {
    margin-top: auto;
  }
  .city-depth h3 {
    text-align: left !important;
    /* height: fit-content; */
  }
  .city-wrap-depth {
    /* height: 100%; */
    display: grid;
    gap: 5px;
    /* align-items: center; */
    grid-template-columns: repeat(2, 1fr);
  }
  .city-cities-depth {
    background: #e3e3e3;
    padding: 5px;
  }
  .city-cities-depth h3 {
    text-align: center;
    padding: 0 0 5px 0;
    font-size: 36px;
  }
  .country-info h1 {
    font-size: 38px;
  }
  .wiki-blob {
    background: #e3e3e3;
    padding: 0 15px;
  }
  .wiki-blob h3 {
    padding: 5px 0;
    font-size: 36px;
  }
  .wiki-blob div {
    text-indent: 40px;
    font-size: 18px;
  }
  .photo-header {
    padding: 0 0 5px 0;
    font-size: 36px;
  }
  .country-cities {
    padding: 5px;
    background: #e3e3e3;
  }
  .country-cities h3 {
    text-align: center;
    padding: 5px 0 5px 0;
    font-size: 36px;
  }
  .city-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  .city {
    background: #ffffff;
    border: 1px solid #222;
    padding: 5px;
    /* margin: 5px 0; */
    /* margin: 5px; */
  }
  .country-images {
    margin: 0px auto;
    width: min-content;
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 5px;
  }
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 0;
  }
  .main {
    margin: 5px;
  }
  .top-tabs {
    padding: 10px 0 15px 0;
  }
  .top-tabs a {
    text-decoration: none;
    /* border: 1px solid black; */
    padding: 5px;
  }
  .top-tabs a:hover {
    text-decoration: underline;
  }
  .country {
    background: #e3e3e3;
    padding: 1rem;
    padding-top: 0;
  }
  .country-flag {
    width: 70px;
  }
  .country-coa {
    width: 65px;
  }
  .photo-header {
    text-align: center;
  }
  .country-political-images {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  @media screen and (max-width: 728px) {
    .city-wrap {
      /* display: grid; */
      grid-template-columns: 1fr;
    }

    .city-wrap-depth {
      grid-template-columns: 1fr;
    }

    .country-images {
      grid-template-columns: 1fr;
    }

    .webcam-wrap {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (min-width: 1028px) {
    .webcam-wrap {
      grid-template-columns: repeat(3, 3fr);
    }
  }
</style>
