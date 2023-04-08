<script lang="ts">
  export let data;
  const { countries, slug } = data;

  countries.sort((a: any, b: any) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });

  const ranNum = () => {
    return Math.floor(Math.random() * countries.length);
  };
</script>

<div class="continent">
  <div class="trace-back">
    <a href="/">continents</a>/
    <p>{slug.toLowerCase()}</p>
  </div>
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
      {#each countries as { name, flags, altSpellings }}
        <a href="/countries/{name.common},{name.official}" class="country">
          <div class="country-inner">
            <div class="base-info">
              <div class="country-flag">
                <img src={flags.svg} alt={flags.alt} />
              </div>

              <h1>{name.common}</h1>
            </div>
            <div class="country-info">
              <p>{name.official}</p>
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
  .continent {
    margin: 5px;
    .list {
      .country {
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
    }
  }

  @media screen and (min-width: 972px) {
    .list {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
    }
  }
</style>
