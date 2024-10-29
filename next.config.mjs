/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.dropbox.com", "dl.dropboxusercontent.com"],
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
    ],
  },
};

export default nextConfig;
