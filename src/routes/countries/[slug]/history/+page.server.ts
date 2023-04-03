import { NINJA_API_KEY } from "$env/static/private";
export const load = (params) => {
  const fetchHistory = async (id: string) => {
    const options = {
      headers: {
        "X-Api-Key": NINJA_API_KEY,
      },
    };
    const res = await fetch(`https://api.api-ninjas.com/v1/historicalevents?text=${id}`, options);
    const data = await res.json();
    return data;
  };

  return {
    slug: params.params.slug,
    historyBlips: fetchHistory(params.params.slug),
  };
};
