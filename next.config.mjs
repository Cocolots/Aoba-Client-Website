import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 2678400, // 31 days
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|png|ico|gif|jpg|jpeg|webp)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  }
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
