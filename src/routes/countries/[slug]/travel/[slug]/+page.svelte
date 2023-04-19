<script lang="ts">
  export let data;

  const { citySlug, nameCommon, nameOfficial, lat, lon } = data;
</script>

<main class="travel">
  <div class="trace-back">
    <a href="/countries/{nameCommon},{nameOfficial}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {nameCommon}</h1>
  <hr style="margin: 5px 0" />

  <!-- Info & Wiki -->
  {#await data.streamed.city}
    Loading...
  {:then city}
    {#if city.length !== 0}
      {#if city[0].is_capital}
        <p><b>Capital</b></p>
      {/if}
      <p>{city[0].latitude}, {city[0].longitude}</p>
      <p><b>Population</b>: {city[0].population.toLocaleString()}</p>
    {/if}
  {/await}
  {#await data.streamed.wiki}
    ...
  {:then wiki}
    {#if wiki.title !== "Not found." && wiki.type !== "disambiguation"}
      <img src={wiki.thumbnail.source} alt={wiki.title} />
      <p>{@html wiki.extract_html}</p>
    {:else}
      <div class="" />
    {/if}
  {/await}
  <!-- End Info & Wiki -->

  <!-- Hotels -->
  {#await data.streamed.places}
    Loading...
  {:then places}
    {#if places.features.length !== 0}
      <h2>Accommodations & Hotels</h2>
      <div class="properties">
        {#each places.features as { properties }}
          <div class="property">
            <h3 class="property__name">{properties.address_line1}</h3>
            <p class="property__category">
              {properties.categories[1]
                .split(".")
                .join(", ")
                .split("_")
                .join(" ")}
            </p>
            <p class="property__address">{properties.address_line2}</p>
            {#if properties.district}
              <p class="property__district">{properties.district}</p>
            {/if}
            <a
              target="_blank"
              href="https://www.google.com/maps/search/{properties.lat},{properties.lon}"
              class="property__coords">{properties.lat}, {properties.lon}</a
            >
            <!-- <br /> -->
            <a
              class="property__source"
              target="_blank"
              href="https://nominatim.openstreetmap.org/ui/details.html?osmtype={properties.datasource.raw.osm_type.toUpperCase()}&osmid={properties
                .datasource.raw.osm_id}&class=tourism">Source</a
            >
          </div>
        {/each}
      </div>
    {:else}
      We couldn't find anything...
    {/if}
  {:catch error}
    {console.error(error)}
  {/await}
  <!-- End Hotels -->
  <hr />
  <!-- Tourism -->
  {#await data.streamed.tourism}
    Loading...
  {:then tourism}
    {#if tourism.features.length !== 0}
      <h2>Tourism & Sightseeing</h2>
      <div class="properties">
        {#each tourism.features as { properties }}
          <div class="property">
            <h3 class="property__name">{properties.address_line1}</h3>
            <p class="property__category">
              {properties.categories[1]
                .split(".")
                .join(", ")
                .split("_")
                .join(" ")}
            </p>
            <p class="property__address">{properties.address_line2}</p>
            {#if properties.district}
              <p class="property__district">{properties.district}</p>
            {/if}
            <a
              target="_blank"
              href="https://www.google.com/maps/search/{properties.lat},{properties.lon}"
              class="property__coords">{properties.lat}, {properties.lon}</a
            >
            <!-- <br /> -->
            <a
              class="property__source"
              target="_blank"
              href="https://nominatim.openstreetmap.org/ui/details.html?osmtype={properties.datasource.raw.osm_type.toUpperCase()}&osmid={properties
                .datasource.raw.osm_id}&class=tourism">Source</a
            >
          </div>
        {/each}
      </div>
    {:else}
      We couldn't find anything...
    {/if}
  {/await}
  <!-- End Tourism -->
  <br />
</main>

<style lang="scss">
  .trace-back {
    margin: 5px 0 0 0;
  }

  .properties {
    gap: 5px;
    display: grid;
    grid-template-columns: repeat(3, 3fr);

    .property {
      padding: 5px;
      // border: 1px solid black;
      background: #e3e3e3;
      padding: 5px;
      font-size: 18px;
      border-radius: 3px;
      color: #222222;

      a {
        font-size: 16px;
        color: #232323;
        text-decoration: underline;
      }
      &__name {
        font-size: 24px;
      }
      &__coords {
        text-decoration: none;
        // color: #222222;
      }
      &__coords:hover {
        text-decoration: underline;
      }

      &__source {
        text-decoration: none;
      }

      a:hover {
        background: #808080;
        text-decoration: none;
      }
    }
  }

  @media screen and (max-width: 1072px) {
    .properties {
      grid-template-columns: repeat(2, 2fr);
    }
  }

  @media screen and (max-width: 786px) {
    .properties {
      grid-template-columns: repeat(1, 1fr);
      gap: 3px;
    }
  }
</style>
