import { spotifyApi } from './auth.js'

export async function getMe() {
  return await spotifyApi('/me')
}

export async function getTopTracks(range = 'medium_term', limit = 20) {
  return await spotifyApi(`/me/top/tracks?time_range=${range}&limit=${limit}`)
}

export async function getTopArtists(range = 'medium_term', limit = 20) {
  return await spotifyApi(`/me/top/artists?time_range=${range}&limit=${limit}`)
}

export async function getRecentlyPlayed(limit = 30) {
  return await spotifyApi(`/me/player/recently-played?limit=${limit}`)
}

export async function getAudioFeaturesForTracks(trackIds = []) {
  if (!trackIds.length) return { audio_features: [] }
  const ids = trackIds.slice(0, 100).join(',')
  return await spotifyApi(`/audio-features?ids=${ids}`)
}

