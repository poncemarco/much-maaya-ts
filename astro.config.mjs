import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://muuch-maaya.com',
  integrations: [tailwind(), react(), sitemap()],
  output: 'hybrid',
  adapter: vercel(),
  redirects: {
    '/old-page': '/new-page'
  }
});