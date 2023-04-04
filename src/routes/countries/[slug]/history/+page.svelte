<script lang="ts">
  export let data;

  const {
    commonName,
    officialName,
    historyBlipsOfficialName,
    historyBlipsCommonName,
  } = data;
  const historyBlips: any = [];

  historyBlipsCommonName.forEach((e: object) => {
    historyBlips.push(e);
  });
  if(commonName !== officialName) {
    historyBlipsOfficialName.forEach((e: object) => {
      historyBlips.push(e);
    });
  }


  historyBlips.sort((a: any, b: any) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    return 0;
  });


  console.log(historyBlips);
</script>

<div class="history">
  <div class="trace-back">
    <a href="/countries/{commonName}">Back</a>
  </div>

  <div class="content">
    {#if historyBlips.length !== 0}
      <h1>History Blips of {officialName}</h1>
      {#each historyBlips as blip}
        <div class="blip">
          <p class="blip__date">{blip.month}/{blip.day}/{blip.year}</p>
          <p class="blip__event">{blip.event}</p>
        </div>
      {/each}
    {:else}
      <p>Unable to find data</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .trace-back {
    margin: 5px 0;
  }
  .blip {
    background-color: rgba(30, 30, 30, 0.948);
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(30, 30, 30, 0.511);
    margin: 5px;
    padding: 5px;
    color: #fefefe;

    &__date {
      margin: 0 0 2px 0;
      color: #cecece;
      font-size: 14px;
      font-style: italic;
    }
  }
</style>
