# Notflix — Spotifavor

**Spotifavor** is a small Spotify-clone-style library view for *your* favorite songs.

For “favorite songs”, the simplest source is your Spotify **Saved Tracks** (“Liked Songs”), which are available via the **Spotify Web API** using **Authorization Code + PKCE** (works for browser apps, no client secret needed).

## Setup (Spotify)

- Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- Create an app
- Copy the **Client ID**
- In your Spotify app settings, add a Redirect URI:
  - `http://localhost:5173/`

## Setup (project)

- Copy env file:

```bash
cp .env.example .env
```

- Put your client id into `.env`:

```bash
VITE_SPOTIFY_CLIENT_ID=...
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/
```

## Run

```bash
npm install
npm run dev
```

## What API/library is used?

- **API**: Spotify Web API
  - Fetch saved tracks: `GET /v1/me/tracks`
  - Fetch profile: `GET /v1/me`
- **Auth**: Spotify Accounts service (PKCE)
  - Authorize: `https://accounts.spotify.com/authorize`
  - Token exchange: `https://accounts.spotify.com/api/token`

No wrapper library is required; the app uses `fetch()` directly (see `src/lib/spotify/`).

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```
