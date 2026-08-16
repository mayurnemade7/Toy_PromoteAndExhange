/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@toy-exchange/types', '@toy-exchange/ui', '@toy-exchange/firebase-client'],
};
export default nextConfig;
