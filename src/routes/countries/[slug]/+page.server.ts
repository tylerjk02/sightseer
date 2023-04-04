import { NINJA_API_KEY, WINDY_API_KEY } from "$env/static/private";
import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";
import cc from "currency-codes";


export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];
  const countryCurrencyItem: any = cc.country(commonName) || cc.country(officialName);
  let countryCurrencyCode: any = [];
  if(countryCurrencyItem[0] !== undefined) {
    countryCurrencyCode = Object.values(countryCurrencyItem[0])[0];
  }

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

  const fetchCurrencyConversion = async (id: string) => {
    try {
      const res = await fetch(`https://api.api-ninjas.com/v1/convertcurrency?want=${id}&have=USD&amount=1`, {
        method: 'GET',
        headers: {
          'X-Api-Key': NINJA_API_KEY
        }
      })
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }


  const fetchCountryData = async (id: string) => {
    // so sorry for this one. too bad!
    try {
      const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryToAlpha3(id)}`);
      const data = await res.json();
      if(data.status == 400) {
        const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${countryToAlpha2(id)}`);
        const data = await res.json();
        return data;
      } else {
        return data;
      }
    } catch (err) {
      return err;
    }
  };

  const fetchTravelAdvisoryInfo = async (id: string) => {
    try {
      const res = await fetch(
        `https://www.travel-advisory.info/api?countrycode=${countryToAlpha3(id)}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchCityData = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/city?country=${countryToAlpha2(
          id
        )}&limit=20`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": NINJA_API_KEY,
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  // Throwing hundred of errors related to missing thumbnails. Working on it.

  // const fetchWebcamData = async (id: string) => {
  //   try {   
  //     const res = await fetch(
  //       `https://api.windy.com/api/webcams/v2/list/country=${countryToAlpha2(
  //         id
  //       )}?show=webcams:title,player,location,status`,
  //       {
  //         headers: {
  //           "x-windy-key": WINDY_API_KEY,
  //         },
  //       }
  //     );
  //     const data = res.json();
  //     return data;
  //   } catch(err) {
  //     return err;
  //   }
  // };

  return {
    slug: params.params.slug,
    country: fetchCountryData(commonName),
    cities: fetchCityData(commonName),
    wikiArticle: fetchWikiArticle(commonName),
    travelAdvisory: fetchTravelAdvisoryInfo(commonName),
    currencyConversion: fetchCurrencyConversion(countryCurrencyCode),

    // webcams: fetchWebcamData(params.params.slug),
  };
};
