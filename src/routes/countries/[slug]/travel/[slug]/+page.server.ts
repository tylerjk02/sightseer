import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import cheerio from "cheerio";
import axios from "axios";
countries.registerLocale(en);

export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const citySlug = splitSlug[0];
  const countrySlug = splitSlug[1];
  const countryFullName = countries.getName(countrySlug, "en");


  return {
    citySlug: citySlug,
    countrySlug: countryFullName,
  };
};
