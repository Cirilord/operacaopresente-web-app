'use client'
import theme from '@/utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface ProvidersProps {
    children: React.ReactNode
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
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </QueryClientProvider>
    )
}