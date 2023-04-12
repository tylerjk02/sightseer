<script lang="ts">
  export let data;
  const { commonName, officialName } = data;
</script>

<main class="main">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <div class="nature">
    <h1>Biota of {commonName}</h1>
    <div class="wildlife">
      {#await data.streamed.wildlife}
        Looking for animals...
      {:then wildlife}
        <p>{wildlife.query.pages[0].extract}</p>
      {/await}
    </div>
  </div>
</main>

<style lang="scss">
  .trace-back {
    margin: 5px 0;
  }
</style>
