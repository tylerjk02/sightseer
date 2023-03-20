export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["img/africa.jpg","img/americas.jpg","img/asia.jpg","img/europe.jpg","img/oceania.jpg"]),
	mimeTypes: {".jpg":"image/jpeg"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.3367a384.js","imports":["_app/immutable/entry/start.3367a384.js","_app/immutable/chunks/index.be72a3fc.js","_app/immutable/chunks/singletons.47c0a012.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.bb64b6e3.js","imports":["_app/immutable/entry/app.bb64b6e3.js","_app/immutable/chunks/index.be72a3fc.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/continents/[slug]",
				pattern: /^\/continents\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/countries/[slug]",
				pattern: /^\/countries\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
