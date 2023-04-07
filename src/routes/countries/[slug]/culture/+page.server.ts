import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";

export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

  const fetchCountryCulture = async (id: string) => {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/Culture_of_${id}`);
      const data = await res.json();
      return data;

    } catch (err) {
      return err;
    }
  }

  const fetchCountryCuisine = async (id: string) => {
    try {
      const countryRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryToAlpha3(id)}`);
      const countryData = await countryRes.json();
      let dataSet;

      if(countryData.status === 400) {
        const countryRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryToAlpha2(id)}`);
        const countryData = await countryRes.json();
        dataSet = countryData[0].demonyms.eng.m;
      } else {
        dataSet = countryData[0].demonyms.eng.m;
      }

      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${dataSet}_cuisine`
      );
      const data = await res.json();
      return data;

    } catch (err) {
      return err;
    }
  };



  return {
    slug: params.params.slug,
    countryCulture: fetchCountryCulture(commonName),
    countryCuisine: fetchCountryCuisine(commonName)
  }
}