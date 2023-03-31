<script lang="ts">
  export let data;
  const { citySlug, countrySlug, hotelData } = data;
</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>

  {#await data}
    <p>loading...</p>
  {:then}
    {#if hotelData}
      <div class="hotels">
        {#each hotelData as { name, area, addons }}
          {#if name !== ""}
            <h3>{name}</h3>
            <p>{area}</p>
            {#each addons as addon}
              <p>{addon}</p>
            {/each}
          {/if}
        {/each}
      </div>
    {/if}
  {/await}
</div>

<style>
</style>
