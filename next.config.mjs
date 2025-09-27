/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ealaami.in' }],
        destination: 'https://www.ealaami.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
