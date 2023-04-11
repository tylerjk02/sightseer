<script lang="ts">
  import { nameCase } from "@foundernest/namecase";

  export let data;
  const { slug } = data;

  const splitSlug = slug.split(",");
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];
  let showCelebs: boolean = true;
  let showRecipes: boolean = true;

  const showCelebsToggle = () => {
    showCelebs = !showCelebs;
  };
  const showRecipesToggle = () => {
    showRecipes = !showRecipes;
  };
</script>

<div class="culture">
  <div class="trace-back">
    <a href="/countries/{commonName},{officialName}">Back</a>
  </div>
  <div class="header">
    <h1>Culture of {commonName}</h1>

    <!-- Culture -->
    {#await data.streamed.culture}
      Loading...
    {:then countryCulture}
      {#if countryCulture.title !== "Not found." && countryCulture.type !== "disambiguation"}
        <div class="container culture">
          <h3>{countryCulture.title}</h3>
          <p>{@html countryCulture.extract_html}</p>
        </div>
      {/if}
    {/await}

    <!-- End Culture -->

    <!-- Celebrities -->
    {#await data.streamed.celebrities}
      ...
    {:then countryCelebrities}
      {#if countryCelebrities.length !== 0}
        <h3>Celebrities of {commonName}</h3>
        {#if showCelebs == true}
          <button on:click={showCelebsToggle}>Hide</button>
        {:else}
          <button on:click={showCelebsToggle}>Show</button>
        {/if}
        {#if showCelebs == true}
          <div class="celebrities">
            {#each countryCelebrities as celebrity}
              <div class="celebrity">
                <h4>
                  {nameCase(celebrity.name)}{#if celebrity.age}, {celebrity.age}{/if}
                </h4>
                <p>Net Worth: ${celebrity.net_worth.toLocaleString()}</p>
                {#if celebrity.is_alive}
                  <p>Alive</p>
                {:else}
                  <p>Deceased</p>
                {/if}
                {#if celebrity.hasOwnProperty("occupation")}
                  <div class="jobs">
                    {#each celebrity.occupation as occupation}
                      <div class="job">
                        {occupation}
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    {/await}
    <!-- End Celebrities -->

    <!-- Cuisine -->
    {#await data.streamed.cuisine}
      ...
    {:then countryCuisine}
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
    {/await}
    <!-- End Cuisine -->

    <!-- Recipes -->
    {#await data.streamed.recipes}
      ...
    {:then countryRecipes}
      {#if countryRecipes.length !== 0}
        {#if showRecipes == true}
          <button on:click={showRecipesToggle}>Hide</button>
        {:else}
          <button on:click={showRecipesToggle}>Show</button>
        {/if}
      {/if}
      {#if countryRecipes.length !== 0 && showRecipes == true}
        <h3>Recipes</h3>
        <p>*May or may not be traditional*</p>

        {#each countryRecipes as { title, instructions, ingredients, servings }}
          <div class="recipe">
            <h4>{title}</h4>
            <div class="ingredients">
              {@html ingredients.split("|").join("<br/>")}
            </div>
            <br />
            <div class="instructions">{instructions}</div>
            <br />
            <div class="servings">{servings}</div>
          </div>
        {/each}
      {/if}
    {/await}
    <!-- End Recipes -->

    <!-- Folklore -->
    {#await data.streamed.folklore}
      ...
    {:then folklore}
      {#if folklore.title !== "Not found." && folklore.type !== "disambiguation"}
        <h3>{folklore.title}</h3>
        <p>{@html folklore.extract_html}</p>
      {/if}
    {/await}
    <!-- End Folklore-->
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
  .celebrities {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .celebrity {
    border: 1px solid #222222;
  }
  .jobs {
    display: flex;
    gap: 5px;
    .job {
      border: 1px solid #222222;
      padding: 0 3px;
    }
  }

  @media screen and (max-width: 1096px) {
    .celebrities {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
