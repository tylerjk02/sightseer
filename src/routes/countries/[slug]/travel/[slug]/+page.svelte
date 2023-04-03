<script lang="ts">
  export let data;
  const { citySlug, countrySlug, cityPlaces } = data;
  const { features } = cityPlaces;

</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>

  {#if features.length !== 0}
    <div class="properties">
      {#each features as { properties }}
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
          <a target="_blank" href="https://www.google.com/maps/search/{properties.lat},{properties.lon}" class="property__coords">{properties.lat}, {properties.lon}</a>
          <br/>
          {#if properties.district}
            <p class="property__district">{properties.district}</p>
          {/if}
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
    <p>Sorry, we couldn't find anything...</p>
  {/if}
</div>

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
      border: 1px solid black;

      &__name {
        font-size: 22px;
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

      &__source:hover {
        text-decoration: underline;
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
