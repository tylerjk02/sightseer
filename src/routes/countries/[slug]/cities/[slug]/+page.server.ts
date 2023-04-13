import { NINJA_API_KEY } from '$env/static/private';
export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const cityName = splitSlug[0];
  const countryCode = splitSlug[1];
  console.log(countryCode);
  const commonName = splitSlug[2];
  const officialName = splitSlug[3];

  const fetchCity = async(city: string, country: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": NINJA_API_KEY,
      },
    }
    try {
      const res = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}&country=${country}`, options);
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }


  const fetchWikiArticle = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${id}`
      );
      const data = await res.json();
      if(data.type == "disambiguation") {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${id}_(city)`)
        const data = await res.json();
        return data;
      }
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
      city: fetchCity(cityName, countryCode),
      article: fetchWikiArticle(cityName)
    }
  }
}