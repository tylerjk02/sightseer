import { countryToAlpha2, countryToAlpha3 } from "country-to-iso";
import { NINJA_API_KEY } from "$env/static/private";

export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

  const fetchCountryCulture = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/Culture_of_${id}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchCountryCelebrities = async (id: string) => {
    try {
      const options = {
        headers: {
          "X-Api-Key": NINJA_API_KEY,
        },
      };
      const res = await fetch(`https://api.api-ninjas.com/v1/celebrity?nationality=${countryToAlpha2(id)}`, options);
      const data = await res.json();
    } catch (err) {
      return err;
    }
  };

  const fetchCountryCuisine = async (id: string) => {
    try {
      const countryRes = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${countryToAlpha3(id)}`
      );
      const countryData = await countryRes.json();
      let dataSet;

      if (countryData.status === 400) {
        const countryRes = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${countryToAlpha2(id)}`
        );
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

  // i needed demonyms. this was the only way. too bad!
  // also, note to self to pay for ai. way more recipes available and will cover 99.9%* of countries (*antarctic 'countries' just return meatballs)
  const fetchRecipe = async (id: string) => {
    try {
      const countryRes = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${countryToAlpha3(id)}`
      );
      const countryData = await countryRes.json();
      let dataSet;

      if (countryData.status === 400) {
        const countryRes = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${countryToAlpha2(id)}`
        );
        const countryData = await countryRes.json();
        dataSet = countryData[0].demonyms.eng.m;
      } else {
        dataSet = countryData[0].demonyms.eng.m;
      }
      const options = {
        headers: {
          "X-Api-Key": NINJA_API_KEY,
        },
      };
      const res = await fetch(
        `https://api.api-ninjas.com/v1/recipe?query=${dataSet}`,
        options
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  // disabling AI recipes for now.

  // const fetchRecipe = async (id: string) => {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "X-RapidAPI-Key": RAPID_API_KEY,
  //       "X-RapidAPI-Host": "openai80.p.rapidapi.com",
  //     },
  //     body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Recipe from ${id} under 50 words, html format inside a main tag"}]}`,
  //   };
  //   const res = await fetch(
  //     `https://openai80.p.rapidapi.com/chat/completions`,
  //     options
  //   );
  //   const data = await res.json();

  //   return data;
  // };

  return {
    slug: params.params.slug,
    streamed: {
      culture: fetchCountryCulture(commonName),
      cuisine: fetchCountryCuisine(commonName),
      recipes: fetchRecipe(commonName),
    },
  };
};
