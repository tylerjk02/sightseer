
<script lang="ts">
  export let data;
  const { country } = data;
  const item = country[0];

  const { name, region } = item;
  console.log(item);
</script>

<div class="main">
  <div class="region">
    <div class="trace-back">
      <a href="/">home</a>/<a href="/continents/{region.toLowerCase()}">{region.toLowerCase()}</a>/<p>{name.common.toLowerCase()}</p>
    </div>
  </div>
  <div class="country">

    <h1>{name.common}</h1>
  </div>
  
</div>

<style>
  .trace-back {
    display:flex;
    gap: 1px;
  }
  .country {
    background: #e3e3e3;
    padding: 1rem;
    margin: 5px;
  }
</style>