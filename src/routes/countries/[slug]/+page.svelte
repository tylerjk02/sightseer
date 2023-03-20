<script lang="ts">
  import lookup from "country-code-lookup";

  export let data;

  const { country, photos } = data;
  const countryItem = country[0];
  const { results } = photos;
  const {
    name,
    region,
    coatOfArms,
    flags,
    area,
    capital,
    languages,
    population,
    independent,
    landlocked,
    borders,
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
      <div class="country-top">
        <h1>{name.common}</h1>
        <p>{name.official}</p>
        <p>Capital: <b>{capital}</b></p>
      </div>
      <div class="country-mid">
        <h2>Geography:</h2>
        <p>{area.toLocaleString()}km<sup>2</sup></p>
        {#if borders}
          <p>Borders: {borderString.join(", ")}</p>
        {/if}
        <h2>Demographics:</h2>
        <p>Population: {population.toLocaleString()}</p>
      </div>
    </div>
  </div>
  <div class="country-images">
    {#each results as image}
      <img src={image.urls.raw + '&w=300&h=400&fit=crop'} alt="" />
    {/each}
  </div>
</div>

<style>
  .country-images {
    margin: 10px auto;
    width: min-content;
    display: grid;
    grid-template-columns: repeat(4, auto);
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

  .country-political-images {
    display: flex;
    gap: 10px;
    align-items: center;
  }
</style>
