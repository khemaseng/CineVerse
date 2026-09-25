// import type { NextConfig } from "next";
// import { hostname } from "os";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'fakestoreapi.com',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
