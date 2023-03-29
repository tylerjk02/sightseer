import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import { RAPID_API_KEY } from "$env/static/private";
countries.registerLocale(en);

export const load = ({ fetch, params }) => {
  const slug = params.slug;
  const slugList = slug.split(",");

  const cityName = slugList[0];
  const countryName = slugList[1];
  const countryFullName = countries.getName(countryName, "en");
  const lat = slugList[2];
  const lon = slugList[3];
  const countryCityQuery =
    cityName.split(" ").join("_") + ",_" + countryFullName.split(" ").join("_");

  const fetchWikiCityArticle = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${countryCityQuery}`
      );
      const data = await res.json();

      return data;
    } catch (err) {
      return err;
    }
  };

  // const fetchCityCostOfLiving = async (city: string, country: string) => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "X-RapidAPI-Key": RAPID_API_KEY,
  //         "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
  //       },
  //     };
  //     const res = await fetch(`https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city}&country_name=${country}`, options);
  //     const data = await res.json();
  //     return data;

  //   } catch (err) {
  //     return err;
  //   }
  // };

  return {
    slug: slugList,
    cityWikiArticle: fetchWikiCityArticle(cityName),
    // costOfLiving: fetchCityCostOfLiving(cityName, countryFullName);
  };
};
