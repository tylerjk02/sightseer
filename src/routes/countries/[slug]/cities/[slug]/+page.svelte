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
    <div class="city-basic">
      {#await data.streamed.city}
        ...
      {:then city} 
        {#if city[0].country == countryCode}
          {#if city[0].is_capital}
            <p><b>Capital</b></p>
          {/if}
          <div class="coords">{city[0].latitude}, {city[0].longitude}</div>
        {/if}
      {/await}
    </div>
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
