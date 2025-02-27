import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon"


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
    icon({
      svgoOptions: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                // customize default plugin options
                inlineStyles: {
                  onlyMatchedOnce: false,
                },
                // or disable plugins
                removeDoctype: false,
              }
            }
          }
        ]
      }
    })
  ],
  content: {
    collections: {
      docs: {} // Define docs collection
    }
  }
});
