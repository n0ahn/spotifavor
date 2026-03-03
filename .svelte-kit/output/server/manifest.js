export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BklnPaKW.js",app:"_app/immutable/entry/app.DzBcoMVA.js",imports:["_app/immutable/entry/start.BklnPaKW.js","_app/immutable/chunks/BZxL6XId.js","_app/immutable/chunks/_d_medbo.js","_app/immutable/chunks/DGpLnRep.js","_app/immutable/entry/app.DzBcoMVA.js","_app/immutable/chunks/_d_medbo.js","_app/immutable/chunks/D5pTLjfI.js","_app/immutable/chunks/DhLheoKm.js","_app/immutable/chunks/C6KTU7nL.js","_app/immutable/chunks/DGpLnRep.js","_app/immutable/chunks/Bk7uyMnB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/app",
				pattern: /^\/app\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
