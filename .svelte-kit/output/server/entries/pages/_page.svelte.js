import "clsx";
import { I as Icon, B as Button } from "../../chunks/button.js";
import { a0 as sanitize_props, a1 as spread_props, s as slot } from "../../chunks/index.js";
function Arrow_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-right
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Chart_column($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { "d": "M18 17V9" }],
    ["path", { "d": "M13 17V5" }],
    ["path", { "d": "M8 17v-3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chart-column" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartColumn
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAzdjE2YTIgMiAwIDAgMCAyIDJoMTYiIC8+CiAgPHBhdGggZD0iTTE4IDE3VjkiIC8+CiAgPHBhdGggZD0iTTEzIDE3VjUiIC8+CiAgPHBhdGggZD0iTTggMTd2LTMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-column
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Chart_line($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { "d": "m19 9-5 5-4-4-3 3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chart-line" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartLine
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAzdjE2YTIgMiAwIDAgMCAyIDJoMTYiIC8+CiAgPHBhdGggZD0ibTE5IDktNSA1LTQtNC0zIDMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-line
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Headphones($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "headphones" },
    $$sanitized_props,
    {
      /**
       * @component @name Headphones
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAxNGgzYTIgMiAwIDAgMSAyIDJ2M2EyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtN2E5IDkgMCAwIDEgMTggMHY3YTIgMiAwIDAgMS0yIDJoLTFhMiAyIDAgMCAxLTItMnYtM2EyIDIgMCAwIDEgMi0yaDMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/headphones
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Card($$renderer, $$props) {
  $$renderer.push(`<div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 md:p-6 shadow-lg shadow-black/40"><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<main class="min-h-screen bg-gradient-to-b from-black via-[#050816] to-black text-white"><div class="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-20 md:px-8"><div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#1DB95422,_transparent_55%),radial-gradient(circle_at_bottom,_#1DB95411,_transparent_55%)]"></div> <header class="mb-10 flex items-center justify-between gap-4"><div class="flex items-center gap-2"><div class="flex h-9 w-9 items-center justify-center rounded-full bg-spotify-green text-lg font-black text-black shadow-lg shadow-spotify-green/40">V</div> <div><div class="text-sm font-semibold tracking-tight">VibeScope</div> <div class="text-xs text-neutral-400">Spotify listening analytics</div></div></div> <div class="flex items-center gap-2 text-xs text-neutral-400"><span class="hidden sm:inline">Powered by Spotify</span> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></header> <section class="grid flex-1 gap-10 items-center md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"><div class="space-y-6"><p class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">Deep Spotify insights, beautifully visualized</p> <h1 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">See your listening <span class="bg-gradient-to-r from-spotify-green to-emerald-300 bg-clip-text text-transparent">patterns</span> come alive.</h1> <p class="max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">VibeScope turns your Spotify history into a living dashboard: cycles, obsessions,
          late‑night loops, and everything in between. No spreadsheets – just clean visuals and
          story‑driven stats.</p> <div class="flex flex-wrap items-center gap-3">`);
    Button($$renderer2, {
      variant: "primary",
      size: "lg",
      children: ($$renderer3) => {
        $$renderer3.push(`<span>Get started with Spotify</span> `);
        Arrow_right($$renderer3, { class: "ml-2 h-4 w-4" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "ghost",
      size: "lg",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Demo my stats`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="flex flex-wrap gap-4 pt-2 text-xs text-neutral-400"><div class="flex items-center gap-2"><div class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">`);
    Headphones($$renderer2, { class: "h-3 w-3" });
    $$renderer2.push(`<!----></div> <span>Safe: read‑only access to your listening data</span></div> <div class="flex items-center gap-2"><div class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">`);
    Chart_column($$renderer2, { class: "h-3 w-3" });
    $$renderer2.push(`<!----></div> <span>No account here – we use your Spotify login</span></div></div></div> <div class="space-y-4">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="mb-3 flex items-center justify-between gap-2 text-xs text-neutral-400"><span class="flex items-center gap-2">`);
        Chart_line($$renderer3, { class: "h-4 w-4 text-spotify-green" });
        $$renderer3.push(`<!----> Listening cycles</span> <span class="rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-neutral-300">Preview</span></div> <div class="space-y-3"><div class="flex items-center justify-between text-xs text-neutral-400"><span>Weekly focus</span> <span class="text-emerald-300">Indie + Synthwave</span></div> <div class="grid gap-2 text-[10px] text-neutral-400"><div class="flex items-center gap-2"><span class="w-16 text-right text-neutral-500">Mon</span> <div class="h-1.5 w-full rounded-full bg-neutral-800"><div class="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div></div></div> <div class="flex items-center gap-2"><span class="w-16 text-right text-neutral-500">Thu</span> <div class="h-1.5 w-full rounded-full bg-neutral-800"><div class="h-full w-5/6 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div></div></div> <div class="flex items-center gap-2"><span class="w-16 text-right text-neutral-500">Sun night</span> <div class="h-1.5 w-full rounded-full bg-neutral-800"><div class="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div></div></div></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="grid gap-3 md:grid-cols-2">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="mb-2 flex items-center justify-between text-xs text-neutral-400"><span>Artists you loop</span> <span class="text-emerald-300">Obsessions</span></div> <div class="space-y-1 text-xs"><div class="flex items-center justify-between"><span>Top 1% listener for</span> <span class="font-medium text-neutral-100">The Midnight</span></div> <div class="flex items-center justify-between text-neutral-400"><span>Last 4 weeks</span> <span>73 plays</span></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="mb-2 flex items-center justify-between text-xs text-neutral-400"><span>Mood blend</span> <span class="text-emerald-300">Energy vs. chill</span></div> <div class="grid grid-cols-3 gap-2 text-[10px] text-neutral-300"><div class="space-y-1"><div class="h-12 rounded-lg bg-gradient-to-b from-emerald-400/80 to-emerald-900/40"></div> <div class="text-xs font-semibold">Energy</div> <div class="text-neutral-500">72%</div></div> <div class="space-y-1"><div class="h-12 rounded-lg bg-gradient-to-b from-sky-400/80 to-sky-900/40"></div> <div class="text-xs font-semibold">Danceability</div> <div class="text-neutral-500">64%</div></div> <div class="space-y-1"><div class="h-12 rounded-lg bg-gradient-to-b from-violet-400/80 to-violet-900/40"></div> <div class="text-xs font-semibold">Acoustic</div> <div class="text-neutral-500">18%</div></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></section></div></main>`);
  });
}
export {
  _page as default
};
