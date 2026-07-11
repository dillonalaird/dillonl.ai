/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },

  // Hide the dev-mode static-route indicator badge (bottom-left)
  devIndicators: { appIsrStatus: false },
 
  // Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // (the static host doesn't resolve extensionless URLs to .html files)
  trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig
