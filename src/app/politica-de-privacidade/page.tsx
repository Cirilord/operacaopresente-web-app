import Footer from '@/components/Footer'
import Header from '@/components/Header'
import privacyPolicy from '@/data/privacy-policy.json'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { Fragment } from 'react'

export type PrivacyPolicyPageProps = object

export default async function PrivacyPolicyPage(props: PrivacyPolicyPageProps) {

    const { } = props

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' minHeight='100vh' paddingTop='72px' width='full'>
                <Container maxWidth='container.md' paddingBottom={28} paddingTop={{ base: 14, sm: 20 }}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h1'
                            color='#ffffff'
                            fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                            fontWeight='700'
                            marginBottom={{ base: 14, sm: 20 }}>
                            Política de Privacidade
                        </Text>
                        <Text
                            as='span'
                            color='#ffffff'
                            fontSize={{ base: '14px', lg: '16px' }}
                            fontWeight='500'
                            lineHeight='1.75'
                            marginBottom={6}
                            width='full'>
                            Última atualização: 07 de setembro de 2024
                        </Text>
                        <Stack spacing={8}>
                            {
                                privacyPolicy.map((privacyPolicy, index) => (
                                    <Stack key={privacyPolicy.title} spacing={0}>
                                        <Text
                                            as='span'
                                            color='#ffffff'
                                            fontSize={{ base: '14px', lg: '16px' }}
                                            fontWeight='700'
                                            lineHeight='1.75'>
                                            {index + 1}. {privacyPolicy.title}
                                        </Text>
                                        <Text
                                            color='#ffffff'
                                            fontSize={{ base: '14px', lg: '16px' }}
                                            fontWeight='500'
                                            lineHeight='1.75'>
                                            {privacyPolicy.content}
                                        </Text>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Fragment>
    )
}