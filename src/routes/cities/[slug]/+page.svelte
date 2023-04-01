<script lang="ts">
  export let data;
  import countries from "i18n-iso-countries";
  import * as en from "i18n-iso-countries/langs/en.json";
  countries.registerLocale(en);

  const { slug, cityWikiArticle } = data;
  const {
    content_urls,
    description,
    displaytitle,
    extract,
    extract_html,
    originalimage,
    title,
  } = cityWikiArticle;

  // console.log(costOfLiving);

  // const {
  //   city_name,
  //   country_name,
  //   exchange_rates,
  //   exchange_rates_updated,
  //   prices,
  //   error,
  // } = costOfLiving;

  const cityName = slug[0];
  const countryName = slug[1];
  const countryFullName = countries.getName(countryName, "en");

  const lat = slug[2];
  const lon = slug[3];

  const region = slug[4];

  console.log(region);
</script>

<div class="page">
  <div class="trace-back">
    <a href="/">continents</a>/<a href="/continents/{region}">{region.toLowerCase()}</a>/<a href="/countries/{countryFullName.toLowerCase()}"
      >{countryFullName.toLowerCase()}</a
    >/
    <p>{cityName.toLowerCase()}</p>
  </div>
  <div class="city">
    <div class="city-basic">
      <h1>{cityName}, {countryName}</h1>
      <p>{lat}, {lon}</p>
    </div>
    <hr />
    {#if cityWikiArticle}
      <div class="city-wiki-blurb">
        <h1>Blurb from WikiPedia</h1>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <p>{@html extract_html}</p>

        <img src={originalimage.source} alt="" />
      </div>

    {:else}
      <p>No Article Found</p>
    {/if}
    <!-- {#if error == null}
      <div class="cost-of-living">
        <h1>Cost of Living in {city_name}</h1>
        <div class="col-item-wrap">
          {#each prices as { avg, category_name, currency_code, item_name, max, min, usd }}
            <div class="col-item">
              <h3>{item_name}</h3>
              <p>{category_name}</p>
              <hr>
              <div class="cost-wrap">
                {#if currency_code !== "USD"}
                  <div class="local-currency">
                    <h4>Local ({currency_code}):</h4>
                    <p>Min: {min.toLocaleString()}</p>
                    <p>Avg: {avg.toLocaleString()}</p>
                    <p>Max: {max.toLocaleString()}</p>
                  </div>
                {/if}
                <div class="usd-cost">
                  <h4>Cost in USD:</h4>
                  <p>Min: ${usd.min.toLocaleString()}</p>
                  <p>Avg: ${usd.avg.toLocaleString()}</p>
                  <p>Max: ${usd.max.toLocaleString()}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if} -->
  </div>
</div>

<style>
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 5px;
  }

  .cost-of-living h1 {
    text-align: center;
  }
  .col-item-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .col-item {
    border: 1px solid black;
    margin: 5px;
    padding: 5px;
  }
  .cost-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  hr {
    width: 100% !important;
  }
  .city {
    margin: 0 auto;
    width: 75%;
  }
  .city-wiki-blurb {
    width: 90%;
    margin: 5px auto;
  }
  .city-wiki-blurb img {
    margin: 10px 0;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    .city {
      width: 90%;
    }

    .col-item-wrap {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
