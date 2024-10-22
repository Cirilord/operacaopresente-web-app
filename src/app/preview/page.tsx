import brazilianFormat from '@/lib/brazilianFormat'
import { db } from '@/lib/firebaseConfig'
import { Box, Container, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import slugify from 'slugify'
import { validate as uuidValidate } from 'uuid'

export type PreviewPageProps = {
    searchParams: {
        paymentId: string
    }
}

export default async function PreviewPage(props: PreviewPageProps) {

    const { searchParams: { paymentId } } = props

    if (!(paymentId && uuidValidate(paymentId))) {
        return redirect('/')
    }

    const paymentDocument = await db.collection('payments').doc(paymentId).get()
        , payment = paymentDocument.data()

    if (!(paymentDocument.exists && payment)) {
        return redirect('/')
    }

    const responses = Array.from<Record<string, any>>(payment.responses)
        , gifts = Array.from<Record<string, any>>(payment.data)

    const giftType = {
        'Objeto': (search: string, price: number) => {

            const searchSlugfied = slugify(search, { lower: true })

            return [
                {
                    link: `https://www.amazon.com.br/s?k=${search}&high-price=${parseInt(`${price}`)}`,
                    name: 'Amazon'
                },
                {
                    link: `https://www.americanas.com.br/busca/${searchSlugfied}`,
                    name: 'Americanas'
                },
                {
                    link: `https://www.magazineluiza.com.br/busca/${searchSlugfied}/?filters=price---${parseInt(`${price * 100}`)}:${parseInt(`${(price * 100) + 1}`)}`,
                    name: 'Magazine Luiza'
                },
                {
                    link: `https://lista.mercadolivre.com.br/${searchSlugfied}_PriceRange_${parseInt(`${price}`)}-${parseInt(`${price + 1}`)}_NoIndex_True`,
                    name: 'Mercado Livre'
                },
                {
                    link: `https://lista.mercadolivre.com.br/${searchSlugfied}_PriceRange_${parseInt(`${price}`)}-${parseInt(`${price + 1}`)}_NoIndex_True`,
                    name: 'Submarino'
                }
            ]
        },
        'Curso': (search: string) => [
            {
                link: `https://www.alura.com.br/busca?query=${search}`,
                name: 'Alura'
            },
            {
                link: `https://www.coursera.org/search?query=${search}`,
                name: 'Coursera'
            },
            {
                link: `https://www.domestika.org/pt/courses/search/${search}`,
                name: 'Domestika'
            },
            {
                link: `https://www.edx.org/search?q=${search}`,
                name: 'Edx'
            },
            {
                link: `https://www.udemy.com/courses/search/?lang=pt&q=${search}&sort=relevance`,
                name: 'Udemy'
            }
        ],
        // 'Viagem': [

        // ],
        // 'Experiência': [

        // ],
        // 'Assinatura': [

        // ],
        // 'Personalização': [

        // ]
    }

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
                <Container
                    alignItems='center'
                    backgroundColor='#FFF8E1'
                    display='flex'
                    flexDirection='column'
                    height='1320px'
                    maxWidth='container.lg'
                    paddingX={24}
                    paddingY={32}>
                    <Text as='h3' color='#512E5F' fontSize='36px' fontWeight='700' marginBottom={12}>
                        Perguntas
                    </Text>
                    <UnorderedList margin={0} styleType='none' width='full'>
                        {
                            responses.map(({ answer, question }, index) => (
                                <ListItem _notLast={{ marginBottom: 2 }} color='#512E5F' fontSize='18px' key={index}>
                                    <Text as='h4' fontSize='24px' fontWeight='600'>{question}</Text>
                                    <Text fontSize='16px' fontWeight='500'>R: {answer}</Text>
                                </ListItem>
                            ))
                        }
                    </UnorderedList>
                </Container>
                {
                    gifts.map((gift, index) => {

                        const backgroundColor = index % 2 === 0 ? '#512E5F' : '#FFF8E1'
                            , textColor = index % 2 === 0 ? '#FFF8E1' : '#512E5F'

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
                                <Text color={textColor} fontSize='28px' fontWeight='500' marginBottom={4} width='full'>
                                    Preço Estimado
                                </Text>
                                <Text color={textColor} fontSize='18px' marginBottom={8} width='full'>
                                    {brazilianFormat(gift.preco_estimado as number)}
                                </Text>
                                <Text color={textColor} fontSize='28px' fontWeight='500' marginBottom={4} width='full'>
                                    Recomendação
                                </Text>
                                <Text color={textColor} fontSize='18px' marginBottom={8} width='full'>
                                    {gift.recomendacao}
                                </Text>
                                <Text color={textColor} fontSize='28px' fontWeight='500' marginBottom={4} width='full'>
                                    Itens Específicos
                                </Text>
                                <UnorderedList marginBottom={8} width='full'>
                                    {
                                        (gift.exemplos_de_categorias as any[]).map((exemploCategoria, index) => (
                                            <ListItem color={textColor} fontSize='18px' key={index}>{exemploCategoria}</ListItem>
                                        ))
                                    }
                                </UnorderedList>
                                <Text color={textColor} fontSize='28px' fontWeight='500' marginBottom={4} width='full'>
                                    Experiências Complementares
                                </Text>
                                <UnorderedList marginBottom={8} width='full'>
                                    {
                                        (gift.experiencias_complementares as any[]).map((experienciaComplementar, index) => (
                                            <ListItem color={textColor} fontSize='18px' key={index}>{experienciaComplementar}</ListItem>
                                        ))
                                    }
                                </UnorderedList>
                                {
                                    giftType[gift.tipo_do_presente as keyof typeof giftType] &&
                                    <Fragment>
                                        <Text color={textColor} fontSize='28px' fontWeight='500' width='full'>
                                            Links
                                        </Text>
                                        <Text color={textColor} fontSize='14px' fontStyle='italic' fontWeight='500' marginBottom={4} width='full'>
                                            Os links abaixo incluem alguns que já estão filtrados pelo preço estimado.*
                                        </Text>
                                        <UnorderedList width='full'>
                                            {
                                                (giftType[gift.tipo_do_presente as keyof typeof giftType])(Array.from(gift.keywords).join(' '), gift.preco_estimado)
                                                    .map(({ link, name }, index) => (
                                                        <ListItem color={textColor} fontSize='18px' key={index}>
                                                            <Link href={encodeURI(link)} target='_blank'>{name}</Link>
                                                        </ListItem>
                                                    ))
                                            }
                                        </UnorderedList>
                                    </Fragment>
                                }
                            </Container>
                        )
                    })
                }
            </Box>
        </Fragment>
    )
}