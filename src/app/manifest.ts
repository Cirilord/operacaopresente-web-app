import type { MetadataRoute } from 'next'
import { metadata } from './layout'

export default function manifest(): MetadataRoute.Manifest {
    return {
        background_color: '#FFF8E1',
        description: metadata.description || '',
        display: 'standalone',
        icons: [
            {
                sizes: 'any',
                src: '/favicon.ico',
                type: 'image/x-icon'
            }
        ],
        name: metadata.title?.toString() || '',
        short_name: metadata.title?.toString() || '',
        start_url: '/',
        theme_color: '#6b3fa0'
    }
}