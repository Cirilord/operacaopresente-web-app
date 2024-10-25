import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {

    const baseUrl = 'https://www.operacaopresente.com'

    return [
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 1,
            url: baseUrl
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.8,
            url: `${baseUrl}/#conheça`
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.8,
            url: `${baseUrl}/#faq`
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.6,
            url: `${baseUrl}/termos-de-uso`
        },
        {
            changeFrequency: 'monthly',
            lastModified: new Date(),
            priority: 0.6,
            url: `${baseUrl}/politica-de-privacidade`
        }
    ]
}