import { NINJA_API_KEY } from "$env/static/private";
export const load = (params) => {
  console.log(params.params.slug)
  const splitSlug = params.params.slug.split(',');
  const nameCommon = splitSlug[0];
  const nameOfficial = splitSlug[1]
  const fetchHistoryCommon = async (id: string) => {
    const options = {
      headers: {
        "X-Api-Key": NINJA_API_KEY,
      },
    };
    const res = await fetch(`https://api.api-ninjas.com/v1/historicalevents?text=${id}`, options);
    const data = await res.json();
    return data;
  }

  const fetchHistoryOfficial = async (id: string) => {
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
    commonName: nameCommon,
    officialName: nameOfficial,
    historyBlipsCommonName: fetchHistoryCommon(nameCommon),
    historyBlipsOfficialName: fetchHistoryOfficial(nameOfficial),
  };
};
