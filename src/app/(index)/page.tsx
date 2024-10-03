'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import faq from '@/data/faq.json'
import questions from '@/data/questions.json'
import { Image } from '@chakra-ui/next-js'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Center,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    HStack,
    Icon,
    Input,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import Link from 'next/link'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TbChecklist, TbFileDescription, TbHeartFilled, TbPigMoney } from 'react-icons/tb'
import { generatePdf } from './actions'
// import { loadStripe } from '@stripe/stripe-js'

export default function HomePage() {

    const formMethods = useForm({ defaultValues: { responses: [] as { answer: string | string[], question: string }[] } })

    const onSubmit = formMethods.handleSubmit(async values => {
        try {

            // const response =
            await generatePdf(values.responses)

            // if (response.success) {

            //     const uint8Array = new Uint8Array(response.data.output)
            //         , blob = new Blob([uint8Array], { type: 'application/pdf' })

            //     saveAs(blob, 'test.pdf')
            // }
        }
        catch (error) {

            console.log(error)
        }
    })

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' paddingTop='72px' width='full'>
                <Container maxWidth='container.lg' paddingY={28}>
                    <HStack justifyContent='center' spacing={0}>
                        <VStack alignItems='self-start' maxWidth='500px'>
                            <Text
                                as='h1'
                                color='#ffffff'
                                fontSize='48px'
                                fontWeight='700'
                                letterSpacing='1px'>
                                Operação Presente
                            </Text>
                            <Text color='#ffffff' letterSpacing='1.5px'>
                                Surpreenda a pessoa amada com um presente certeiro, de acordo com os gostos dela. Não tem como dar errado!
                            </Text>
                            <Link href='#encontre-o-presente-ideal' passHref>
                                <Button
                                    _active={{
                                        backgroundColor: '#ff5959'
                                    }}
                                    _hover={{
                                        boxShadow: 'lg',
                                        transform: 'scale(1.05)'
                                    }}
                                    backgroundColor='#FF6B6B'
                                    borderRadius='64px'
                                    color='#ffffff'
                                    height={14}
                                    marginTop={16}
                                    marginRight='auto'
                                    minWidth='300px'
                                    transition='background-color 0.2s, transform 0.2s'>
                                    Encontre o Presente Ideal
                                </Button>
                            </Link>
                        </VStack>
                        <Image alt='Imagem principal' height={380} src='/static/10172549_8307.svg' width={492} />
                    </HStack>
                </Container>
            </Box>
            <Box as='section' backgroundColor='#FFF8E1' id='conheça' width='full'>
                <Container maxWidth='container.lg' paddingY={[12, 20, 28]}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h2'
                            color='#512E5F'
                            fontSize={['36px', '48px', '56px']}
                            fontWeight='700'>
                            Como acertar no presente?
                        </Text>
                        <Text color='#512E5F' fontSize='16px' lineHeight='1.75' marginTop={4} maxWidth='900px' textAlign='center'>
                            Já passou por aquele momento em que você precisa escolher um presente para quem ama e não sabe o que dar?
                            Mesmo conhecendo/sabendo tudo (ou muitas coisas) sobre aquela pessoa, é difícil acertar e surpreender.
                            Então chegou o momento de você acertar no presente! No Operação Presente, você irá responder algumas
                            perguntas e pronto, um dossiê completo com ideias e sugestões de presentes com base naquilo que a
                            pessoa gosta. Chega de errar nos presente!
                        </Text>
                        <Grid gap={4} marginTop={10} templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} maxWidth='1100px'>
                            <Box
                                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                                backgroundColor='#6b3fa0'
                                borderRadius='md'
                                boxShadow='md'
                                color='#ffffff'
                                paddingX={4}
                                paddingY={6}
                                userSelect='none'
                                textAlign='center'
                                transition='all 0.2s ease'>
                                <Icon as={TbFileDescription} color='#ffffff' boxSize={12} marginBottom={4} />
                                <Text color='#ffffff' fontSize='15px' fontWeight='bold'>Responda as perguntas</Text>
                                <Text color='#e0e0e0' fontSize='13px'>Preencha nosso formulário simples e rápido.</Text>
                            </Box>
                            <Box
                                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                                backgroundColor='#6b3fa0'
                                borderRadius='md'
                                boxShadow='md'
                                color='#ffffff'
                                paddingX={4}
                                paddingY={6}
                                userSelect='none'
                                textAlign='center'
                                transition='all 0.2s ease'>
                                <Icon as={TbPigMoney} color='#ffffff' boxSize={12} marginBottom={4} />
                                <Text color='#ffffff' fontSize='15px' fontWeight='bold'>Escolha um método de pagamento</Text>
                                <Text color='#e0e0e0' fontSize='13px'>Pagamento rápido e seguro.</Text>
                            </Box>
                            <Box
                                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                                backgroundColor='#6b3fa0'
                                borderRadius='md'
                                boxShadow='md'
                                color='#ffffff'
                                paddingX={4}
                                paddingY={6}
                                userSelect='none'
                                textAlign='center'
                                transition='all 0.2s ease'>
                                <Icon as={TbChecklist} color='#ffffff' boxSize={12} marginBottom={4} />
                                <Text color='#ffffff' fontSize='15px' fontWeight='bold'>Receba o dossiê</Text>
                                <Text color='#e0e0e0' fontSize='13px'>Receba todas as sugestões no seu e-mail.</Text>
                            </Box>
                            <Box
                                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                                backgroundColor='#6b3fa0'
                                borderRadius='md'
                                boxShadow='md'
                                color='#ffffff'
                                paddingX={4}
                                paddingY={6}
                                userSelect='none'
                                textAlign='center'
                                transition='all 0.2s ease'>
                                <Icon as={TbHeartFilled} color='#ffffff' boxSize={12} marginBottom={4} />
                                <Text color='#ffffff' fontSize='15px' fontWeight='bold'>Surpreenda quem você ama</Text>
                                <Text color='#e0e0e0' fontSize='13px'>Escolha o presente perfeito e faça o dia especial!</Text>
                            </Box>
                        </Grid>
                        <Link href='#encontre-o-presente-ideal' passHref>
                            <Button
                                _active={{
                                    backgroundColor: '#ff5959'
                                }}
                                _hover={{
                                    boxShadow: 'lg',
                                    transform: 'scale(1.05)'
                                }}
                                backgroundColor='#FF6B6B'
                                borderRadius='64px'
                                color='#ffffff'
                                height={14}
                                marginTop={16}
                                minWidth='300px'
                                transition='background-color 0.2s, transform 0.2s'>
                                Encontre o Presente Ideal
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Box>
            <Box as='section' backgroundColor='#6B3FA0' id='encontre-o-presente-ideal' width='full'>
                <Container maxWidth='container.lg' paddingY={[12, 20, 28]}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h2'
                            color='#ffffff'
                            fontSize={['36px', '48px', '56px']}
                            fontWeight='700'>
                            Encontre o presente ideal
                        </Text>
                        <Text color='#ffffff' fontSize='16px' lineHeight='1.75' marginTop={4} textAlign='center'>
                            Responda as perguntas de acordo com a pessoa que irá receber o presente.
                            Seja bem detalhado e nos conte tudo o que souber.
                        </Text>
                        <Tabs
                            as='form'
                            backgroundColor='#ffffff'
                            borderRadius='15px'
                            boxShadow='lg'
                            defaultIndex={1}
                            isFitted={true}
                            isLazy={true}
                            marginTop={10}
                            variant='unstyled'
                            width='550px'
                            onSubmit={onSubmit}>
                            <TabList
                                backgroundColor='#FF6B6B'
                                borderTopRightRadius='15px'
                                borderTopLeftRadius='15px'
                                color='#ffffff'
                                position='relative'>
                                <Tab padding={4}>
                                    <Text as='span' fontWeight='600'>
                                        Grátis
                                    </Text>
                                </Tab>
                                <Tab
                                    _before={{
                                        backgroundColor: '#FFF8E1',
                                        borderRadius: '15px',
                                        content: '""',
                                        height: 'calc(100% - 10px)',
                                        left: '-1px',
                                        margin: '5px 0',
                                        position: 'absolute',
                                        width: '3px'
                                    }}
                                    padding={4}
                                    position='relative'>
                                    <Text as='span' fontWeight='600'>
                                        Simples
                                    </Text>
                                </Tab>
                                <Tab
                                    _before={{
                                        backgroundColor: '#FFF8E1',
                                        borderRadius: '15px',
                                        content: '""',
                                        height: 'calc(100% - 10px)',
                                        left: '-1px',
                                        margin: '5px 0',
                                        position: 'absolute',
                                        width: '3px'
                                    }}
                                    padding={4}
                                    position='relative'>
                                    <Text as='span' fontWeight='600'>
                                        Avançado
                                    </Text>
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel padding={6} paddingBottom={0}>
                                </TabPanel>
                                <TabPanel padding={6} paddingBottom={0}>
                                    <Stack>
                                        {
                                            questions.simple.map(({ hint, id, isMulti, label, maxLength, options, placeholder, type }, index) => (
                                                <FormControl key={id}>
                                                    <FormLabel marginBottom={1}>{label}</FormLabel>
                                                    <FormHelperText fontSize='smaller' marginTop={1}>{hint}</FormHelperText>
                                                    <Input type='hidden' {...formMethods.register(`responses.${index}.question`, { value: label })} />
                                                    {
                                                        type === 'input' &&
                                                        <Input
                                                            maxLength={maxLength}
                                                            placeholder={placeholder}
                                                            {...formMethods.register(`responses.${index}.answer`)}
                                                        />
                                                    }
                                                    {
                                                        type === 'select' &&
                                                        <Controller
                                                            control={formMethods.control}
                                                            defaultValue={isMulti ? [] : ''}
                                                            name={`responses.${index}.answer`}
                                                            render={({ field }) => (
                                                                <Select
                                                                    isMulti={isMulti}
                                                                    options={options}
                                                                    placeholder={placeholder}
                                                                    useBasicStyles={true}
                                                                    {...field}
                                                                    value={
                                                                        isMulti
                                                                            ? options.filter(c => field.value?.includes(c.value))
                                                                            : options.find(c => c.value === field.value)
                                                                    }
                                                                    // eslint-disable-next-line
                                                                    // @ts-ignore
                                                                    onChange={val => field.onChange(Array.isArray(val) ? val.map(c => c.value) : val?.value)}
                                                                />
                                                            )}
                                                        />
                                                    }
                                                </FormControl>
                                            ))
                                        }
                                    </Stack>
                                </TabPanel>
                                <TabPanel padding={6} paddingBottom={0}>
                                </TabPanel>
                                {/* <TabPanel padding={6} paddingBottom={0}>
                                    <Stack>
                                        {
                                            questions.advanced.map(({ hint, id, label, options, placeholder, type }, index) => (
                                                <FormControl key={id}>
                                                    <FormLabel marginBottom={1}>{label}</FormLabel>
                                                    <FormHelperText fontSize='smaller' marginTop={1}>{hint}</FormHelperText>
                                                    <Input type='hidden' {...formMethods.register(`responses.${index}.question`, { value: label })} />
                                                    {
                                                        type === 'input' &&
                                                        <Input
                                                            placeholder={placeholder}
                                                            {...formMethods.register(`responses.${index}.answer`)}
                                                        />
                                                    }
                                                    {
                                                        type === 'select' &&
                                                        <Select options={options} placeholder={placeholder} useBasicStyles={true} />
                                                    }
                                                </FormControl>
                                            ))
                                        }
                                    </Stack>
                                </TabPanel> */}
                            </TabPanels>
                            <Center margin='20px 0'>
                                <Button
                                    _active={{
                                        backgroundColor: '#ff5959'
                                    }}
                                    _hover={{
                                        boxShadow: 'lg',
                                        transform: 'scale(1.05)'
                                    }}
                                    backgroundColor='#FF6B6B'
                                    borderRadius='64px'
                                    color='#ffffff'
                                    height={14}
                                    isLoading={formMethods.formState.isSubmitting}
                                    minWidth='300px'
                                    transition='background-color 0.2s, transform 0.2s'
                                    type='submit'>
                                    Encontre o Presente Ideal
                                </Button>
                            </Center>
                        </Tabs>
                    </Stack>
                </Container>
            </Box>
            <Box as='section' backgroundColor='#FFF8E1' id='faq' width='full'>
                <Container maxWidth='container.lg' paddingY={[12, 20, 28]}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h2'
                            color='#512E5F'
                            fontSize={['36px', '48px', '56px']}
                            fontWeight='700'>
                            FAQ
                        </Text>
                        <Text color='#512E5F' fontSize='16px' lineHeight='1.75' marginTop={4} maxWidth='900px' textAlign='center'>
                            Aqui estão as respostas para algumas das perguntas mais comuns que recebemos.<br />
                            Se você não encontrar o que procura, fique à vontade para entrar em contato conosco!
                        </Text>
                        <Accordion as={Stack} allowToggle={true} marginTop={10} spacing={4} width='700px'>
                            {
                                faq.map(({ answer, question }) => (
                                    <AccordionItem key={question} backgroundColor='#ffffff' borderRadius='10px' border={0}>
                                        {({ isExpanded }) => (
                                            <Fragment>
                                                <AccordionButton
                                                    _hover={{ backgroundColor: '#512E5F' }}
                                                    backgroundColor='#6b3fa0'
                                                    borderRadius={isExpanded ? undefined : '10px'}
                                                    borderTopRadius={isExpanded ? '10px' : undefined}
                                                    color='#ffffff'>
                                                    <Box as='span' flex='1' textAlign='left'>
                                                        {question}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel padding={4}>
                                                    {answer}
                                                </AccordionPanel>
                                            </Fragment>
                                        )}
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Fragment>
    )
}