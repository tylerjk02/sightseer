import { RAPID_API_KEY } from '$env/static/private';

export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

  const fetchCountryWildlifeArticle = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=Wildlife_of_${commonName}&explaintext=1&formatversion=2&format=json`
      );
      const data = await res.json();
      if (data.query.pages[0].extract.length == 0) {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=Fauna_of_${commonName}&explaintext=1&formatversion=2&format=json`
        );
        const data = await res.json();
        return data;
      }
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchNatureImages = async (country: string) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
      }
    };

    const res = await fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=Country%20of%20${country}%20Native%20Animals&count=15`, options);
    const data = await res.json();

    return data;
  }

  return {
    commonName: commonName,
    officialName: officialName,
    streamed: {
      wildlife: fetchCountryWildlifeArticle(commonName),
      images: fetchNatureImages(commonName),
    },
  };
};
