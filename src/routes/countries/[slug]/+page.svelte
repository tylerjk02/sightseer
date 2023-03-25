<script lang="ts">
  import lookup from "country-code-lookup";
  export let data;
  const getData = new Promise((res, rej) => {
    setTimeout(() => {
      res(data);
    });
  });
  const { country, photos, cities, travelAdvisory, wikiArticle, webcams } =
    data;
  const webcamResults = webcams.result.webcams;

  console.log(webcamResults);

  const citiesBasic = cities[0];
  const citiesDepth = cities[1];
  const travelAdvisoryReq: any = Object.values(travelAdvisory)[0];
  const travelAdvisoryData: any = Object.values(travelAdvisory)[1];
  const currentCountryAdvisory: any = Object.values(travelAdvisoryData)[0];
  const travelAdvisoryResponseCode = travelAdvisoryReq.reply.code;
  const filteredCitiesDepth = citiesDepth.filter((e: any) => {
    return e.title !== "Not found." && e.type !== "disambiguation";
  });

  const filteredCitiesDepthNoAlts = filteredCitiesDepth.filter((e: any) => {
    const testStrings = ["city", "town", "village", "hamlet", "capital"];
    const splitExtract = e.extract.split(" ");
    const testExtract = testStrings.some((x) => splitExtract.includes(x));
    return testExtract;
  });

  const countryItem = country[0];
  const countryLanguages = Object.values(countryItem.languages);
  const countryCurrenciesValues: any = Object.values(countryItem.currencies);
  const countryDrivingSide: any = Object.values(countryItem.car);

  const { results } = photos;
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

{#await getData}
  <p>loading...</p>
{:then}
  <div class="main">
    <div class="region">
      <div class="trace-back">
        <a href="/">home</a>/<a href="/continents/{region.toLowerCase()}"
          >{region.toLowerCase()}</a
        >/
        <p>{name.common.toLowerCase()}</p>
      </div>
    </div>

    <div class="country">
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
      {#if tld.length !== 0}
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

    {#if wikiArticle.extract_html !== "<p><b>CN</b>, <b>Cn</b>, <b>cn</b> and other variants may refer to:</p>"}
      <hr />
      <div class="wiki-blob">
        <h3>Short Summary from Wikipedia</h3>
        <div class="summary">{@html wikiArticle.extract_html}</div>
      </div>
    {/if}

    <hr />
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
    <hr />
    {#if cities[0].length > 0}
      <div class="country-cities">
        <h3>Most Populated Cities of {name.common}</h3>
        <div class="city-wrap">
          {#each citiesBasic as { is_capital, latitude, longitude, name, population, country }}
            <div class="city">
              <h1>{name}</h1>
              {#if is_capital == true}
                <b>Capital</b>
              {/if}

              <p>Coordinates: {latitude}, {longitude}</p>
              {#if population}
                <p>Population: {population.toLocaleString()}</p>
              {/if}
              <a href="/cities/{name},{country},{latitude},{longitude}"
                >More Info</a
              >
            </div>
          {/each}
        </div>
      </div>

      <div class="city-cities-depth">
        <h3>City Info in Depth</h3>
        <div class="city-wrap-depth">
          {#each filteredCitiesDepthNoAlts as { content_urls, country, coordinates, description, displaytitle, extract_html, thumbnail }}
            <div class="city-depth">
              <div class="city-depth-info">
                <h3>{@html displaytitle}</h3>
                {#if coordinates}
                  <p>{coordinates.lat}, {coordinates.lon}</p>
                {/if}
                {#if thumbnail}
                  <img src={thumbnail.source} alt="" />
                {/if}
              </div>
              <div class="city-depth-blurb">
                {@html extract_html}
              </div>
              <a href={content_urls.desktop.page}>{content_urls.desktop.page}</a
              >
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if results.length !== 0}
      <h3 class="photo-header">Photos relating to {name.common}</h3>
      <div class="country-images">
        {#each results as image}
          <img
            class="country-img"
            src={image.urls.raw + "&w=300&h=200&fit=crop"}
            alt=""
          />
        {/each}
      </div>
    {/if}
  </div>
{/await}

<style>
  .webcam {
    height: 300px;
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
    gap: 5px;
  }
  .important-info {
    background: #e3e3e3;
    padding: 0 5px 5px 5px;
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
    padding: 0 5px 10px 5px;
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
  .country {
    background: #e3e3e3;
    padding: 1rem;
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
</style>
