<script lang="ts">
</script>

<main class="main">
  <h2>Choose a region:</h2>
  <div class="regions links">
    <a class="region-link" href="/continents/africa">
      <img
        class="region-img"
        src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180508141319-03-amazing-places-africa---victoria-falls.jpg"
        alt="africa"
      />
      <div class="centered">Africa</div>
    </a>
    <a class="region-link" href="/continents/asia">
      <img
        class="region-img"
        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2d/bd/asia.jpg?w=500&h=300&s=1"
        alt="asia"
      />
      <div class="centered">Asia</div>
    </a>
    <a class="region-link" href="/continents/europe">
      <img
        class="region-img"
        src="https://i.natgeofe.com/n/075e4f53-f271-4f7a-855a-5eccdba43587/01_Europe.jpg"
        alt="europe"
      />
      <div class="centered">Europe</div>
    </a>
    <a class="region-link" href="/continents/americas">
      <img
        class="region-img"
        src="http://www.palacelasamericas.com/images/slides/slide-1.jpg"
        alt="americas"
      />
      <div class="centered">Americas</div>
    </a>
    <a class="region-link" href="/continents/oceania">
      <img
        class="region-img"
        src="https://www.sporcle.com/blog/wp-content/uploads/2019/02/3-5.jpg"
        alt="oceania"
      />
      <div class="centered">Oceania</div>
    </a>
  </div>
  <hr style="background: #222; padding: 2px;" />
  <div class="info">
    <section class="section">
      <h3>About:</h3>
      <p>
        SightSeer is country & city info directory. Data we provide includes
        Population, Coordinates, Travel Spots, Travel Info, Tourist Spots,
        Hotels, City Info, Country History, Country Culture, Country
        Cuisine/Recipes and much more.
      </p>
    </section>

    <section class="section version">
      <h3>Current Version: 0.4</h3>
      <div class="gh-link">
        <a href="https://github.com/tylerjk02/sightseer">GitHub</a>
      </div>
    </section>
  </div>
</main>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");
  .main {
    height: 100vh;
  }
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .regions {
    display: flex;
    align-items: center;
    .region-link {
      width: 20%;
      position: relative;
      text-align: center;
      color: var(--color-white);
      .region-img {
        width: 100%;
        height: 200px;
      }
      .centered {
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;

        background: var(--color-black);
        padding: 0;
        border-radius: 5px;
      }
    }
    .region-link:active {
      transform: scale(1.01);
      z-index: 1000;
    }
  }

  @media screen and (max-width: 978px) {
    .regions {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
      // gap: 5px;
      // margin: 0;
    }
    .region-link {
      width: 100% !important;
      height: 200px;
    }
  }

  @media screen and (max-width: 528px) {
    .regions {
      display: flex;
      flex-direction: column;
    }
    .region-link {
      width: 100%;
      height: 200px;
    }
  }
</style>
