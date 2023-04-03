<script lang="ts">
  export let data;

  const { slug, historyBlips } = data;
  console.log(historyBlips);
</script>

<div class="history">
  <div class="trace-back">
    <a href="/countries/{slug}">Back</a>
  </div>

  <div class="content">
    {#if historyBlips.length !== 0}
      <h1>History Blips of {slug}</h1>
      {#each historyBlips as blip}
        <div class="blip">
          <p class="blip__date">{blip.month}/{blip.day}/{blip.year}</p>
          <p class="blip__event">{blip.event}</p>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .blip {
    border: 1px solid black;
    margin: 5px;
    padding: 5px;

    &__date {
      color: rgba(34, 34, 34, 0.973);
      font-size: 14px;
      font-style: italic;
    }
  }
</style>
