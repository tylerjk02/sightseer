import countries from "i18n-iso-countries";
import axios from 'axios'
import cheerio from 'cheerio';
import * as en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(en);

export const load = (params) => {
  const splitSlug = params.params.slug.split(',');
  const citySlug = splitSlug[0];
  const countrySlug = splitSlug[1];
  const countryFullName = countries.getName(countrySlug, "en");


  const getHotelData = async (city: string, country: string) => {
    try {
      const url = `https://www.hotels.com/Hotel-Search?destination=${city}%2C%20${country}`;
      const { data } = await axios({
        method: "GET",
        url: url,
      })
  
      const $ = cheerio.load(data);
      const hotelCard = ".uitk-spacing-margin-blockstart-three";
      const hotelObjList: object[] = [];
      
      $(hotelCard).each((parentIdx: any, parentElem: any) => {
        // const hotelInfoList = [];
        const hotelObject: any = {};
        if(parentIdx < 30) {
          $(parentElem).children().each((childIdx: any, childElem: any) => {
            const hotelName = $(childElem).find('.uitk-heading-5').text();
            const hotelArea = $(childElem).find('.uitk-text-spacing-half').text();
            const addonList: any = [];
            const hotelAddons = $(childElem).find('.uitk-layout-flex > .truncate').each((idx: any, elem: any) => {
              const addonContent = $(elem).text();
              addonList.push(addonContent);
            })
            // hotelInfoList.push(hotelName, hotelArea, addonList);
            hotelObject.name = hotelName;
            hotelObject.area = hotelArea;
            hotelObject.addons = addonList;
  
  
          })
          
          hotelObjList.push(hotelObject);        
        }
      })
      console.log(hotelObjList);
      return JSON.stringify(hotelObjList);
  
    } catch (err) {
      console.error(err);
    }
  }
  
  


  return {
    citySlug: citySlug,
    countrySlug: countryFullName,
    hotelData: getHotelData(citySlug, countryFullName),
  }

}