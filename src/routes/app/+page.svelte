<script>
// @ts-nocheck

  import { onMount } from 'svelte'
  import { fade, fly, slide } from 'svelte/transition'
  import { Activity, Zap, Heart, History, LogOut, Radio, Crown } from 'lucide-svelte'
  import { handleSpotifyRedirectIfPresent, logoutSpotify } from '$lib/spotify/auth'
  import { getMe, getTasteDNA } from '$lib/spotify/api'

  let loading = $state(true)
  let profile = $state(null)
  let recentHistory = $state([])
  let likedLibrary = $state([])
  let stats = $state({
    avgPopularity: 0,
    topArtist: '',
    peakDecade: '',
    vibeColor: '#1DB954'
  })

  async function loadData() {
    try {
      await handleSpotifyRedirectIfPresent()
      const [me, data] = await Promise.all([getMe(), getTasteDNA()])
      profile = me
      recentHistory = data.recentItems
      likedLibrary = data.likedTracks

      const all = data.allTracks
      let popSum = 0
      const decadeMap = {}
      const artistCounts = {}

      all.forEach(track => {
        popSum += (track.popularity || 0)
        const year = track.album?.release_date?.split('-')[0]
        if (year) {
          const dec = Math.floor(year / 10) * 10 + "s"
          decadeMap[dec] = (decadeMap[dec] || 0) + 1
        }
        const artistName = track.artists[0]?.name
        artistCounts[artistName] = (artistCounts[artistName] || 0) + 1
      })

      stats = {
        avgPopularity: Math.round(popSum / all.length),
        topArtist: Object.entries(artistCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A',
        peakDecade: Object.entries(decadeMap).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A'
      }
    } finally {
      loading = false
    }
  }

  onMount(loadData)
</script>

<main class="min-h-screen bg-[#08080a] text-white selection:bg-spotify-green/30 relative overflow-hidden font-sans">
  
  <div class="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-spotify-green/10 blur-[120px] rounded-full"></div>
  <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

  {#if loading}
    <div class="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#08080a]">
      <div class="relative">
        <div class="w-20 h-20 border-2 border-white/5 rounded-full animate-ping"></div>
        <Radio class="absolute inset-0 m-auto w-8 h-8 text-spotify-green animate-pulse" />
      </div>
      <p class="mt-8 text-xs tracking-[0.4em] font-light text-neutral-500 uppercase">Synchronizing Pulse</p>
    </div>
  {:else}
    <div class="max-w-7xl mx-auto px-6 py-12 relative z-10" in:fade={{ duration: 800 }}>
      
      <header class="flex justify-between items-center mb-16">
        <div class="flex items-center gap-6">
          <div class="w-16 h-16 rounded-2xl overflow-hidden rotate-3 shadow-[0_0_30px_rgba(29,185,84,0.2)]">
            <img src={profile?.images?.[0]?.url} alt="" class="w-full h-full object-cover" />
          </div>
          <div>
            <h1 class="text-4xl font-bold tracking-tight">{profile?.display_name}</h1>
            <p class="text-spotify-green text-sm font-medium flex items-center gap-2">
               <Crown class="w-4 h-4" /> {profile?.product} listener
            </p>
          </div>
        </div>
        <button onclick={() => { logoutSpotify(); window.location.href='/' }} 
          class="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110">
          <LogOut class="w-5 h-5 text-neutral-400" />
        </button>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div class="md:col-span-2 relative group overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl">
          <div class="absolute top-0 right-0 p-8 opacity-20">
            <Activity class="w-24 h-24 text-spotify-green" />
          </div>
          <p class="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Live Activity</p>
          <h2 class="text-5xl font-black mb-8">Daily <span class="text-spotify-green">Frequency</span></h2>
          <div class="flex items-end h-32 gap-2">
            {#each stats.hourly as val}
              <div 
                class="flex-1 bg-white/10 hover:bg-spotify-green rounded-full transition-all duration-500" 
                style="height: {Math.max((val/Math.max(...stats.hourly))*100, 10)}%"
              ></div>
            {/each}
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="flex-1 rounded-[2rem] bg-gradient-to-br from-spotify-green to-emerald-700 p-8 text-black shadow-[0_20px_50px_rgba(29,185,84,0.3)] hover:-translate-y-2 transition-transform">
            <Zap class="w-10 h-10 mb-6 fill-black" />
            <p class="text-xs font-bold uppercase opacity-60">Top Artist</p>
            <p class="text-3xl font-black leading-tight">{stats.topArtist}</p>
          </div>
          <div class="flex-1 rounded-[2rem] bg-white/[0.03] border border-white/10 p-8 backdrop-blur-md">
            <p class="text-xs font-bold text-neutral-500 uppercase mb-2">Taste Era</p>
            <p class="text-4xl font-black">{stats.peakDecade}</p>
            <div class="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div class="h-full bg-spotify-green w-[70%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <section>
          <h3 class="flex items-center gap-3 text-lg font-bold mb-6 px-2">
            <History class="w-5 h-5 text-spotify-green" /> Recent Sessions
          </h3>
          <div class="space-y-3">
            {#each recentHistory as item, i}
              <div in:fly={{ y: 20, delay: i * 50 }} 
                class="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-default">
                <div class="relative">
                    <img src={item.track.album.images[2].url} alt="" class="w-12 h-12 rounded-xl" />
                    <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-spotify-green rounded-full border-2 border-[#08080a] flex items-center justify-center">
                        <div class="w-1 h-1 bg-black rounded-full animate-ping"></div>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold truncate group-hover:text-spotify-green transition-colors">{item.track.name}</p>
                  <p class="text-sm text-neutral-500 truncate">{item.track.artists[0].name}</p>
                </div>
                <span class="text-xs font-medium text-neutral-600 italic">
                    {new Date(item.played_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                </span>
              </div>
            {/each}
          </div>
        </section>

        <section>
          <h3 class="flex items-center gap-3 text-lg font-bold mb-6 px-2">
            <Heart class="w-5 h-5 text-pink-500 fill-pink-500" /> Liked Tracks
          </h3>
          <div class="grid grid-cols-1 gap-2 max-h-[700px] overflow-y-auto pr-4 custom-scroll">
            {#each likedLibrary as track, i}
              <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <span class="text-xs font-bold text-neutral-700 w-8">{i + 1}</span>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold truncate">{track.name}</p>
                    <p class="text-xs text-neutral-500 truncate">{track.artists[0].name} • {track.album.release_date.split('-')[0]}</p>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="text-[10px] px-2 py-1 rounded bg-white/10 font-bold uppercase tracking-widest text-neutral-400">
                        {track.popularity}%
                    </div>
                </div>
              </div>
            {/each}
          </div>
        </section>

      </div>
    </div>
  {/if}
</main>

<style>
  .custom-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  /* Modern typography tweaks */
  :global(body) {
    font-feature-settings: "ss01", "ss02", "cv01";
    -webkit-font-smoothing: antialiased;
  }
</style>