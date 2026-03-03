<script>
  export let variant = 'default'
  export let size = 'md'
  export let type = 'button'
</script>

<button
  type={type}
  class={`inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none ${
    variant === 'primary'
      ? 'bg-spotify-green text-black hover:bg-emerald-500'
      : variant === 'ghost'
        ? 'bg-transparent text-neutral-200 hover:bg-white/10'
        : 'bg-white text-black hover:bg-neutral-200'
  } ${
    size === 'lg'
      ? 'px-6 py-3 text-sm'
      : size === 'sm'
        ? 'px-3 py-1.5 text-xs'
        : 'px-4 py-2 text-sm'
  }`}
>
  <slot />
</button>

