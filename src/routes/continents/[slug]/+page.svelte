<script lang="ts">
  export let data;
  const { continents, slug } = data;

  continents.sort((a: any, b: any) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });

  const ranNum = () => {
    return Math.floor(Math.random() * continents.length);
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

  <p>
    click a country to view more or <a
      href="/countries/{continents[ranNum()].name.official}">surprise me</a
    >
  </p>
  <div class="list">
    {#each continents as { name, flags, altSpellings }}
      <div class="country">
        <div class="country-inner">
          <div class="country-flag">
            <img src={flags.svg} alt={flags.alt} />
          </div>
          <div class="country-info">
            <a href="/countries/{name.common}">{name.common}</a>
            <p>{name.official}</p>
          </div>
        </div>
      </div>
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
        color: var(--color-black);
        background: var(--color-light-grey);
        box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
        padding: 5px;
        margin: 5px;

        display: flex;
        align-items: center;
        gap: 5px;

        .country-inner {
          background: var(--color-white);
          width: 100%;
          height: 100%;
          padding: 5px;

          .country-info {
            a {
              font-size: 24px;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          }
        }
        .country-flag img {
          width: 65px;
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
