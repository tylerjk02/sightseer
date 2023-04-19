import { NINJA_API_KEY } from "$env/static/private";
export const load = (params) => {
  const splitSlug = params.params.slug.split(",");
  const nameCommon = splitSlug[0];
  const nameOfficial = splitSlug[1];

  const sortByYear = (e: any) => {
    e.sort((a: any, b: any) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });
  };

  const fetchWikiHistory = async (id: string) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/History_of_${id}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchHistoryCommon = async (id: string) => {
    try {
      const options = {
        headers: {
          "X-Api-Key": NINJA_API_KEY,
        },
      };
      const res = await fetch(
        `https://api.api-ninjas.com/v1/historicalevents?text=${id}`,
        options
      );
      const data = await res.json();
      sortByYear(data);
      return data;
    } catch (err) {
      return err;
    }
  };

  const fetchHistoryOfficial = async (id: string) => {
    try {
      const options = {
        headers: {
          "X-Api-Key": NINJA_API_KEY,
        },
      };
      const res = await fetch(
        `https://api.api-ninjas.com/v1/historicalevents?text=${id}`,
        options
      );
      const data = await res.json();
      sortByYear(data);
      return data;
    } catch (err) {
      return err;
    }
  };

  return {
    commonName: nameCommon,
    officialName: nameOfficial,
    streamed : {
      historyBlipsCommonName: fetchHistoryCommon(nameCommon),
      historyBlipsOfficialName: fetchHistoryOfficial(nameOfficial),
      wikiHistory: fetchWikiHistory(nameCommon),
    }
  };
};
