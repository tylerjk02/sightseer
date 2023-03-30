<script lang="ts">


  export let data;
  const { citySlug, countrySlug } = data;



</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>
  
  
  <br>
  <h2>This feature is currently being worked on, please come back later!</h2>
</div>

<style>

</style>