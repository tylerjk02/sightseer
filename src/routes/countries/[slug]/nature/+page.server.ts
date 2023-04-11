export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

  const fetchCountryWildlifeArticle = async (id: string) => {
    try {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=Wildlife_of_${commonName}&explaintext=1&formatversion=2&format=json`)
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }


  return {
    commonName: commonName,
    officialName: officialName,
    streamed: {
      wildlife: fetchCountryWildlifeArticle(commonName),
    }
  }

}