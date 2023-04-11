<script lang="ts">
  export let data;
  const { cityName, countryCode, commonName, officialName } = data;
</script>

<main class="main">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}/cities">Back</a>
  </div>
  <div class="city">
    <h1>{cityName}, {countryCode}</h1>
    <div class="city-wiki">
      {#await data.streamed.article}
        ...
      {:then article}
        {#if article.title !== "Not found." && article.type !== "disambiguation"}
          <img src="{article.thumbnail.source}" alt="{article.title}">
          <p>{@html article.extract_html}</p>

        {:else}
          Sorry, we couldn't find anything...
        {/if}
      {/await}
    </div>
  </div>
</main>
