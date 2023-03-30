<script lang="ts">
  export let data;
  const { citySlug, countrySlug } = data;
  const hotelData: any[] = JSON.parse(data.hotelData!);
  const hotelList: any = [];

  hotelData.forEach((e: any) => {
    if (e.name !== "") {
      hotelList.push(e);
    }
  });

  console.log(hotelList);
</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>

  {#if hotelList.length !== 0}
    <div class="hotels">
      {#each hotelList as { name, area, addons }}
        <h3>{name}</h3>
        <p>{area}</p>
        {#each addons as addon}
          <p>{addon}</p>
        {/each}
      {/each}
    </div>
  {/if}
</div>

<style>
</style>
