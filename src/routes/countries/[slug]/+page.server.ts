import { UNSPLASH_ACCESS, NINJA_API_KEY } from '$env/static/private';
import { countryToAlpha2 } from "country-to-iso";


// https://en.wikipedia.org/api/rest_v1/page/summary/Sofia ... add city info with wiki?

export const load = (params) => {
  
  const fetchContinentData = async (id: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
    const data = await res.json();
    return data;
  }
  
  const fetchCountryPhotos = async (id: string) => {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${id}&orientation=landscape&client_id=${UNSPLASH_ACCESS}`);
    const data = await res.json();
    return data;
  }

  const fetchCityData = async(id: string) => {
    const res = await fetch(`https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(id)}&limit=15`, {
      method: "GET",
      headers: {
        "X-Api-Key": NINJA_API_KEY,
      }
    });
    const data = await res.json();
    return data;
  }
  return {
    country: fetchContinentData(params.params.slug),
    photos: fetchCountryPhotos(params.params.slug),
    cities: fetchCityData(params.params.slug)
    
  };
};
