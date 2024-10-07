import { db } from '@/lib/firebaseConfig'
import { Box, Container, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'
import { validate as uuidValidate } from 'uuid'

export type PreviewPageProps = {
    searchParams: {
        paymentId: string
    }
}

export default async function PreviewPage(props: PreviewPageProps) {

    const { searchParams: { paymentId } } = props

    if (!(paymentId && uuidValidate(paymentId))) {
        redirect('/')
    }

    const paymentDocument = await db.collection('payments').doc(paymentId).get()
        , payment = paymentDocument.data()

    if (!(paymentDocument.exists && payment)) {
        redirect('/')
    }

    const responses = Array.from<Record<string, any>>(payment.responses)
        , gifts = Array.from<Record<string, any>>(payment.data)

    // debugger

    return (
        <Fragment>
            <Box as='section' width='full'>
                <Container
                    alignItems='center'
                    backgroundColor='#6B3FA0'
                    display='flex'
                    flexDirection='column'
                    height='1320px'
                    maxWidth='container.lg'
                    paddingX={40}
                    paddingY='175px'>
                    <Text
                        as='h1'
                        color='#ffffff'
                        fontSize='48px'
                        fontWeight='700'
                        marginBottom={2}
                        textAlign='center'>
                        Operação Presente
                    </Text>
                    <Text
                        as='h2'
                        color='#ffffff'
                        fontSize='24px'
                        marginBottom={24}
                        textAlign='center'>
                        A escolha certa para surpreender quem você ama!
                    </Text>
                    <Image alt='Imagem principal' height={380} src='/static/10172549_8307.svg' style={{ marginBottom: '96px' }} width={492} />
                    <Text color='#ffffff' fontSize='18px' lineHeight='1.75' textAlign='center'>
                        Obrigado por escolher a Operação Presente! Sabemos como é importante encontrar o presente perfeito,
                        e é por isso que estamos aqui para ajudar você. Com base nas informações que você forneceu,
                        criamos um dossiê completo de sugestões para surpreender de forma única.
                    </Text>
                </Container>
                {
                    gifts.map((gift, index) => {

                        const backgroundColor = index % 2 === 0 ? '#FFF8E1' : '#512E5F'
                            , textColor = index % 2 === 0 ? '#512E5F' : '#FFF8E1'

                        return (
                            <Container
                                alignItems='center'
                                backgroundColor={backgroundColor}
                                display='flex'
                                flexDirection='column'
                                height='1320px'
                                key={index}
                                maxWidth='container.lg'
                                paddingX={24}
                                paddingY={32}>
                                <Text as='h3' color={textColor} fontSize='36px' fontWeight='700' marginBottom={12}>
                                    {gift.nome_do_presente}
                                </Text>
                                <Text color={textColor} fontSize='24px' fontWeight='500' marginBottom={4} textAlign='center'>
                                    {gift.explicacao}
                                </Text>
                                <Text color={textColor} fontSize='16px' marginBottom={12}>
                                    {gift.dicas}*
                                </Text>
                                <Text color={textColor} fontSize='28px' fontWeight='500' marginBottom={4}>
                                    Experiências Complementares
                                </Text>
                                <UnorderedList>
                                    {
                                        (gift.experiencias_complementares as any[]).map((experienciaComplementar, index) => (
                                            <ListItem color={textColor} fontSize='18px' key={index}>{experienciaComplementar}</ListItem>
                                        ))
                                    }
                                </UnorderedList>
                            </Container>
                        )
                    })
                }
            </Box>
        </Fragment>
    )
}