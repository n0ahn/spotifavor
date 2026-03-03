<script>
  import { onMount } from 'svelte'
  import { ArrowLeft, Clock3, Headphones, Music3, PieChart, TrendingUp } from 'lucide-svelte'
  import {
    handleSpotifyRedirectIfPresent,
    hasStoredToken,
    logoutSpotify,
  } from '$lib/spotify/auth'
  import {
    getAudioFeaturesForTracks,
    getMe,
    getRecentlyPlayed,
    getTopArtists,
    getTopTracks,
  } from '$lib/spotify/api'
  import Button from '$lib/components/ui/button.svelte'
  import Card from '$lib/components/ui/card.svelte'

  let loading = $state(true)
  let error = $state('')
  let profile = $state(null)
  let topTracks = $state([])
  let topArtists = $state([])
  let recent = $state([])
  let energyStats = $state(null)
  let timeOfDayBuckets = $state(null)

  function bucketTimeOfDay(items) {
    const buckets = {
      morning: 0,
      day: 0,
      evening: 0,
      night: 0,
    }
    items.forEach((item) => {
      const dt = new Date(item.played_at || item.timestamp || Date.now())
      const h = dt.getHours()
      if (h >= 6 && h < 11) buckets.morning += 1
      else if (h >= 11 && h < 18) buckets.day += 1
      else if (h >= 18 && h < 23) buckets.evening += 1
      else buckets.night += 1
    })
    const total = Object.values(buckets).reduce((a, b) => a + b, 0) || 1
    return Object.fromEntries(
      Object.entries(buckets).map(([k, v]) => [k, Math.round((v / total) * 100)]),
    )
  }

  function computeEnergy(features) {
    if (!features?.length) return null
    const valid = features.filter(Boolean)
    if (!valid.length) return null
    const avg = (key) =>
      valid.reduce((sum, f) => sum + (f[key] ?? 0), 0) / (valid.length || 1)
    return {
      energy: Math.round(avg('energy') * 100),
      danceability: Math.round(avg('danceability') * 100),
      valence: Math.round(avg('valence') * 100),
      acousticness: Math.round(avg('acousticness') * 100),
    }
  }

  async function loadData() {
    loading = true
    error = ''
    try {
      const [{ didHandle }] = await Promise.all([handleSpotifyRedirectIfPresent()])
      if (!didHandle && !hasStoredToken()) {
        error = 'Please go back and connect your Spotify account first.'
        loading = false
        return
      }

      const [me, topTracksResp, topArtistsResp, recentResp] = await Promise.all([
        getMe(),
        getTopTracks('medium_term', 20),
        getTopArtists('medium_term', 15),
        getRecentlyPlayed(30),
      ])

      profile = me
      topTracks = topTracksResp?.items || []
      topArtists = topArtistsResp?.items || []
      recent = recentResp?.items || []

      timeOfDayBuckets = bucketTimeOfDay(recent)

      const trackIds = topTracks.map((t) => t.id).filter(Boolean)
      const featuresResp = await getAudioFeaturesForTracks(trackIds)
      energyStats = computeEnergy(featuresResp?.audio_features || [])
    } catch (e) {
      error = e?.message || String(e)
    } finally {
      loading = false
    }
  }

  function backToLanding() {
    window.location.href = '/'
  }

  onMount(() => {
    loadData()
  })
</script>

