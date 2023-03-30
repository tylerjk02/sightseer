<script lang="ts">
  import axios from "axios";
  import cheerio from "cheerio";

  export let data;
  const { citySlug, countrySlug } = data;
  let hotelObjList: any[] = [];

  const getHotelData = async (city: string, country: string) => {
    try {
      const url = `https://www.hotels.com/Hotel-Search?destination=${city}%2C%20${country}`;
      const { data } = await axios({
        method: "GET",
        url: url,
      });

      const $ = cheerio.load(data);
      const hotelCard = ".uitk-spacing-margin-blockstart-three";

      $(hotelCard).each((parentIdx: any, parentElem: any) => {
        const hotelObject: any = {};
        if (parentIdx < 30) {
          $(parentElem)
            .children()
            .each((childIdx: any, childElem: any) => {
              const hotelName = $(childElem).find(".uitk-heading-5").text();
              const hotelArea = $(childElem)
                .find(".uitk-text-spacing-half")
                .text();
              const addonList: any = [];
              const hotelAddons = $(childElem)
                .find(".uitk-layout-flex > .truncate")
                .each((idx: any, elem: any) => {
                  const addonContent = $(elem).text();
                  addonList.push(addonContent);
                });
              hotelObject.name = hotelName;
              hotelObject.area = hotelArea;
              hotelObject.addons = addonList;
            });

          hotelObjList.push(hotelObject);
          hotelObjList = hotelObjList;
        }
      });
      return hotelObjList;
    } catch (err) {
      console.error(err);
    }
  };

  getHotelData(citySlug, countrySlug);
</script>

<div class="travel">
  <div class="trace-back">
    <a href="/countries/{countrySlug}/travel">Back</a>
  </div>
  <h1>Travel in {citySlug}, {countrySlug}</h1>

  {#if hotelObjList.length !== 0}
    <div class="hotels">
      {#each hotelObjList as { name, area, addons }}
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
