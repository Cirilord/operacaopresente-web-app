import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
    , __dirname = path.dirname(__filename)

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
    reactStrictMode: false,
    webpack(config) {

        config.resolve.alias = {
            ...config.resolve.alias,
            handlebars: path.resolve(__dirname, 'node_modules', 'handlebars', 'dist', 'handlebars.js')
        }

        return config
    }
}

export default nextConfig