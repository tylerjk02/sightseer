<script lang="ts">
  export let data;
  const { commonName, officialName } = data;
</script>

<main class="main">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <p><em>Click a city for more info</em></p>
  <div class="tabs">
    <div class="tab cities">
      {#await data.streamed.cities}
        ...
      {:then cities}
        {#if cities.length !== 0}
          <h2>Cities (Pop. greater than 80,000)</h2>
        {/if}
        <div class="list cities">
          {#if cities.length !== 0}
            {#each cities as city}
              <a
                href="./cities/{city.name},{city.country},{commonName},{officialName}"
                class="city"
              >
                <h3>{city.name}</h3>
                {#if city.is_capital}
                  <p><b>Capital</b></p>
                {/if}
                <p>{city.latitude}, {city.longitude}</p>
                <p><b>Population</b>: {city.population.toLocaleString()}</p>
              </a>
            {/each}
          {:else}
            Sorry, no cities found...
          {/if}
        </div>
      {/await}
    </div>
    <hr style="margin-top: 5px" />
    <div class="tab towns">
      {#await data.streamed.towns}
        ...
      {:then towns}
        {#if towns.length !== 0}
          <h2>Towns (Pop. greater than 8,000 & less than 80,000)</h2>
        {/if}
        <div class="list towns">
          {#if towns.length !== 0}
            {#each towns as town}
              <a
                href="./cities/{town.name},{town.country},{commonName},{officialName}"
                class="town"
              >
                <h3>{town.name}</h3>
                {#if town.is_capital}
                  <p><b>Capital</b></p>
                {/if}
                <p>{town.latitude}, {town.longitude}</p>
                <p><b>Population</b>: {town.population.toLocaleString()}</p>
              </a>
            {/each}
          {:else}
            Sorry, no towns found...
          {/if}
        </div>
      {/await}
    </div>
    <hr style="margin-top: 5px" />
    <div class="tab villages">
      {#await data.streamed.villages}
        ...
      {:then villages}
        {#if villages.length !== 0}
          <h2>Villages (Pop. less than 8,000)</h2>
        {/if}
        <div class="list villagess">
          {#if villages.length !== 0}
            {#each villages as village}
              <a
                href="./cities/{village.name},{village.country},{commonName},{officialName}"
                class="village"
              >
                <h3>{village.name}</h3>
                {#if village.is_capital}
                  <p><b>Capital</b></p>
                {/if}
                <p>{village.latitude}, {village.longitude}</p>
                <p><b>Population</b>: {village.population.toLocaleString()}</p>
              </a>
            {/each}
          {:else}
            Sorry, no villages found...
          {/if}
        </div>
      {/await}
    </div>
  </div>
</main>

<style lang="scss">
  .trace-back {
    margin: 5px 0;
  }
  .list {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);

    a {
      h3 {
        font-size: 28px;
      }
      transition: all 0.2s ease-in-out;
      color: #222222;
      text-decoration: none;
      padding: 5px;
      border: 1px solid #222222;
    }
    a:hover {
      background: #e3e3e3;
    }
  }

  @media screen and (max-width: 892px) {
    .list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 578px) {
    .list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
