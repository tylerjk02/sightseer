<script lang="ts">
  export let data;
  import countries from "i18n-iso-countries";
  import * as en from "i18n-iso-countries/langs/en.json";
  countries.registerLocale(en);

  const { slug } = data;

  const cityName = slug[0];
  const countryName = slug[1];
  const countryFullName = countries.getName(countryName, "en");

  const lat = slug[2];
  const lon = slug[3];

</script>

<div class="city">
  <div class="trace-back">
    <a href="/">home</a>/<a href="/countries/{countryFullName.toLowerCase()}"
      >{countryFullName.toLowerCase()}</a
    >/
    <p>{cityName.toLowerCase()}</p>
  </div>

  <h1>{cityName}, {countryName}</h1>
  <p>{lat}, {lon}</p>
  <hr />
  
</div>

<style>
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 0;
  }

</style>
