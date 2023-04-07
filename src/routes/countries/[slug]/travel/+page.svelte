<script lang="ts">
  import { upperCaseFirst } from "upper-case-first";

  export let data;

  const { slug, cities, travelAdvisory } = data;

  const advisoryStatus = travelAdvisory.api_status;
  const advisoryData: any = Object.values(travelAdvisory.data)[0];
  const { advisory, continent, iso_alpha2, name } = advisoryData;
  let searchValue: string;

</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{slug}">Back</a>
  </div>
  {#if advisoryStatus.reply.status == "ok"}
    <div class="advisory">
      {#if advisory.score > 3}
        <p class="risk-level high">
          {name} has a travel risk level of {advisory.score} (out of 5)
        </p>
      {:else}
        <p class="risk-level low">
          {name} has a travel risk level of {advisory.score} (out of 5)
        </p>
      {/if}
      <a class="risk-source" target="_blank" href="{advisory.source}">Source</a>
    </div>
  {/if}
  <h1>Travel to {upperCaseFirst(slug)}</h1>
  <!-- functionality for search works, way to many edge cases to make viable though. -->
  <!-- <div class="city-search">
    <label for="city-search">
      Search city by exact name here (eg. New York, Al Hufuf, London)
      <input type="text" name="city-search" id="city-search" bind:value={searchValue} required>
      <a href="./travel/{searchValue},{slug}">Go</a>
    </label> 
  </div> -->
  {#if cities}
    <div class="city-select">
      <h2>Please Select a City</h2>
      <div class="cities">
        {#each cities as { country, is_capital, latitude, longitude, name, population }}
          <a class="city" href="./travel/{name},{country}">
            <div class="city-info">
              <h3>{name}</h3>
              <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              {#if is_capital}
                <p>Capital</p>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}

</div>

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
    transition: all .1s ease-in-out;
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
