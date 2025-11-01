/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // O bloco 'eslint' foi removido para corrigir o aviso

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig