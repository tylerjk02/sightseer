
<script lang="ts">
  export let data;
  const { continents, slug } = data;
  // const { name } = continents;
</script>

<div class="continent">
  <a href="/">home</a>
  <h1>{slug.charAt(0).toLocaleUpperCase() + slug.slice(1)}</h1>
  <h2>Now choose a country:</h2>
  <div class="list">
    {#each continents as { name, flags, altSpellings }}
      <div class="country">
        <a href='/countries/{altSpellings[0]}'>{name.common}</a>
        <p>{name.official}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .country {
    background: #e3e3e3;
    padding: 1rem;
    margin: 5px;
  }
</style>