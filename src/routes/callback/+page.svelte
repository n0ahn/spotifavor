<script>
  import { onMount } from 'svelte'
  import { handleSpotifyRedirectIfPresent } from '$lib/spotify/auth'
  import { goto } from '$app/navigation'

  let error = ''

  onMount(async () => {
    try {
      const { didHandle } = await handleSpotifyRedirectIfPresent()
      if (didHandle) {
        await goto('/app')
      } else {
        await goto('/error?message=' + encodeURIComponent('No authorization code found in callback URL.'))
      }
    } catch (e) {
      const msg = e?.message || 'Something went wrong finishing the Spotify login.'
      await goto('/error?message=' + encodeURIComponent(msg))
    }
  })
</script>

<main class="min-h-screen bg-black text-white flex items-center justify-center">
  <div class="text-center space-y-2 text-sm text-neutral-300">
    <div class="h-6 w-6 mx-auto mb-2 rounded-full border border-white/30 border-t-white animate-spin"></div>
    <p>Connecting your Spotify account…</p>
  </div>
</main>

