<script lang="ts">

  export let data;
  const { citySlug, countrySlug } = data;

</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>
<!-- 
  <div class="hotels">
    {#each hotelData as hotelItem}
      <h1>{hotelItem.hotelName}</h1>
    {/each}
  </div> -->
</div>

<style>
</style>
