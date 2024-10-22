'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import faq from '@/data/faq.json'
import plans from '@/data/plans.json'
import brazilianFormat from '@/lib/brazilianFormat'
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
    Tabs,
    Text,
    useToast,
    UseToastOptions,
    VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatableSelect, Select } from 'chakra-react-select'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TbChecklist, TbFileDescription, TbHeartFilled, TbPigMoney } from 'react-icons/tb'
import { generatePayment } from './actions'
import { PlanSchema } from './schemas'
import { Plan } from './types'

export default function HomePage() {

    const [isLocked, setIsLocked] = useState(true)
        , [planIndex, setPlanIndex] = useState(1)

    const formMethods = useForm({
        resolver: zodResolver(PlanSchema),
        values: {
            responses: plans[planIndex].fields.map(({ label, type }) => ({
                answer: type === 'input' ? '' : ([] as string[]),
                question: label
            })),
            type: plans[planIndex].type as Plan['type']
        }
    })

    const toast = useToast({ duration: 3000, position: 'top-right' })

    const onSubmit = formMethods.handleSubmit(async values => {
        try {

            const redirectResponse = { data: null, success: true }
                , response = (await generatePayment(values)) || redirectResponse

            if (response.success) {
                if (values.type === 'free') {
                    localStorage.setItem('lockedDate', (new Date).toISOString())
                }
            }
            else {
                throw new Error()
            }
        }
        catch {

            const toastOptions: UseToastOptions = { status: 'error' }

            toastOptions.description = 'Por favor, contate o suporte'
            toastOptions.title = 'Erro no servidor'

            toast(toastOptions)
        }
    })

    useEffect(() => {

        const lockedDate = localStorage.getItem('lockedDate')

        if (lockedDate) {

            const currentDate = new Date()
                , lockedDateParsed = new Date(lockedDate)
                , diffInMilliseconds = currentDate.getTime() - lockedDateParsed.getTime()
                , diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24)

            if (diffInDays >= 1) {
                setIsLocked(false)
                localStorage.removeItem('lockedDate')
            }
            else {
                setIsLocked(true)
            }
        }
        else {
            setIsLocked(false)
        }
    }, [])

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' paddingTop='72px' width='full'>
                <Container maxWidth='container.lg' paddingY={28}>
                    <HStack flexDirection={{ base: 'column', lg: 'row' }} justifyContent='center' spacing={0}>
                        <VStack
                            alignItems={{ base: 'center', lg: 'self-start' }}
                            marginBottom={{ base: 6, lg: 0 }}
                            maxWidth='500px'
                            spacing={0}>
                            <Text
                                as='h1'
                                color='#ffffff'
                                fontSize={{ base: '32px', sm: '38px', md: '44px', lg: '48px' }}
                                fontWeight='700'
                                letterSpacing='1px'
                                marginBottom={2}>
                                Operação Presente
                            </Text>
                            <Text
                                color='#ffffff'
                                fontSize={{ base: '14px', md: '15px', lg: '16px' }}
                                letterSpacing='1.5px'
                                marginBottom={{ base: 12, lg: 16 }}
                                textAlign={{ base: 'center', lg: 'unset' }}>
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
                            fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                            fontWeight='700'
                            textAlign='center'>
                            Como acertar no presente?
                        </Text>
                        <Text
                            color='#512E5F'
                            fontSize={{ base: '14px', lg: '16px' }}
                            lineHeight='1.75'
                            marginTop={4}
                            maxWidth='900px'
                            textAlign='center'>
                            Já passou por aquele momento em que você precisa escolher um presente para quem ama e não sabe o que dar?
                            Mesmo conhecendo/sabendo tudo (ou muitas coisas) sobre aquela pessoa, é difícil acertar e surpreender.
                            Então chegou o momento de você acertar no presente! No Operação Presente, você irá responder algumas
                            perguntas e pronto, um dossiê completo com ideias e sugestões de presentes com base naquilo que a
                            pessoa gosta. Chega de errar nos presente!
                        </Text>
                        <Grid gap={4} marginTop={10} templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} maxWidth='1100px'>
                            {
                                [
                                    {
                                        icon: TbFileDescription,
                                        subtitle: 'Preencha nosso formulário simples e rápido.',
                                        title: 'Responda as perguntas'
                                    },
                                    {
                                        icon: TbPigMoney,
                                        subtitle: 'Pagamento rápido e seguro.',
                                        title: 'Escolha um método de pagamento'
                                    },
                                    {
                                        icon: TbChecklist,
                                        subtitle: 'Receba todas as sugestões no seu e-mail.',
                                        title: 'Receba o dossiê'
                                    },
                                    {
                                        icon: TbHeartFilled,
                                        subtitle: 'Escolha o presente perfeito e faça o dia especial!',
                                        title: 'Surpreenda quem você ama'
                                    }
                                ].map(item => (
                                    <Box
                                        _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                                        backgroundColor='#6b3fa0'
                                        borderRadius='md'
                                        boxShadow='md'
                                        color='#ffffff'
                                        key={item.title}
                                        paddingX={4}
                                        paddingY={6}
                                        textAlign='center'
                                        userSelect='none'
                                        transition='all 0.2s ease'>
                                        <Icon as={item.icon} color='#ffffff' boxSize={12} marginBottom={4} />
                                        <Text
                                            color='#ffffff'
                                            fontSize={{ base: '13px', md: '14px', lg: '15px' }}
                                            fontWeight='bold'
                                            textAlign='center'>
                                            {item.title}
                                        </Text>
                                        <Text
                                            color='#e0e0e0'
                                            fontSize={{ base: '12px', lg: '13px' }}
                                            textAlign='center'>
                                            {item.subtitle}
                                        </Text>
                                    </Box>
                                ))
                            }
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
                            fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                            fontWeight='700'
                            textAlign='center'>
                            Encontre o presente ideal
                        </Text>
                        <Text
                            color='#ffffff'
                            fontSize={{ base: '14px', lg: '16px' }}
                            lineHeight='1.75'
                            marginTop={4}
                            textAlign='center'>
                            Responda as perguntas de acordo com a pessoa que irá receber o presente.
                            Seja bem detalhado e nos conte tudo o que souber.
                        </Text>
                        <Tabs
                            as='form'
                            borderRadius='15px'
                            boxShadow='lg'
                            defaultIndex={1}
                            index={planIndex}
                            isFitted={true}
                            isLazy={true}
                            marginTop={10}
                            maxWidth='550px'
                            variant='unstyled'
                            width='full'
                            onChange={tabIndex => setPlanIndex(tabIndex)}
                            onSubmit={onSubmit}>
                            <TabList backgroundColor='#FF6B6B' borderTopLeftRadius='15px' borderTopRightRadius='15px' color='#ffffff'>
                                {
                                    plans.map((plan, index) => (
                                        <Tab
                                            _before={index === 0 ? undefined : {
                                                backgroundColor: '#FFF8E1',
                                                borderRadius: '15px',
                                                content: '""',
                                                height: 'calc(100% - 10px)',
                                                left: '-1px',
                                                margin: '5px 0',
                                                position: 'absolute',
                                                width: '3px'
                                            }}
                                            key={plan.id}
                                            padding={4}
                                            position='relative'>
                                            <Text as='span' fontWeight='600'>
                                                {plan.name}
                                            </Text>
                                        </Tab>
                                    ))
                                }
                            </TabList>
                            <Stack backgroundColor='#ffffff' padding={6} paddingBottom={0}>
                                {
                                    plans[planIndex].fields.map(({ hint, id, isClearable, isMulti, label, maxLength, options, placeholder, type }, index) => (
                                        <FormControl key={id} isInvalid={!!formMethods.formState.errors.responses?.[index]?.answer}>
                                            <FormLabel marginBottom={1}>{label}</FormLabel>
                                            <FormHelperText fontSize='smaller' marginTop={1}>{hint}</FormHelperText>
                                            <Input type='hidden' {...formMethods.register(`responses.${index}.question`)} />
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
                                                        <Fragment>
                                                            {
                                                                isClearable &&
                                                                <CreatableSelect
                                                                    formatCreateLabel={(inputValue) => inputValue}
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
                                                            }
                                                            {
                                                                !isClearable &&
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
                                                            }
                                                        </Fragment>
                                                    )}
                                                />
                                            }
                                        </FormControl>
                                    ))
                                }
                            </Stack>
                            <Center
                                backgroundColor='#ffffff'
                                borderBottomLeftRadius='15px'
                                borderBottomRightRadius='15px'
                                flexDirection='column'
                                gap={3}
                                paddingY='20px'>
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
                                    isDisabled={plans[planIndex].maxPerDay ? isLocked : false}
                                    isLoading={formMethods.formState.isSubmitting}
                                    minWidth='300px'
                                    transition='background-color 0.2s, transform 0.2s'
                                    type='submit'>
                                    {
                                        plans[planIndex].price === null
                                            ? 'Faça um Teste Grátis'
                                            : `Presente Ideal por ${brazilianFormat(plans[planIndex].price)}`
                                    }
                                </Button>
                                {
                                    plans[planIndex].maxPerDay &&
                                    <Text as='span' color='gray.400' fontSize='13px' fontStyle='italic'>
                                        * Máximo de {plans[planIndex].maxPerDay} teste grátis por dia
                                    </Text>
                                }
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
                            fontSize={{ base: '22px', sm: '30px', md: '48px', lg: '56px' }}
                            fontWeight='700'
                            textAlign='center'>
                            FAQ
                        </Text>
                        <Text
                            color='#512E5F'
                            fontSize={{ base: '14px', lg: '16px' }}
                            lineHeight='1.75'
                            marginTop={4}
                            textAlign='center'>
                            Aqui estão as respostas para algumas das perguntas mais comuns que recebemos.{' '}
                            <Box as='br' display={{ base: 'none', md: 'unset' }} />
                            Se você não encontrar o que procura, fique à vontade para entrar em contato conosco!
                        </Text>
                        <Accordion allowToggle={true} as={Stack} marginTop={10} maxWidth='700px' spacing={4} width='full'>
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
                                                        <Text fontSize={{ base: '14px', lg: '16px' }}>
                                                            {question}
                                                        </Text>
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel padding={4}>
                                                    <Text fontSize={{ base: '14px', lg: '16px' }}>
                                                        {answer}
                                                    </Text>
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