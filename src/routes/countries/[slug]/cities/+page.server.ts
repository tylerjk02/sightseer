import { NINJA_API_KEY } from "$env/static/private";
import { countryToAlpha2 } from "country-to-iso";
export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

  const fetchCountryCities = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
          id
        )}&limit=30&min_population=80000`,
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

  const fetchCountryTowns = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
          id
        )}&limit=30&max_population=80000&min_population=8000`,
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

  const fetchCountryVillages = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
          id
        )}&limit=30&max_population=8000&min_population=1`,
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
  }

  return {
    commonName: commonName,
    officialName: officialName,
    streamed: {
      cities: fetchCountryCities(commonName),
      towns: fetchCountryTowns(commonName),
      villages: fetchCountryVillages(commonName)
    }
  };
};
