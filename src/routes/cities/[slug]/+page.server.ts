export const load = ({ fetch, params }) => {
  console.log(params);
  let slug = params.slug;
  let slugList = slug.split(',');
  
  const lat = slugList[1];
  const lon = slugList[2];

  console.log(lat, lon);

  return {
    slug: slugList,
  }
}