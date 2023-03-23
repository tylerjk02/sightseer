export const load = ({ fetch, params }) => {
  const slug = params.slug;
  const slugList = slug.split(",");

  const cityName = slugList[0];
  const countryName = slugList[1];
  const lat = slugList[2];
  const lon = slugList[3];


  

  return {
    slug: slugList,
  };
};
