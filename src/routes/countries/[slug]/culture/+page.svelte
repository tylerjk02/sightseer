<script lang="ts">
  export let data;
  const { slug, countryCuisine, countryCulture } = data;
  const splitSlug = slug.split(",");
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];
</script>

<div class="culture">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <div class="header">
    <h1>Culture of {commonName}</h1>
    {#if countryCulture.title !== "Not found." && countryCulture.type !== "disambiguation"}
      <div class="container culture">
        <h3>{countryCulture.title}</h3>
        <p>{@html countryCulture.extract_html}</p>
      </div>
    {/if}
    {#if countryCuisine.title !== "Not found." && countryCuisine.type !== "disambiguation"}
      <div class="container cuisine">
        {#if countryCuisine.description == undefined}
          <h3>{countryCuisine.title}</h3>
        {:else}
          <h3>{countryCuisine.description}</h3>
        {/if}
        <p>{@html countryCuisine.extract_html}</p>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .trace-back {
    margin: 5px 0;
  }
</style>
