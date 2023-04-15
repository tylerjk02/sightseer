import { NINJA_API_KEY } from "$env/static/private";
import { countryToAlpha2 } from "country-to-iso";

export const load = (params) => {

  const splitSlug = params.params.slug.split(',');
  const nameCommon = splitSlug[0];
  const nameOfficial = splitSlug[1]

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


  const fetchCities = async (id: string, min: number, max: number) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "X-Api-Key": NINJA_API_KEY,
        },
      }
      const res = await fetch(`https://api.api-ninjas.com/v1/city?country=${(countryToAlpha2(id))}&limit=30&min_population=${min}&max_population=${max}`, options);
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  
  return {
    slug: splitSlug,
    travelAdvisory: fetchTravelAdvisoryInfo(nameCommon),
    streamed: {
      largeCities: fetchCities(nameCommon, 250000, 100000000),
      smallCities: fetchCities(nameCommon, 100000, 249999),
      largeTowns: fetchCities(nameCommon, 50000, 99999),
      smallTowns: fetchCities(nameCommon, 20000, 49999),
      other: fetchCities(nameCommon, 1, 19999)
    }
  };
};
