<script lang="ts">
  export let data;
  const { citySlug, countrySlug } = data;
  const hotelData: any[] = JSON.parse(data.hotelData!);
  const hotelList: any = [];
  const fetchHotelData = async () => {
    setTimeout(() => {
      hotelData.forEach((e: any) => {
        if (e.name !== "") {
          hotelList.push(e);
        }
      });
    });
  };

  console.log(hotelList);
</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>
  {#await fetchHotelData}
    <p>...loading</p>
  {:then}
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
  {/await}
</div>

<style>
</style>
