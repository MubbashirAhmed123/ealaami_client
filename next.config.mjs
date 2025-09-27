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
      // Redirect http to https (if needed)
      {
        source: '/:path*',
        has: [{ type: 'protocol', value: 'http' }],
        destination: 'https://www.ealaami.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
