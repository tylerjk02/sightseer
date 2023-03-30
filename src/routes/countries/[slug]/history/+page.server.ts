export const load = (params) => {
  const fetchWikiData = async (id: string) => {
    const url = "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "parse",
        page: id,
        format: "json",
    });
    const res = await fetch(url)
    const data = await res.json();
    console.log(data);
 
    return data;
  }

  return {
    slug: params.params.slug,
    wikiData: fetchWikiData(params.params.slug),
  }
}