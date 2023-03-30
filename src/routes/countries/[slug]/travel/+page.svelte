<script lang="ts">
  import { upperCaseFirst } from "upper-case-first";

  export let data;

  const { slug, cities, travelAdvisory } = data;

  const advisoryStatus = travelAdvisory.api_status;
  const advisoryData: any = Object.values(travelAdvisory.data)[0];
  const { advisory, continent, iso_alpha2, name } = advisoryData;


  console.log(cities);
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
    </div>
  {/if}
  <h1>Travel to {upperCaseFirst(slug)}</h1>
  {#if cities.length !== 0}
    <div class="city-select">
      <h2>Please Select a City</h2>
      <div class="cities">
        {#each cities as { country, is_capital, latitude, longitude, name, population }}
          <div class="city">
            <div class="city-info">
              <h3>{name}</h3>
              <p>{latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
              {#if is_capital}
                <p>Capital</p>
              {/if}
            </div>
            <a href="./travel/{name},{country}">Travel to {name}</a>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .high {
    color: red;
  }

  .cities {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: 5px;
  }

  .city {
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    padding: 5px;
    /* margin: 5px; */
    height: 100%;
  }

  .city a {
    text-decoration: none;
    align-self: flex-end;
  }

  .city a:hover {
    text-decoration: underline;
  }


  @media screen and (max-width: 728px) {
    .cities {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
