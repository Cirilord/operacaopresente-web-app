import Header from '@/components/Header'
import { db } from '@/lib/firebaseConfig'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import Stripe from 'stripe'
import { validate as uuidValidate } from 'uuid'
import CopyLinkButton from './components/CopyLinkButton'
import DownloadPdfButton from './components/DownloadPdfButton'
import GeneratePdfButton from './components/GeneratePdfButton'

export type SuccessPageProps = {
    searchParams: {
        paymentId: string
    }
}

export const maxDuration = 30

export default async function SuccessPage(props: SuccessPageProps) {

    const { searchParams: { paymentId } } = props

    if (!(paymentId && uuidValidate(paymentId))) {
        return redirect('/')
    }

    const paymentDocument = db.collection('payments').doc(paymentId)
        , paymentDocumentData = await paymentDocument.get()
        , payment = paymentDocumentData.data()

    if (!(paymentDocumentData.exists && payment)) {
        return redirect('/')
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        , session = payment.planType === 'free' ? null : await stripe.checkout.sessions.retrieve(payment.stripeId)

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' minHeight='100vh' paddingTop='72px' width='full'>
                <Container maxWidth='container.lg' paddingY={28}>
                    <Stack alignItems='center' spacing={0}>
                        {
                            payment.planType === 'free' &&
                            <Fragment>
                                <Text
                                    as='h2'
                                    color='#ffffff'
                                    fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                                    fontWeight='700'
                                    textAlign='center'>
                                    {
                                        payment.pdfUrl
                                            ? 'Dossiê Gerado com Sucesso!'
                                            : 'Perguntas respondidas com Sucesso!'
                                    }
                                </Text>
                                <Text
                                    color='#ffffff'
                                    fontSize={{ base: '14px', lg: '16px' }}
                                    lineHeight='1.75'
                                    marginTop={4}
                                    maxWidth='900px'
                                    textAlign='center'>
                                    Obrigado!<Box as='br' />
                                    {
                                        payment.pdfUrl
                                            ? 'Seu dossiê personalizado de presentes está pronto para download.'
                                            : 'Clique no botão abaixo para gerar seu dossiê.'
                                    }
                                </Text>
                                {
                                    !payment.pdfUrl &&
                                    <GeneratePdfButton paymentId={paymentId} />
                                }
                                {
                                    payment.pdfUrl &&
                                    <DownloadPdfButton pdfUrl={payment.pdfUrl} />
                                }
                            </Fragment>
                        }
                        {
                            session?.payment_status === 'paid' &&
                            <Fragment>
                                <Text
                                    as='h2'
                                    color='#ffffff'
                                    fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                                    fontWeight='700'
                                    textAlign='center'>
                                    {
                                        payment.pdfUrl
                                            ? 'Dossiê Gerado com Sucesso!'
                                            : 'Pagamento realizado com Sucesso!'
                                    }
                                </Text>
                                <Text
                                    color='#ffffff'
                                    fontSize={{ base: '14px', lg: '16px' }}
                                    lineHeight='1.75'
                                    marginTop={4}
                                    maxWidth='900px'
                                    textAlign='center'>
                                    Obrigado, {session.customer_details?.name}! Seu pagamento de R$ {(session.amount_total || 0) / 100} foi
                                    confirmado com sucesso.{' '}
                                    <Box as='br' display={{ base: 'none', md: 'unset' }} />
                                    {
                                        payment.pdfUrl
                                            ? 'Seu dossiê personalizado de presentes está pronto para download.'
                                            : 'Clique no botão abaixo para gerar seu dossiê.'
                                    }
                                </Text>
                                {
                                    !payment.pdfUrl &&
                                    <GeneratePdfButton paymentId={paymentId} />
                                }
                                {
                                    payment.pdfUrl &&
                                    <DownloadPdfButton pdfUrl={payment.pdfUrl} />
                                }
                            </Fragment>
                        }
                        {
                            session?.payment_status === 'unpaid' &&
                            <Fragment>
                                <Text
                                    as='h2'
                                    color='#ffffff'
                                    fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                                    fontWeight='700'
                                    textAlign='center'>
                                    Aguardando Pagamento!
                                </Text>
                                <Text
                                    color='#ffffff'
                                    fontSize={{ base: '14px', lg: '16px' }}
                                    lineHeight='1.75'
                                    marginTop={4}
                                    maxWidth='900px'
                                    textAlign='center'>
                                    Obrigado, {session.customer_details?.name}! Recebemos sua solicitação de pagamento no valor de R$ {(session.amount_total || 0) / 100}.
                                    Assim que o pagamento for confirmado, o seu dossiê será gerado e você
                                    poderá baixá-lo no link atual. Isso pode levar até 2 dias úteis.
                                </Text>
                                <CopyLinkButton />
                            </Fragment>

                        }
                    </Stack>
                </Container>
            </Box>
        </Fragment>
    )
}