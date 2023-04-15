<script lang="ts">
  import { upperCaseFirst } from "upper-case-first";

  export let data;

  const { slug, travelAdvisory } = data;

  const nameCommon = slug[0];
  const nameOfficial = slug[1];

  const advisoryStatus = travelAdvisory.api_status;
  const advisoryData: any = Object.values(travelAdvisory.data)[0];
  const { advisory, continent, iso_alpha2, name } = advisoryData;
  let searchValue: string;
</script>

<main class="travel">
  <div class="trace-back">
    <a href="/countries/{nameCommon},{nameOfficial}">Back</a>
  </div>
  <h1>Travel to {upperCaseFirst(nameCommon)}</h1>
  {#if advisoryStatus.reply.status == "ok"}
    <div class="advisory">
      {#if advisory.score > 3.5}
        <p class="risk-level high">
          {name} has a travel risk level of {advisory.score} (out of 5)
        </p>
      {:else}
        <p class="risk-level low">
          {name} has a travel risk level of {advisory.score} (out of 5)
        </p>
      {/if}
      <a class="risk-source" target="_blank" href={advisory.source}>Source</a>
    </div>
  {/if}
  <br />
  <!-- functionality for search works, way to many edge cases to make viable though. -->
  <!-- <div class="city-search">
    <label for="city-search">
      Search city by exact name here (eg. New York, Al Hufuf, London)
      <input type="text" name="city-search" id="city-search" bind:value={searchValue} required>
      <a href="./travel/{searchValue},{slug}">Go</a>
    </label> 
  </div> -->
  <h2>Please Select a City</h2>
  <!-- Large Cities, 250,000+ -->
  {#await data.streamed.largeCities}
    Loading...
  {:then largeCities}
    {#if largeCities.length !== 0}
      <div class="city-select">
        <div class="city-size-label">
          <h3>Large Cities (250,000+)</h3>
        </div>
        <div class="cities">
          {#each largeCities as { country, is_capital, latitude, longitude, name, population }}
            <a
              class="city"
              href="./travel/{name},{nameCommon},{nameOfficial},{latitude},{longitude}"
            >
              <div class="city-info">
                <h3>{name}</h3>
                {#if is_capital}
                  <p>Capital</p>
                {/if}
                <p><b>Population: </b> {population.toLocaleString()}</p>
                <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class=""></div>
    {/if}
  {/await}
  <!-- Small Cities, 100,000 - 250,000 -->
  {#await data.streamed.smallCities}
    Loading...
  {:then smallCities}
    {#if smallCities.length !== 0}
      <div class="city-select">
        <div class="city-size-label">
          <h3>Small Cities (100,000 - 250,000)</h3>
        </div>
        <div class="cities">
          {#each smallCities as { country, is_capital, latitude, longitude, name, population }}
            <a
              class="city"
              href="./travel/{name},{nameCommon},{nameOfficial},{latitude},{longitude}"
            >
              <div class="city-info">
                <h3>{name}</h3>
                {#if is_capital}
                  <p>Capital</p>
                {/if}
                <p><b>Population: </b> {population.toLocaleString()}</p>
                <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class=""></div>
    {/if}
  {/await}
  <!-- Large Towns, 50,000 - 100,000 -->
  {#await data.streamed.largeTowns}
    Loading...
  {:then largeTowns}
    {#if largeTowns.length !== 0}
      <div class="city-select">
        <div class="city-size-label">
          <h3>Large Towns (50,000 - 100,000)</h3>
        </div>
        <div class="cities">
          {#each largeTowns as { country, is_capital, latitude, longitude, name, population }}
            <a
              class="city"
              href="./travel/{name},{nameCommon},{nameOfficial},{latitude},{longitude}"
            >
              <div class="city-info">
                <h3>{name}</h3>
                {#if is_capital}
                  <p>Capital</p>
                {/if}
                <p><b>Population: </b> {population.toLocaleString()}</p>
                <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class=""></div>
    {/if}
  {/await}
  <!-- Small Towns, 20,000 - 50,000 -->
  {#await data.streamed.smallTowns}
    Loading...
  {:then smallTowns}
    {#if smallTowns.length !== 0}
      <div class="city-select">
        <div class="city-size-label">
          <h3>Small Towns (20,000 - 50,000)</h3>
        </div>
        <div class="cities">
          {#each smallTowns as { country, is_capital, latitude, longitude, name, population }}
            <a
              class="city"
              href="./travel/{name},{nameCommon},{nameOfficial},{latitude},{longitude}"
            >
              <div class="city-info">
                <h3>{name}</h3>
                {#if is_capital}
                  <p>Capital</p>
                {/if}
                <p><b>Population: </b> {population.toLocaleString()}</p>
                <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class=""></div>
    {/if}
  {/await}
  <!-- Villages, Hamlets and other, 0 - 20,000 -->
  {#await data.streamed.other}
    Loading...
  {:then other}
    {#if other.length !== 0}
      <div class="city-select">
        <div class="city-size-label">
          <h3>Villages, Hamlets and other (0 - 20,000)</h3>
        </div>
        <div class="cities">
          {#each other as { country, is_capital, latitude, longitude, name, population }}
            <a
              class="city"
              href="./travel/{name},{nameCommon},{nameOfficial},{latitude},{longitude}"
            >
              <div class="city-info">
                <h3>{name}</h3>
                {#if is_capital}
                  <p>Capital</p>
                {/if}
                <p><b>Population: </b> {population.toLocaleString()}</p>
                <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else}
      <div class=""></div>
    {/if}
  {/await}
</main>

<style>
  .high {
    color: red;
  }

  .trace-back {
    margin: 5px 0;
  }

  .cities {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: 5px;
  }

  .city {
    display: flex;
    justify-content: space-between;
    /* border: 1px solid black; */
    background-color: #e3e3e3;
    padding: 5px;
    /* margin: 5px; */
    height: 100%;
    text-decoration: none;
    color: #222222;
    border-radius: 3px;
  }
  .city:hover {
    transition: all 0.1s ease-in-out;
    background: #c4c4c4;
  }

  .city:active {
    transition: all 0;
    background: #5e5e5e;
  }

  .advisory {
    border-radius: 3px;
    background: #e3e3e3;
    color: #222222;
    width: max-content;
    padding: 5px;
    font-size: 18px;
    border: 1px solid black;
  }
  .risk-source {
    font-size: 16px;
    color: #232323;
  }

  @media screen and (max-width: 728px) {
    .cities {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
