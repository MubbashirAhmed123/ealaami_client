/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // redirect www to non-www (preserves protocol and path)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ealaami.in' }],
        destination: 'https://ealaami.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
