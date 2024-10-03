import Header from '@/components/Header'
import { db } from '@/lib/firebaseConfig'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import Stripe from 'stripe'
import { validate as uuidValidate } from 'uuid'
import CopyLinkButton from './components/CopyLinkButton'
import DownloadPdfButton from './components/DownloadPdfButton'

export type SuccessPageProps = {
    searchParams: {
        paymentId: string
    }
}

export default async function SuccessPage(props: SuccessPageProps) {

    const { searchParams: { paymentId } } = props

    if (!(paymentId && uuidValidate(paymentId))) {
        redirect('/')
    }

    const paymentDocument = await db.collection('payments').doc(paymentId).get()
        , payment = paymentDocument.data()

    if (!(paymentDocument.exists && payment)) {
        redirect('/')
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        , session = await stripe.checkout.sessions.retrieve(payment.stripeId)

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' minHeight='100vh' paddingTop='72px' width='full'>
                <Container maxWidth='container.lg' paddingY={28}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h2'
                            color='#ffffff'
                            fontSize={['36px', '48px', '56px']}
                            fontWeight='700'>
                            Dossiê Gerado com Sucesso!
                        </Text>
                        {
                            session.payment_status === 'paid' &&
                            <Fragment>
                                <Text color='#ffffff' fontSize='16px' lineHeight='1.75' marginTop={4} maxWidth='900px' textAlign='center'>
                                    Obrigado, {session.customer_details?.name}! Seu pagamento de R$ {(session.amount_total || 0) / 100} foi
                                    confirmado com sucesso. Seu dossiê personalizado de presentes está pronto para download.
                                </Text>
                                <DownloadPdfButton pdfLink={payment.pdfLink} />
                            </Fragment>
                        }
                        {

                            session.payment_status === 'unpaid' &&
                            <Fragment>
                                <Text color='#ffffff' fontSize='16px' lineHeight='1.75' marginTop={4} maxWidth='900px' textAlign='center'>
                                    Obrigado, {session.customer_details?.name}! Recebemos sua solicitação de pagamento no valor de R$ {(session.amount_total || 0) / 100}.
                                    Assim que o pagamento for confirmado, o seu dossiê será gerado e você
                                    poderá baixá-lo no link atual. Isso pode levar até 2 dias úteis.
                                </Text>
                                <CopyLinkButton />
                            </Fragment>

                        }
                    </Stack>
                    <Stack>
                        <pre>
                            {JSON.stringify(payment, null, 4)}
                        </pre>
                        <pre>
                            {JSON.stringify(session, null, 4)}
                        </pre>
                    </Stack>
                </Container>
            </Box>
        </Fragment>
    )
}