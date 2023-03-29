import { NINJA_API_KEY, WINDY_API_KEY } from "$env/static/private";
import { countryToAlpha2 } from "country-to-iso";

export const load = (params) => {
  const fetchWikiArticle = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${id}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchWikiCityArticles = async (id: any[]) => {
    try {
      const cityWikiArticles: object[] = [];
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
    } catch (err) {
      return err;
    }
  };

  const fetchContinentData = async (id: string) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchTravelAdvisoryInfo = async (id: string) => {
    try {
      const res = await fetch(
        `https://www.travel-advisory.info/api?countrycode=${countryToAlpha2(
          id
        )}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  // Unsplash Image Fetch Phased Out - Returns unrelated images too often. Occupies too much network time on page load.

  // const fetchCountryPhotos = async (id: string) => {
  //   const res = await fetch(
  //     `https://api.unsplash.com/search/photos?query=${id}&orientation=landscape&client_id=${UNSPLASH_ACCESS}`
  //   );
  //   const data = await res.json();
  //   return data;
  // };

  const fetchCityData = async (id: string) => {
    try {
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
      const article = await res.json();
      const data = [article, await fetchWikiCityArticles(article)];
      return data;
    } catch (err) {
      return err;
    }
  };

  // const fetchYoutubeSearch = async (id: string) => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': YT_SEARCH_API_KEY,
  //         'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
  //       }
  //     }
  //     const res = await fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${id}`, options);
  //     const data = await res.json();
  //     return data;
  //   } catch(err) {
  //     return err;
  //   }


  // }

  const fetchWebcamData = async (id: string) => {
    try {   
      const res = await fetch(
        `https://api.windy.com/api/webcams/v2/list/country=${countryToAlpha2(
          id
        )}?show=webcams:title,player,location,status`,
        {
          headers: {
            "x-windy-key": WINDY_API_KEY,
          },
        }
      );
      const data = res.json();
      return data;
    } catch(err) {
      return err;
    }
  };

  return {
    country: fetchContinentData(params.params.slug),
    // ytSearch: fetchYoutubeSearch(params.params.slug),
    // photos: fetchCountryPhotos(params.params.slug),
    cities: fetchCityData(params.params.slug),
    wikiArticle: fetchWikiArticle(params.params.slug),
    travelAdvisory: fetchTravelAdvisoryInfo(params.params.slug),
    webcams: fetchWebcamData(params.params.slug),
  };
};
