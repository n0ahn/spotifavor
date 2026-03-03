import { spotifyApi } from './auth.js'

export async function getMe() { return await spotifyApi('/me') }

export async function getRecentlyPlayed(limit = 50) {
  return await spotifyApi(`/me/player/recently-played?limit=${limit}`)
}

export async function getSavedTracks(offset = 0, limit = 50) {
  return await spotifyApi(`/me/tracks?offset=${offset}&limit=${limit}`)
}

export async function getTasteDNA() {
  // 1. Get the 50 most recent "Live" tracks
  const recent = await getRecentlyPlayed(50).catch(() => ({ items: [] }));
  
  // 2. Fetch the "Ancestry" (Liked Songs - 450 tracks)
  const pages = [0, 50, 100, 150, 200, 250, 300, 350, 400];
  const likedData = await Promise.all(
    pages.map(offset => getSavedTracks(offset, 50).catch(() => ({ items: [] })))
  );

  const likedTracks = likedData.flatMap(page => page?.items || []).map(i => i.track).filter(Boolean);
  const recentTracks = recent?.items?.map(i => i.track) || [];

  return {
    recentItems: recent?.items || [], // Contains played_at timestamps
    likedTracks: likedTracks,         // The permanent library
    allTracks: [...recentTracks, ...likedTracks]
  };
}