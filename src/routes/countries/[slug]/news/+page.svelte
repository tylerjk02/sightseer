<script lang="ts">
  export let data;
  const { commonName, officialName } = data;
  // let showImages: boolean = false;

  // const switchImages = () => {
  //   showImages = !showImages;
  // };
</script>

<div class="news">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <p>under construction...</p>
  <!-- {#if showImages == false}
    <button on:click={switchImages}>Show Images</button>
  {:else}
    <button on:click={switchImages}>Hide Images</button>
  {/if}
  <div class="articles">
    {#await data.streamed.news}
      Loading...
    {:then articles}
      {#each articles.articles as article}
        <div class="article">
          {#if showImages !== false}
            {#if article.media}
              <img
                class="article__image"
                src={article.media}
                alt={article.title}
              />
            {/if}
          {/if}
          <h1 class="article__title">{article.title}</h1>
          {#if article.published_date}
            {article.published_date}
          {/if}
          {#if article.author}
            <p><b>Author: </b>{article.author}</p>
          {/if}
          {#if article.is_opinion}
            <p><b>Opinion Piece</b></p>
          {/if}
          <p class="article__summary">{article.summary}</p>

          {#if article.link}
            <div class="source">
              <a href={article.link}>{article.link}</a>
            </div>
          {/if}
        </div>
      {/each}
    {:catch error}
      return error
    {/await} -->
  <!-- </div> -->
</div>

<style lang="scss">
  .articles {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    .article {
      border: 1px solid #222222;
      margin: 5px;
      padding: 5px;

      &__image {
        width: 500px;
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .articles {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 578px) {
    .articles {
      .article {
        &__title {
          font-size: 22px;
        }
        &__image {
          width: 300px;
        }
      }
    }
  }
</style>
