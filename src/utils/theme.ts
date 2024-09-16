import { extendTheme } from '@chakra-ui/react'
import { Open_Sans } from 'next/font/google'

const nextFont = Open_Sans({
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