<main class="min-h-screen bg-gradient-to-b from-black via-[#050816] to-black text-white">
  <div class="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 md:px-8">
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#1DB95422,_transparent_55%),radial-gradient(circle_at_bottom_right,_#1DB95411,_transparent_55%)]"
    ></div>

    <header class="mb-6 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-300 hover:bg-white/10"
          onclick={backToLanding}
        >
          <ArrowLeft class="h-4 w-4" />
        </button>
        <div>
          <div class="text-xs uppercase tracking-[0.16em] text-spotify-green">VibeScope</div>
          <div class="text-sm font-semibold tracking-tight">Your Spotify story</div>
        </div>
      </div>

      <div class="flex items-center gap-3 text-xs text-neutral-300">
        {#if profile}
          <div class="flex items-center gap-2">
            {#if profile.images?.[0]?.url}
              <img
                src={profile.images[0].url}
                alt="Avatar"
                class="h-7 w-7 rounded-full object-cover"
              />
            {/if}
            <div class="text-right">
              <div class="font-medium">{profile.display_name || profile.id}</div>
              <div class="text-[10px] text-neutral-400">
                {profile.product === 'premium' ? 'Spotify Premium' : 'Spotify Free'}
              </div>
            </div>
          </div>
        {/if}

        <Button
          variant="ghost"
          size="sm"
          on:click={() => {
            logoutSpotify()
            window.location.href = '/'
          }}
        >
          Log out
        </Button>
      </div>
    </header>

    {#if error}
      <div class="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs md:text-sm text-red-200">
        {error}
      </div>
    {/if}

    {#if loading}
      <div class="flex flex-1 items-center justify-center text-sm text-neutral-400">
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-white"></div>
          <span>Pulling your Spotify stats…</span>
        </div>
      </div>
    {:else}
      <section class="grid flex-1 gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div class="space-y-4">
          <Card>
            <div class="mb-4 flex items-center justify-between gap-2">
              <div>
                <div class="text-xs uppercase tracking-[0.16em] text-spotify-green">
                  Overview
                </div>
                <h1 class="text-lg font-semibold tracking-tight md:text-xl">
                  Your current listening snapshot
                </h1>
              </div>
              <div class="flex items-center gap-2 text-[11px] text-neutral-400">
                <Headphones class="h-4 w-4 text-spotify-green" />
                <span>{topTracks.length} top tracks · {topArtists.length} artists</span>
              </div>
            </div>

            <div class="grid gap-3 md:grid-cols-3 text-xs">
              <div class="space-y-1 rounded-xl bg-black/40 p-3">
                <div class="mb-1 flex items-center gap-2 text-neutral-400">
                  <Music3 class="h-3 w-3 text-spotify-green" />
                  <span>Most played track (last months)</span>
                </div>
                {#if topTracks[0]}
                  <div class="font-medium text-neutral-50">
                    {topTracks[0].name}
                  </div>
                  <div class="text-[11px] text-neutral-400">
                    {topTracks[0].artists.map((a) => a.name).join(', ')}
                  </div>
                {:else}
                  <div class="text-neutral-500">Not enough data yet.</div>
                {/if}
              </div>

              <div class="space-y-1 rounded-xl bg-black/40 p-3">
                <div class="mb-1 flex items-center gap-2 text-neutral-400">
                  <TrendingUp class="h-3 w-3 text-spotify-green" />
                  <span>Top artist focus</span>
                </div>
                {#if topArtists[0]}
                  <div class="font-medium text-neutral-50">
                    {topArtists[0].name}
                  </div>
                  <div class="text-[11px] text-neutral-400">
                    {topArtists[0].genres?.slice(0, 2).join(' · ') || 'Genre unknown'}
                  </div>
                {:else}
                  <div class="text-neutral-500">Listen a bit more to see this.</div>
                {/if}
              </div>

              <div class="space-y-1 rounded-xl bg-black/40 p-3">
                <div class="mb-1 flex items-center gap-2 text-neutral-400">
                  <Clock3 class="h-3 w-3 text-spotify-green" />
                  <span>When you listen most</span>
                </div>
                {#if timeOfDayBuckets}
                  <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                    {#each Object.entries(timeOfDayBuckets) as [label, value]}
                      <div class="flex items-center justify-between gap-2">
                        <span class="capitalize text-neutral-300">{label}</span>
                        <span class="text-neutral-400">{value}%</span>
                      </div>
                    {/each}
                  </div>
                {:else}
                  <div class="text-neutral-500">We’ll show your cycles once you’ve listened.</div>
                {/if}
              </div>
            </div>
          </Card>

          <Card>
            <div class="mb-3 flex items-center justify-between gap-2 text-xs text-neutral-400">
              <span class="flex items-center gap-2">
                <PieChart class="h-4 w-4 text-spotify-green" />
                Audio fingerprint of your top tracks
              </span>
            </div>
            {#if energyStats}
              <div class="grid gap-3 text-[11px] md:grid-cols-4">
                {#each Object.entries(energyStats) as [label, value]}
                  <div class="space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="capitalize text-neutral-300">{label}</span>
                      <span class="text-neutral-400">{value}%</span>
                    </div>
                    <div class="h-1.5 rounded-full bg-neutral-800">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-spotify-green to-emerald-500"
                        style={`width: ${value}%`}
                      ></div>
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              <p class="text-xs text-neutral-500">
                We couldn’t compute audio features yet – try listening more to your favorite tracks.
              </p>
            {/if}
          </Card>

          <Card>
            <div class="mb-3 flex items-center justify-between text-xs text-neutral-400">
              <span>Recent sessions</span>
              <span>
                {recent.length}
                plays
              </span>
            </div>
            <div class="max-h-56 space-y-1 overflow-auto pr-1 text-[11px]">
              {#if recent.length === 0}
                <p class="text-neutral-500">
                  No recent plays returned yet – Spotify sometimes takes a moment to populate this.
                </p>
              {:else}
                {#each recent as item}
                  <div class="flex items-center justify-between gap-2 rounded-lg bg-black/40 px-2 py-1.5">
                    <div class="min-w-0">
                      <div class="truncate font-medium text-neutral-100">
                        {item.track.name}
                      </div>
                      <div class="truncate text-neutral-400">
                        {item.track.artists.map((a) => a.name).join(', ')}
                      </div>
                    </div>
                    <div class="whitespace-nowrap text-[10px] text-neutral-500">
                      {new Date(item.played_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </Card>
        </div>

        <div class="space-y-4">
          <Card>
            <div class="mb-3 flex items-center justify-between text-xs text-neutral-400">
              <span>Your top tracks</span>
              <span>Last few months</span>
            </div>
            <div class="max-h-72 space-y-1 overflow-auto pr-1 text-[11px]">
              {#if topTracks.length === 0}
                <p class="text-neutral-500">
                  We couldn’t find top tracks yet. Listen on Spotify and check back soon.
                </p>
              {:else}
                {#each topTracks as track, i}
                  <div class="flex items-center gap-2 rounded-lg bg-black/40 px-2 py-1.5">
                    <span class="w-5 text-center text-neutral-500">{i + 1}</span>
                    {#if track.album?.images?.[2]?.url}
                      <img
                        src={track.album.images[2].url}
                        alt=""
                        class="h-8 w-8 rounded object-cover"
                      />
                    {/if}
                    <div class="min-w-0">
                      <div class="truncate text-neutral-50">{track.name}</div>
                      <div class="truncate text-[10px] text-neutral-400">
                        {track.artists.map((a) => a.name).join(', ')}
                      </div>
                    </div>
                    <div class="ml-auto text-right text-[10px] text-neutral-500">
                      {Math.round(track.popularity ?? 0)} popularity
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </Card>

          <Card>
            <div class="mb-3 flex items-center justify-between text-xs text-neutral-400">
              <span>Your core artists</span>
              <span>Personality map</span>
            </div>
            <div class="max-h-72 space-y-1 overflow-auto pr-1 text-[11px]">
              {#if topArtists.length === 0}
                <p class="text-neutral-500">
                  Not enough artist data yet – listen a bit more and we’ll map this out.
                </p>
              {:else}
                {#each topArtists as artist}
                  <div class="flex items-center gap-2 rounded-lg bg-black/40 px-2 py-1.5">
                    {#if artist.images?.[2]?.url}
                      <img
                        src={artist.images[2].url}
                        alt=""
                        class="h-8 w-8 rounded-full object-cover"
                      />
                    {/if}
                    <div class="min-w-0">
                      <div class="truncate text-neutral-50">{artist.name}</div>
                      <div class="truncate text-[10px] text-neutral-400">
                        {artist.genres?.slice(0, 2).join(' · ') || 'Genres unknown'}
                      </div>
                    </div>
                    <div class="ml-auto text-right text-[10px] text-neutral-500">
                      {Math.round(artist.popularity ?? 0)} popularity
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </Card>
        </div>
      </section>
    {/if}
  </div>
</main>
