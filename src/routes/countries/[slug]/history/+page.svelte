

<script lang="ts">
  export let data;
  const { slug, wikiData } = data;

  const wikiDataParsed = Object.values(wikiData.parse.text);

  console.log(wikiData);

</script>

<div class="history">
  <div class="trace-back">
    <a href="/countries/{slug}">Back</a>
  </div>
  <h1>History of {slug}</h1>
  <p><em>sourced from wikipedia</em></p>
  <div class="wiki-parsed">{@html wikiDataParsed}</div>
</div>