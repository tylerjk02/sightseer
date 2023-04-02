import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
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
      if (data.title !== "Not Found.") {
        return data;
      } else {
        return ["Not Found"];
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    slug: slugList,
    cityWikiArticle: fetchWikiCityArticle(cityName),
  };
};
