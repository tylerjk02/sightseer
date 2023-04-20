import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import {
  RAPID_API_KEY,
  GEOAPIFY_API_KEY,
  ROAD_GOAT_API,
  ROAD_GOAT_SECRET,
  NINJA_API_KEY,
} from "$env/static/private";
import { countryToAlpha2 } from "country-to-iso";
countries.registerLocale(en);

export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const citySlug = splitSlug[0];
  let countrySlug = splitSlug[1];
  let countryOfficialSlug = splitSlug[2];
  let lat = splitSlug[3];
  let lon = splitSlug[4];

  if (countrySlug.length == 2) {
    countrySlug = countries.getName(countrySlug, "en");
  }

  const fetchCity = async (city: string, country: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": NINJA_API_KEY,
      },
    };
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?name=${city}&country=${countryToAlpha2(
          country
        )}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchWikiArticle = async (id: string) => {
    const slug = id.split(' ').join('_');
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`
    );
    const data = await res.json();
    return data;
  };

  const fetchPlaceData = async (cat: string, lat: string, lon: string) => {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=${cat}&filter=circle:${lon},${lat},10000&bias=proximity:${lon},${lat}&limit=10&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await res.json();
    return data;
  };

  return {
    citySlug: citySlug,
    nameCommon: countrySlug,
    nameOfficial: countryOfficialSlug,
    lat: lat,
    lon: lon,
    streamed: {
      city: fetchCity(citySlug, countrySlug),
      places: fetchPlaceData('accommodation', lat, lon),
      tourism: fetchPlaceData('tourism', lat, lon),
      activities: fetchPlaceData('activity', lat, lon),
      commercial: fetchPlaceData('commercial', lat, lon),
      wiki: fetchWikiArticle(citySlug),
    },
    // cityDestinations: fetchDestination(),
    // travelInfoAI: fetchAICompletion(citySlug, countrySlug),
  };
};
