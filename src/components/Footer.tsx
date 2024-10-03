import { Box, Container, Text } from '@chakra-ui/react'
import Link from 'next/link'

export type FooterProps = object

export default function Footer(props: FooterProps) {

    const { } = props

    return (
        <Box as='section' backgroundColor='#6B3FA0' id='encontre-o-presente-ideal' width='full'>
            <Container display='flex' justifyContent='center' maxWidth='container.xl' paddingY={4}>
                {/* <Text as='span' color='#ffffff' fontSize='sm'>
                    Copyright{' '}©{' '}{(new Date).getFullYear()}
                </Text> */}
                <Text as='span' color='#ffffff' fontSize='sm'>
                    <Link href='/termos-de-uso' target='_blank'>
                        Termos de uso
                    </Link>
                    <Text as='span'>
                        {' '}•{' '}
                    </Text>
                    <Link href='/politica-de-privacidade' target='_blank'>
                        Política de privacidade
                    </Link>
                </Text>
            </Container>
        </Box>
    )
}