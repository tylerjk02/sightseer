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
    <p>{properties.district}</p>
  {/each}
</div>

<style>
</style>
