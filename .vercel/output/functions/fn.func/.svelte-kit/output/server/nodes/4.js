import * as server from '../entries/pages/countries/_slug_/_page.server.ts.js';

export const index = 4;
export const component = async () => (await import('../entries/pages/countries/_slug_/_page.svelte.js')).default;
export const file = '_app/immutable/entry/countries-_slug_-page.svelte.5dd0945d.js';
export { server };
export const server_id = "src/routes/countries/[slug]/+page.server.ts";
export const imports = ["_app/immutable/entry/countries-_slug_-page.svelte.5dd0945d.js","_app/immutable/chunks/index.be72a3fc.js"];
export const stylesheets = ["_app/immutable/assets/_page.32a22afe.css"];
export const fonts = [];
