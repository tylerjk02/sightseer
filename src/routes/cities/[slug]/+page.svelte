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

  console.log(cityWikiArticle);

  const cityName = slug[0];
  const countryName = slug[1];
  const countryFullName = countries.getName(countryName, "en");

  const lat = slug[2];
  const lon = slug[3];
</script>

<div class="page">
  <div class="trace-back">
    <a href="/">home</a>/<a href="/countries/{countryFullName.toLowerCase()}"
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
    <div class="city-wiki-blurb">
      <h1>Blurb from WikiPedia</h1>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <p>{@html extract_html}</p>

      <img src="{originalimage.source}" alt="">
    </div>
  </div>
</div>

<style>
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 5px;
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
  }
</style>
