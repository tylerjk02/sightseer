// import { NEWSCATCHER_API_KEY } from '$env/static/private';

export const load = (params) => {
  
  const splitSlug = params.params.slug.split(',');
  const commonName = splitSlug[0];
  const officialName = splitSlug[1];

//   const fetchLocalNews = async (id: string) => {
//     try {
//       const options = {
//         method: "GET",
//         params: {lang: "en", sort_by: "relevancy", page: "1" },
//         headers: {
//           "x-api-key": NEWSCATCHER_API_KEY,
//         },
//       };

//       const res = await fetch(`https://api.newscatcherapi.com/v2/search?q=${id}`, options);
//       const data = await res.json();
//       console.log(data)
//       return data;

//     } catch (err) {
//       return err;
//     }
//   };

  return {
    commonName: commonName,
    officialName: officialName,
    // streamed: {
    //   news: fetchLocalNews(commonName),
    // }
  };
};
