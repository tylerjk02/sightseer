export const load = ({ fetch, params }) => {
  const fetchContinentData = async(id: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${id}`)
    const data = await res.json();
    return data;
  }

  return {
    country: fetchContinentData(params.slug)
  }
}