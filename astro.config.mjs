import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://nf-neuro.scilus.github.io",
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
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
      [ 
        rehypeAstroRelativeMarkdownLinks,
        {
          base: "/",
        },
       ],
    ],
    prefetch: true,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      gfm: true,
    }),
  ],
  content: {
    collections: {
      docs: {} // Define docs collection
    }
  }
});
