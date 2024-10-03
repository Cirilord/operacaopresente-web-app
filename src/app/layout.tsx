import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'

export interface RootLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    description: 'Surpreenda a pessoa amada com um presente certeiro, de acordo com os gostos dela. Não tem como dar errado!',
    icons: {
        icon: '/favicon.ico',
    },
    title: 'Operação Presente'
}

export default async function RootLayout(props: RootLayoutProps) {

    const { children } = props

    return (
        <html data-theme='light' lang='en'>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
