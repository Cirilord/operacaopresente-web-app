/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'placehold.jp',
                port: '',
                protocol: 'https'
            }
        ]
    },
    reactStrictMode: false
}

export default nextConfig