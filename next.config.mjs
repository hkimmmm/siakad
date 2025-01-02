/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Domain Cloudinary
        pathname: '/**' // Izinkan semua path dari domain Cloudinary
      }
    ]
  }
};

export default nextConfig;
