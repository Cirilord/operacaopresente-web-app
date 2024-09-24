import { extendTheme } from '@chakra-ui/react'
import { Montserrat } from 'next/font/google'

const nextFont = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800']
})

export default extendTheme({
    fonts: {
        body: `${nextFont.style.fontFamily}, sans-serif`,
        heading: `${nextFont.style.fontFamily}, sans-serif`
    },
    initialColorMode: 'light',
    useSystemColorMode: false
})