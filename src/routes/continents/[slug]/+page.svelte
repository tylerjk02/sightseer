<script lang="ts">
  export let data;
  const { continents, slug } = data;
  // const { name } = continents;
</script>

<div class="continent">
  <div class="trace-back">
    <a href="/">home</a>/<p>{slug}</p>
  </div>
  <h1>{slug.charAt(0).toLocaleUpperCase() + slug.slice(1)}</h1>
  <h2>Now choose a country:</h2>
  <div class="list">
    {#each continents as { name, flags, altSpellings }}
      <div class="country">
        <div class="country-flag">
          <img src={flags.svg} alt={flags.alt} />
        </div>
        <div class="country-info">
          <a href="/countries/{name.common}">{name.common}</a>
          <p>{name.official}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .trace-back {
    display: flex;
    gap: 1px;
  }
  .country {
    background: #e3e3e3;
    padding: 1rem;
    margin: 5px;

    display: flex;
    align-items: center;
    gap: 5px;
  }
  .country-flag img {
    width: 65px;
  }
</style>
