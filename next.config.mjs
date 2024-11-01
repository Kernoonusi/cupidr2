/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      { protocol: "https", hostname: "www.dropbox.com", port: "" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com", port: "" },
    ],
  },
};

export default nextConfig;
