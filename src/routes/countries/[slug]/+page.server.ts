import { NINJA_API_KEY, WINDY_API_KEY } from "$env/static/private";
import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";

export const load = (params) => {
  const countryIdAlpha2: any = countryToAlpha2(params.params.slug);
  const countryIdAlpha3: any = countryToAlpha3(params.params.slug);

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


  const fetchCountryData = async (id: string) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchTravelAdvisoryInfo = async (id: string) => {
    try {
      const res = await fetch(
        `https://www.travel-advisory.info/api?countrycode=${id}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchCityData = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
          id
        )}&limit=20`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": NINJA_API_KEY,
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };



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
    slug: params.params.slug,
    country: fetchCountryData(countryIdAlpha3),
    cities: fetchCityData(params.params.slug),
    wikiArticle: fetchWikiArticle(params.params.slug),
    travelAdvisory: fetchTravelAdvisoryInfo(countryIdAlpha2),
    webcams: fetchWebcamData(params.params.slug),
  };
};
