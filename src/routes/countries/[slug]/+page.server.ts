import { UNSPLASH_ACCESS } from '$env/static/private';

export const load = (params) => {

  const fetchContinentData = async (id: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
    const data = await res.json();
    return data;
  };

  const fetchCountryPhotos = async (id: string) => {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${id}&client_id=${UNSPLASH_ACCESS}`);
    const data = await res.json();
    return data;
  }

  return {
    country: fetchContinentData(params.params.slug),
    photos: fetchCountryPhotos(params.params.slug)
  };
};
