export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const cityName = splitSlug[0];
  const countryCode = splitSlug[1];
  const commonName = splitSlug[2];
  const officialName = splitSlug[3];

  const fetchWikiArticle = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${id}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  return {
    cityName: cityName,
    countryCode: countryCode,
    commonName: commonName,
    officialName: officialName,
    streamed: {
      article: fetchWikiArticle(cityName)
    }
  }
}