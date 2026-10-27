/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/privacidad', destination: '/privacidad-candidatos', permanent: true }]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
