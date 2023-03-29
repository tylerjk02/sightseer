<script>
  export let data;
  console.log(data);

  const { slug } = data;
  const officialName = slug[0];
  const commonName = slug[1];
  const regionName = slug[2];


</script>

<div class="container">
  <div class="trace-back">
    <a href="/">home</a>/<a href="/countries/{officialName}"
      >{commonName.toLowerCase()}</a
    >/
    <p>travel</p>
  </div>

  <div class="travel">
    <h1>Travel to {commonName}</h1>
  </div>
</div>

<style>
  .trace-back {
    display: flex;
    gap: 1px;
    margin: 5px 0;
  }
</style>