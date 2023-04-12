<script lang="ts">
  export let data;
  const { slug } = data;
  let countries = data.countries;
  const sortByName = () => {
    countries.sort((a: any, b: any) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });
    countries = countries;
  };
  const sortByPop = (first: number, second: number) => {
    countries.sort((a: any, b: any) => {
      if (a.population < b.population) {
        return first;
      }
      if (a.population > b.population) {
        return second;
      }
      return 0;
    });
    countries = countries;
  };
  const sortByArea = (first: number, second: number) => {
    countries.sort((a: any, b: any) => {
      if (a.area < b.area) {
        return first;
      }
      if (a.area > b.area) {
        return second;
      }
      return 0;
    });
    countries = countries;
  };

  sortByPop(1, -1);
</script>

<div class="continent">
  <div class="trace-back">
    <a href="/">continents</a>/
    <p>{slug.toLowerCase()}</p>
  </div>
  {#if slug !== "antarctic"}
    <div class="sort-tabs">
      <button on:click={sortByName}>Alphabetical</button>
      <button on:click={() => sortByPop(-1, 1)}>Least Populated</button>
      <button on:click={() => sortByPop(1, -1)}>Most Populated</button>
      <button on:click={() => sortByArea(-1, 1)}>Smallest</button>
      <button on:click={() => sortByArea(1, -1)}>Largest</button>
    </div>
  {/if}
  {#if slug == "antarctic"}
    <h1>Here be penguins...</h1>
  {:else}
    {#if slug == "americas"}
      <h1>
        Countries in the {slug.charAt(0).toLocaleUpperCase() + slug.slice(1)}
      </h1>
    {:else}
      <h1>Countries in {slug.charAt(0).toLocaleUpperCase() + slug.slice(1)}</h1>
    {/if}

    <div class="list">
      {#each countries as { name, flags, altSpellings, population, area }}
        <a href="/countries/{name.common},{name.official}" class="country">
          <div class="country-inner">
            <div class="base-info">
              <div class="country-flag">
                <img src={flags.svg} alt={flags.alt} />
              </div>

              <h1>{name.common}</h1>
            </div>
            <div class="country-info">
              <p><b>{name.official}</b></p>
              <p><b>Population</b>: {population.toLocaleString()}</p>
              <p><b>Area</b>: {area.toLocaleString()}km<sup>2</sup></p>
            </div>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .trace-back {
    display: flex;
    gap: 1px;
    margin-top: 5px;
  }
  .sort-tabs {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 5px;
    padding: 5px;

    button {
      // border: none;
      width: 100%;
      background: var(--color-black);
      color: var(--color-white);
    }
    button:hover {
      cursor: pointer;
    }
  }
  .continent {
    margin: 5px;
    .list {
      .country {
        transition: all 0.2s ease-in-out;
        text-decoration: none;
        color: var(--color-black);
        border: 1px solid #222222;
        background: #f6ffff;
        padding: 5px;
        margin: 5px;

        display: flex;
        align-items: center;
        gap: 5px;

        .country-inner {
          width: 100%;
          height: 100%;
          padding: 5px;
          .base-info {
            display: flex;
            justify-self: center;
            align-items: center;
            gap: 10px;
            .country-info {
              h1 {
                font-size: 28px;
              }
            }
          }
        }

        .country-flag img {
          width: 85px;
          max-height: 60px;
          box-shadow: 0 0 1px black;
        }
      }
      .country:hover {
        background: #e3e3e3;
      }
    }
  }

  @media screen and (min-width: 972px) {
    .list {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
    }
  }
  @media screen and (max-width: 682px) {
    .sort-tabs {
      flex-direction: column;
      button {
        padding: 5px 0;
      }
    }
  }
</style>
