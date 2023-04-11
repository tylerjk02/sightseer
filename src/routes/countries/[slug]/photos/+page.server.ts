import { RAPID_API_KEY } from '$env/static/private';
export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

  const fetchCountryImages = async (id: string) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
      }
    };

    const res = await fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${id}%20landscape`, options);
    const data = await res.json();

    return data;
  }

  return {
    commonName: commonName,
    officialName: officialName,
    streamed: {
      images: fetchCountryImages(commonName)
    }
  }
}