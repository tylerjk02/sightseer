export const load = ({ fetch, params }) => {
  const fetchContinentData = async(id: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/region/${id}`)
    const data = await res.json();

    return data;
  }

  return {
    slug: params.slug,
    countries: fetchContinentData(params.slug), 
  }
}