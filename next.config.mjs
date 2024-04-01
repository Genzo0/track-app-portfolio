/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.genzoproject.my.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
