<script lang="ts">
</script>

<main class="main">
  <h1>Choose a region</h1>
  <div class="regions">
    <a class="region-link" href="/continents/africa">
      <img class="region-img" src="/img/africa.jpg" alt="africa" />
      <div class="centered">Africa</div>
    </a>
    <a class="region-link" href="/continents/asia">
      <img class="region-img" src="/img/asia.jpg" alt="asia" />
      <div class="centered">Asia</div>
    </a>
    <a class="region-link" href="/continents/europe">
      <img class="region-img" src="/img/europe.jpg" alt="europe" />
      <div class="centered">Europe</div>
    </a>
    <a class="region-link" href="/continents/americas">
      <img class="region-img" src="/img/americas.jpg" alt="americas" />
      <div class="centered">Americas</div>
    </a>
    <a class="region-link" href="/continents/oceania">
      <img class="region-img" src="/img/oceania.jpg" alt="oceania" />
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
