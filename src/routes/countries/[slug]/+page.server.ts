import { UNSPLASH_ACCESS, NINJA_API_KEY } from "$env/static/private";
import { countryToAlpha2 } from "country-to-iso";

export const load = (params) => {
  const fetchWikiArticle = async (id: string) => {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${id}`
    );
    const data = await res.json();
    return data;
  };

  const fetchWikiCityArticles = async (id: any[]) => {
    const cityWikiArticles: any[] = [];
    if (id.length > 0) {
      for (const city of id) {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${city.name}`
        );
        const data = await res.json();
        cityWikiArticles.push(data);
      }
    }
    return cityWikiArticles;
  };

  const fetchContinentData = async (id: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
    const data = await res.json();
    return data;
  };

  const fetchTravelAdvisoryInfo = async (id: string) => {
    const res = await fetch(
      `https://www.travel-advisory.info/api?countrycode=${countryToAlpha2(id)}`
    );
    const data = await res.json();
    return data;
  };

  const fetchCountryPhotos = async (id: string) => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${id}&orientation=landscape&client_id=${UNSPLASH_ACCESS}`
    );
    const data = await res.json();
    return data;
  };
  const fetchCityData = async (id: string) => {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
        id
      )}&limit=10`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": NINJA_API_KEY,
        },
      }
    );
    const data = await res.json();
    const dataSet = [data, await fetchWikiCityArticles(data)];
    return dataSet;
  };

  return {
    country: fetchContinentData(params.params.slug),
    photos: fetchCountryPhotos(params.params.slug),
    cities: fetchCityData(params.params.slug),
    wikiArticle: fetchWikiArticle(params.params.slug),
    travelAdvisory: fetchTravelAdvisoryInfo(params.params.slug),
  };
};
