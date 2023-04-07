<script lang="ts">
  import { each } from 'svelte/internal';

  export let data;
  const { slug, countryCuisine, countryCulture, countryRecipe } = data;


  const splitSlug = slug.split(",");
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];
</script>

<div class="culture">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <div class="header">
    <h1>Culture of {commonName}</h1>
    {#if countryCulture.title !== "Not found." && countryCulture.type !== "disambiguation"}
      <div class="container culture">
        <h3>{countryCulture.title}</h3>
        <p>{@html countryCulture.extract_html}</p>
      </div>
    {/if}
    {#if countryCuisine.title !== "Not found." && countryCuisine.type !== "disambiguation"}
      <div class="container cuisine">
        {#if countryCuisine.description == undefined}
          <h3>{countryCuisine.title}</h3>
        {:else}
          <h3>{countryCuisine.description}</h3>
        {/if}
        <p>{@html countryCuisine.extract_html}</p>
      </div>
    {/if}
    {#if countryRecipe.length !== 0}
      <hr>
      <h2>Recipes</h2>
      <p>*May or may not be traditional*</p>
      
      {#each countryRecipe as { title, instructions, ingredients, servings }}
        <div class="recipe">
          <h4>{title}</h4>
          <div class="ingredients">{@html ingredients.split('|').join('<br/>')}</div><br>
          <div class="instructions">{instructions}</div><br>
          <div class="servings">{servings}</div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .trace-back {
    margin: 5px 0;
  }
  .recipe {
    border: 1px solid #222222;
    padding: 5px;
    margin: 5px 0;
  }
</style>
