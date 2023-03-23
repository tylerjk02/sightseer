<script lang="ts">
  export let data;
  const { continents, slug } = data;
  continents.sort((a:any, b:any) => {
  if (a.name.common < b.name.common) {
    return -1;
  }
  if (a.name.common > b.name.common) {
    return 1;
  }
  return 0;
});


</script>

<div class="continent">
  <div class="trace-back">
    <a href="/">home</a>/<p>{slug}</p>
  </div>
  {#if slug == 'americas'}
    <h1>Countries in the {slug.charAt(0).toLocaleUpperCase() + slug.slice(1)}</h1>
  {:else}
    <h1>Countries in {slug.charAt(0).toLocaleUpperCase() + slug.slice(1)}</h1>
  {/if}
  <div class="list">
    {#each continents as { name, flag, flags, altSpellings }}
      <div class="country">
        <div class="country-flag">
          <img src={flags.svg} alt={flags.alt} />
        </div>
        <div class="country-info">
          <a href="/countries/{name.official}">{name.common}</a>
          <p>{name.official}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .continent {
    margin: 5px;
  }
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 0 0 0;
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
