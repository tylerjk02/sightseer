<script lang="ts">
  export let data;
  const { commonName, officialName } = data;
</script>

<main class="photos">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <h1>Photos of {commonName}</h1>

  <!-- Images -->
  {#await data.streamed.images}
    Loading Images...
  {:then images} 
    <div class="images">
      {#each images.value as image}
        <div class="image">
          <img src="{image.contentUrl}" alt="{image.name}">
        </div>
      {/each}
    </div>
  {/await}


  <!-- End Images -->

  </main>

<style lang="scss">
  .images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .image {
      // width: 25%;
      img {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 1072px) {
    .images {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>