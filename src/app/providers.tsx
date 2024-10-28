'use client'
import theme from '@/utils/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export type ProvidersProps = {
    children: ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Infinity
        }
    }
})

export function Providers(props: ProvidersProps) {

    const { children } = props

    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider>
                <ChakraProvider theme={theme}>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </QueryClientProvider>
    )
}