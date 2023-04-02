import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import { GEOAPIFY_API_KEY } from "$env/static/private";
countries.registerLocale(en);

export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const citySlug = splitSlug[0];
  const countrySlug = splitSlug[1];
  const lat = splitSlug[2];
  const long = splitSlug[3];
  const countryFullName = countries.getName(countrySlug, "en");

  const fetchCityId = async (id: string) => {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${citySlug}%20${countryFullName}&format=json&apiKey=${GEOAPIFY_API_KEY}`)
    const data = await res.json();
    return data;
  }

  const fetchHotelData = async () => {
    const cityIdObj = await fetchCityId(citySlug);
    const cityId = cityIdObj.results[0].place_id;
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=place:${cityId}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await res.json()
    return data;
  };



  return {
    citySlug: citySlug,
    countrySlug: countryFullName,
    hotelData: fetchHotelData(),
  };
};
