import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'
import Script from 'next/script'

export interface RootLayoutProps {
    children: ReactNode
}

const description = 'Surpreenda a pessoa amada com um presente certeiro, de acordo com os gostos dela. Não tem como dar errado!'
    , imageCard = '/static/card.png'
    , title = 'Operação Presente'

export const metadata: Metadata = {
    description,
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        images: [imageCard],
        description,
        title,
        type: 'website'
    },
    title,
    twitter: {
        card: 'summary_large_image',
        description,
        images: [imageCard],
        title
    }
}

export default async function RootLayout(props: RootLayoutProps) {

    const { children } = props

    return (
        <html data-theme='light' lang='en'>
            <head>
                <Script async src='https://www.googletagmanager.com/gtag/js?id=G-B4EEC39G7S' />
                <Script id='google-analytics'>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-B4EEC39G7S');
                    `}
                </Script>
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
