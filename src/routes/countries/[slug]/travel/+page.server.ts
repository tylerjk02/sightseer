import { NINJA_API_KEY } from "$env/static/private";
import { countryToAlpha2 } from "country-to-iso";

export const load = (params) => {


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


  const fetchCityData = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
          id
        )}&limit=25`,
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
  
  return {
    slug: params.params.slug,
    cities: fetchCityData(params.params.slug),
    travelAdvisory: fetchTravelAdvisoryInfo(params.params.slug),

  };
};
