import "clsx";
import { I as Icon, B as Button } from "../../../chunks/button.js";
import { a0 as sanitize_props, a1 as spread_props, s as slot } from "../../../chunks/index.js";
function Arrow_left($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTIgMTktNy03IDctNyIgLz4KICA8cGF0aCBkPSJNMTkgMTJINSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/arrow-left
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<main class="min-h-screen bg-gradient-to-b from-black via-[#050816] to-black text-white"><div class="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 md:px-8"><div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#1DB95422,_transparent_55%),radial-gradient(circle_at_bottom_right,_#1DB95411,_transparent_55%)]"></div> <header class="mb-6 flex items-center justify-between gap-3"><div class="flex items-center gap-3"><button class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-300 hover:bg-white/10">`);
    Arrow_left($$renderer2, { class: "h-4 w-4" });
    $$renderer2.push(`<!----></button> <div><div class="text-xs uppercase tracking-[0.16em] text-spotify-green">VibeScope</div> <div class="text-sm font-semibold tracking-tight">Your Spotify story</div></div></div> <div class="flex items-center gap-3 text-xs text-neutral-300">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Button($$renderer2, {
      variant: "ghost",
      size: "sm",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Log out`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></header> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-1 items-center justify-center text-sm text-neutral-400"><div class="flex items-center gap-2"><div class="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-white"></div> <span>Pulling your Spotify stats…</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></main>`);
  });
}
export {
  _page as default
};
