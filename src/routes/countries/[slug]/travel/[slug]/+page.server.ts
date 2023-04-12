import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import {
  RAPID_API_KEY,
  GEOAPIFY_API_KEY,
  ROAD_GOAT_API,
  ROAD_GOAT_SECRET,
} from "$env/static/private";
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

  // const fetchAICompletion = async(city: string, country: string) => {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'X-RapidAPI-Key': RAPID_API_KEY,
  //       'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
  //     },
  //     body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Travel info ${city}, ${country} under 60 words"}]}`
  //   };
  //   const res = await fetch(`https://openai80.p.rapidapi.com/chat/completions`, options);
  //   const data = await res.json();

  //   return data;
  // }


  const fetchCityImages = async (city: string, country: string) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
      }
    };

    const res = await fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${city}%20${country}&count=4`, options);
    const data = await res.json();

    return data;
  }

  const fetchPlaceData = async (lat: string, lon: string) => {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:${lon},${lat},10000&bias=proximity:${lon},${lat}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await res.json();
    return data;
  };

  const fetchTourismData = async (lat: string, lon: string) => {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism&filter=circle:${lon},${lat},10000&bias=proximity:${lon},${lat}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await res.json();
    return data;
  };

  // const fetchDestination = async () => {
  //   const auth_key = Buffer.from(
  //     `${ROAD_GOAT_API}:${ROAD_GOAT_SECRET}`
  //   ).toString("base64");
  //   const  options = {
  //     'method': 'GET',
  //     'hostname': 'api.roadgoat.com',
  //     'headers': {
  //       'Authorization': `Basic ${auth_key}`
  //     },
  //     'maxRedirects': 20
  //   };

  //   const res = await fetch(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${citySlug},${countrySlug}`, options);
  //   const data = await res.json();
  //   return data;
  // };

  return {
    citySlug: citySlug,
    nameCommon: countrySlug,
    nameOfficial: countryOfficialSlug,
    lat: lat,
    lon: lon,
    streamed: {
      places: fetchPlaceData(lat, lon),
      tourism: fetchTourismData(lat, lon),
      photos: fetchCityImages(citySlug, countrySlug)
    },
    // cityDestinations: fetchDestination(),
    // travelInfoAI: fetchAICompletion(citySlug, countrySlug),
  };
};
