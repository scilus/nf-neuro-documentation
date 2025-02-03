import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";


const rehypePlugins = [
  [  rehypeExternalLinks,
    {
      target: "_blank",
    },
  ]
];

// https://astro.build/config
export default defineConfig({
  site: "https://scilus.github.io",
  base: "/nf-neuro",
  markdown: {
    smartypants: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      // theme: "catppuccin-mocha",
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-macchiato",
      },
    },
    rehypePlugins: rehypePlugins,
    prefetch: true,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      rehypePlugins: rehypePlugins,
      gfm: true,
    }),
  ],
  content: {
    collections: {
      docs: {} // Define docs collection
    }
  }
});
