/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'www.ealaami.in' } // redirect www to non-www
        ],
        destination: 'https://ealaami.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'ealaami.in' } // redirect HTTP to HTTPS
        ],
        destination: 'https://ealaami.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
