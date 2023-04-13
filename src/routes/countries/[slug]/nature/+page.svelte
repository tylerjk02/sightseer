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
        {#if wildlife.query.pages[0].extract.includes("may refer to") !== true}
          <p>{wildlife.query.pages[0].extract}</p>
        {/if}
      {/await}
    </div>
    <div class="photos">
      {#await data.streamed.images}
        ...
      {:then images}
        <div class="img-wrap">
          {#each images.value as image}
            <div class="img">
              <div class="caption">{image.name}</div>
              <img src={image.contentUrl} alt={image.name} />
            </div>
          {/each}
        </div>
      {/await}
    </div>
  </div>
</main>

<style lang="scss">
  .trace-back {
    margin: 5px 0;
  }
  .img-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .img {
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 1028px) {
    .img-wrap {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
