const load = ({ fetch, params }) => {
  const fetchContinentData = async (id) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${id}`);
    const data = await res.json();
    return data;
  };
  return {
    slug: params.slug,
    continents: fetchContinentData(params.slug)
  };
};
export {
  load
};
