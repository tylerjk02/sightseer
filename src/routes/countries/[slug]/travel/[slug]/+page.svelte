<script lang="ts">

  export let data;
  const { citySlug, countrySlug, hotelData } = data;
  const { features } = hotelData;

  console.log(features[0].properties)
  
  

</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>
  {#each features as { properties }}
    <h3>{properties.name}</h3>
    <p>{properties.address_line2}</p>
    <p>{properties.lat}, {properties.lon}</p>
    {#if properties.district}
      <p>{properties.district}</p>
    {/if}
    <a href="https://nominatim.openstreetmap.org/ui/details.html?osmtype={properties.datasource.raw.osm_type.toUpperCase()}&osmid={properties.datasource.raw.osm_id}&class=tourism">Source</a>
  {/each}
</div>

<style>
</style>
