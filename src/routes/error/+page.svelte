<script>
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import Button from '$lib/components/ui/button.svelte'

  $: message = $page.url.searchParams.get('message') || 'Something went wrong connecting to Spotify.'
</script>

<main class="min-h-screen bg-gradient-to-b from-black via-[#050816] to-black text-white flex items-center justify-center px-4">
  <div class="max-w-md space-y-4 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">We couldn’t finish connecting Spotify</h1>
    <p class="text-sm text-neutral-300">
      {message}
    </p>
    <p class="text-xs text-neutral-500">
      You can try again, or double‑check that the redirect URI in your Spotify app settings matches
      this site exactly.
    </p>
    <div class="flex items-center justify-center gap-3 pt-2">
      <Button variant="primary" size="lg" on:click={() => goto('/')}>
        Back to start
      </Button>
    </div>
  </div>
</main>

