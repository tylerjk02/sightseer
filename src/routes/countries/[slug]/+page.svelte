
<script lang="ts">
  export let data;
  const { country } = data;
  const item = country[0];

  const { name, region } = item;
  console.log(item);
</script>

<div class="main">
  <div class="region">
    <a href="/">home</a>/<a href="/continents/{region}">{region}</a>
  </div>
  <div class="country">

    <h1>{name.common}</h1>
  </div>
  
</div>

<style>
  .country {
    background: #e3e3e3;
    padding: 1rem;
    margin: 5px;
  }
</style>