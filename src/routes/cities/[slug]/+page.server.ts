import countries from "i18n-iso-countries";
import * as en from "i18n-iso-countries/langs/en.json";
import { MAPTOOLKIT_API } from "$env/static/private";
countries.registerLocale(en);

export const load = ({ fetch, params }) => {
  const slug = params.slug;
  const slugList = slug.split(",");

  const cityName = slugList[0];
  const countryName = slugList[1];
  const countryFullName = countries.getName(countryName, "en");
  const lat = slugList[2];
  const lon = slugList[3];
  const countryCityQuery = cityName.split(' ').join('_') + ',_' + countryFullName.split(' ').join('_');

  const fetchWikiCityArticle = async (id: string) => {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${countryCityQuery}`
    );
    const data = await res.json();

    return data;
  };

  // const fetchMapTile = async (lat: string, lon: string) => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': MAPTOOLKIT_API,
  //       'X-RapidAPI-Host': 'maptoolkit.p.rapidapi.com'
  //     }
  //   };
  //   const res = await fetch(`https://maptoolkit.p.rapidapi.com/staticmap?center=${lat}%2C${lon}&zoom=11&size=640x480&maptype=toursprung-terrain&format=png`, options)
  //     .then(res => res.json())
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));

  // } 

  // fetchMapTile(lat, lon);

  return {
    slug: slugList,
    cityWikiArticle: fetchWikiCityArticle(cityName),
  };
};
