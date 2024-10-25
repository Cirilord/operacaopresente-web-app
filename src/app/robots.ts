import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {

    const baseUrl = 'https://www.operacaopresente.com'

    return {
        rules: {
            allow: '/',
            disallow: [
                '/preview/',
                '/sucesso/'
            ],
            userAgent: '*'
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}