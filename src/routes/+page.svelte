<script lang="ts">
</script>

<main class="main">
  <h1>Choose a region</h1>
  <div class="regions">
    <a class="region-link" href="/continents/africa">
      <img class="region-img" src="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180508141319-03-amazing-places-africa---victoria-falls.jpg" alt="africa" />
      <div class="centered">Africa</div>
    </a>
    <a class="region-link" href="/continents/asia">
      <img class="region-img" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2d/bd/asia.jpg?w=500&h=300&s=1" alt="asia" />
      <div class="centered">Asia</div>
    </a>
    <a class="region-link" href="/continents/europe">
      <img class="region-img" src="https://i.natgeofe.com/n/075e4f53-f271-4f7a-855a-5eccdba43587/01_Europe.jpg" alt="europe" />
      <div class="centered">Europe</div>
    </a>
    <a class="region-link" href="/continents/americas">
      <img class="region-img" src="http://www.palacelasamericas.com/images/slides/slide-1.jpg" alt="americas" />
      <div class="centered">Americas</div>
    </a>
    <a class="region-link" href="/continents/oceania">
      <img class="region-img" src="https://www.sporcle.com/blog/wp-content/uploads/2019/02/3-5.jpg" alt="oceania" />
      <div class="centered">Oceania</div>
    </a>
  </div>
</main>

<style>
  .region-link {
    width: 20%;
    position: relative;
    text-align: center;
    color: white;
  }
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 42px;
    background: #333333ce;
    padding: 5px 15px;
    border-radius: 10px;
  }
  .region-link:hover {
    z-index: 1000;
    transform: scale(104%);
    transition: all 0.3s;
  }
  .regions {
    display: flex;
    align-items: center;
  }
  .region-img {
    width: 100%;
    height: 200px;
  }
  .main h1 {
    margin: 5px 0;
  }
</style>
