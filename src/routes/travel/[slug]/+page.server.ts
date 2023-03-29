export const load = (params) => {
  const splitSlug = params.params.slug.split(',');

  console.log(splitSlug);
  return {
    slug: splitSlug,
  }

}