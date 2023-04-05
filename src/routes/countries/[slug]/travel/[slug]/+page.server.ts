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
  if(countrySlug.length == 2) {
    countrySlug = countries.getName(countrySlug, "en");
  } 

  const fetchAICompletion = async(city: string, country: string) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '37ca2892fcmsh4286c60da492a01p1f4042jsna2ef94919da0',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      },
      body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Travel info ${city}, ${country} under 60 words"}]}`
    };
    const res = await fetch(`https://openai80.p.rapidapi.com/chat/completions`, options);
    const data = await res.json();

    return data;
  }


  const fetchCityId = async (city: string, country: string) => {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${city}%20${country}&format=json&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await res.json();
    return data;
  };

  const fetchPlaceData = async () => {
    const cityIdObj = await fetchCityId(citySlug, countrySlug);
    const cityId = cityIdObj.results[0].place_id;
    const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=accommodation&filter=place:${cityId}&limit=15&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await res.json();
    return data;
  };

  const fetchDestination = async () => {
    const auth_key = Buffer.from(
      `${ROAD_GOAT_API}:${ROAD_GOAT_SECRET}`
    ).toString("base64");
    const  options = {
      'method': 'GET',
      'hostname': 'api.roadgoat.com',
      'headers': {
        'Authorization': `Basic ${auth_key}`
      },
      'maxRedirects': 20
    };

    const res = await fetch(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${citySlug},${countrySlug}`, options);
    const data = await res.json();
    return data;
  };


  return {
    citySlug: citySlug,
    countrySlug: countrySlug,
    cityPlaces: fetchPlaceData(),
    cityDestinations: fetchDestination(),
    travelInfoAI: fetchAICompletion(citySlug, countrySlug),

  };
};
