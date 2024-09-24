'use client'
import faq from '@/data/faq.json'
import questions from '@/data/questions.json'
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
    GridItem,
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
import { saveAs } from 'file-saver'
import Image from 'next/image'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TbChecklist, TbFileDescription, TbHeartFilled, TbPigMoney } from 'react-icons/tb'
import { generatePdf } from './actions'

export default function HomePage() {

    const formMethods = useForm({ defaultValues: { responses: [] as { answer: string, question: string }[] } })

    const onSubmit = formMethods.handleSubmit(async values => {
        try {

            const response = await generatePdf(values.responses)

            console.log(response)

            debugger

            if (response.success) {

                const uint8Array = new Uint8Array(response.data.output)
                    , blob = new Blob([uint8Array], { type: 'application/pdf' })

                saveAs(blob, 'test.pdf')
            }
        }
        catch (error) {

            console.log(error)
        }
    })

    return (
        <Fragment>
            <Box as='section' backgroundColor='#6B3FA0' width='full'>
                <Container maxWidth='container.xl' paddingY={28}>
                    <HStack justifyContent='center' spacing={8}>
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
                            <Button
                                _active={{ backgroundColor: '#ff5959' }}
                                _hover={{ backgroundColor: '#ff5959' }}
                                backgroundColor='#FF6B6B'
                                borderRadius='64px'
                                color='#ffffff'
                                height={14}
                                margin='60px auto 0 0'
                                minWidth='300px'>
                                Encontre o Presente Ideal
                            </Button>
                        </VStack>
                        <Image alt='Imagem principal' height={380} src='/static/10172549_8307.svg' width={500} />
                    </HStack>
                </Container>
            </Box>
            <Box backgroundColor='#391686' width='100%'>
                <Container maxWidth='container.xl' paddingY={20}>
                    <Stack alignItems='center'>
                        <Text
                            as='h2'
                            color='#ffffff'
                            fontSize='xxx-large'
                            fontWeight='700'>
                            Como acertar no presente?
                        </Text>
                        <Text color='#ffffff'>
                            Já passou por aquele momento em que você precisa escolher um presente para quem ama e não sabe o que dar?
                            Mesmo conhecendo/sabendo tudo (ou muitas coisas) sobre aquela pessoa, é difícil acertar e surpreender.
                            Então chegou o momento de você acertar no presente! No Operação Presente, você irá responder algumas
                            perguntas e pronto, um dossiê completo com ideias e sugestões de presentes com base naquilo que a
                            pessoa gosta. Chega de errar nos presente!
                        </Text>
                        <Grid gap={10} templateColumns='repeat(4, 1fr)' width='100%'>
                            <GridItem border='1px solid #ffffff' borderRadius='15px' height='250px' padding={4} width='100%'>
                                <Center flexDirection='column' height='100%'>
                                    <Icon as={TbFileDescription} color='#ffffff' fontSize='45px' marginBottom='10px' />
                                    <Text color='#ffffff' fontWeight='800' height='80px' textAlign='center'>
                                        Responda as perguntas
                                    </Text>
                                </Center>
                            </GridItem>
                            <GridItem border='1px solid #ffffff' borderRadius='15px' height='250px' padding={4} width='100%'>
                                <Center flexDirection='column' height='100%'>
                                    <Icon as={TbPigMoney} color='#ffffff' fontSize='45px' marginBottom='10px' />
                                    <Text color='#ffffff' fontWeight='800' height='80px' textAlign='center'>
                                        Escolha um método de pagamento e realize o checkout
                                    </Text>
                                </Center>
                            </GridItem>
                            <GridItem border='1px solid #ffffff' borderRadius='15px' height='250px' padding={4} width='100%'>
                                <Center flexDirection='column' height='100%'>
                                    <Icon as={TbChecklist} color='#ffffff' fontSize='45px' marginBottom='10px' />
                                    <Text color='#ffffff' fontWeight='800' height='80px' textAlign='center'>
                                        Você receberá o dossiê com todas as dicas e ideias de presentes via e-mail
                                    </Text>
                                </Center>
                            </GridItem>
                            <GridItem border='1px solid #ffffff' borderRadius='15px' height='250px' padding={4} width='100%'>
                                <Center flexDirection='column' height='100%'>
                                    <Icon as={TbHeartFilled} color='#ffffff' fontSize='45px' marginBottom='10px' />
                                    <Text color='#ffffff' fontWeight='800' height='80px' textAlign='center'>
                                        Surpreenda quem você ama
                                    </Text>
                                </Center>
                            </GridItem>
                        </Grid>
                        <Button
                            _hover={{}}
                            backgroundColor='#D1105A'
                            color='#ffffff'>
                            Buscar presentes
                        </Button>
                    </Stack>
                </Container>
            </Box>
            <Container maxWidth='container.xl' paddingY={20}>
                <Stack alignItems='center' spacing={0}>
                    <Text
                        as='h2'
                        color='#ffffff'
                        fontSize='xxx-large'
                        fontWeight='700'
                        marginBottom='5px'>
                        Encontre o presente ideal
                    </Text>
                    <Text color='#ffffff' marginBottom='50px'>
                        Responda as perguntas de acordo com a pessoa que irá receber o presente. Seja bem detalhado e nos conte tudo o que souber.
                    </Text>
                    <Tabs
                        as='form'
                        backgroundColor='#ffffff'
                        borderRadius='15px'
                        boxShadow='lg'
                        isFitted={true}
                        isLazy={true}
                        variant='unstyled'
                        width='550px'
                        onSubmit={onSubmit}>
                        <TabList
                            _before={{
                                backgroundColor: '#ffffff',
                                borderRadius: '15px',
                                content: '""',
                                height: 'calc(100% - 10px)',
                                left: 'calc(50% - 1px)',
                                margin: '5px 0',
                                position: 'absolute',
                                width: '2px'
                            }}
                            backgroundColor='#D1105A'
                            borderTopRightRadius='15px'
                            borderTopLeftRadius='15px'
                            color='#ffffff'
                            position='relative'>
                            <Tab padding={4}>
                                <Text as='span' fontWeight='600'>
                                    Simples
                                </Text>
                            </Tab>
                            <Tab isDisabled={true} padding={4}>
                                <Text as='span' fontWeight='600'>
                                    Avançado
                                </Text>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel padding={6} paddingBottom={0}>
                                <Stack>
                                    {
                                        questions.simple.map(({ hint, id, label, options, placeholder, type }, index) => (
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
                                                    <Controller
                                                        control={formMethods.control}
                                                        name={`responses.${index}.answer`}
                                                        render={({ field }) => (
                                                            <Select
                                                                options={options}
                                                                placeholder={placeholder}
                                                                useBasicStyles={true}
                                                                {...field}
                                                                value={options.find(c => c.value === field.value)}
                                                                onChange={val => field.onChange(val?.value)}
                                                            />
                                                        )}
                                                    />
                                                }
                                            </FormControl>
                                        ))
                                    }
                                </Stack>
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
                                _hover={{}}
                                backgroundColor='#D1105A'
                                color='#ffffff'
                                isLoading={formMethods.formState.isSubmitting}
                                margin='auto'
                                type='submit'>
                                Buscar presentes
                            </Button>
                        </Center>
                    </Tabs>
                </Stack>
            </Container>
            <Box backgroundColor='#391686' width='100%'>
                <Container maxWidth='container.xl' paddingY={20}>
                    <Stack alignItems='center'>
                        <Text
                            as='h2'
                            color='#ffffff'
                            fontSize='xxx-large'
                            fontWeight='700'>
                            FAQ
                        </Text>
                        <Accordion allowToggle={true} width='700px'>
                            {
                                faq.map(({ answer, question }) => (
                                    <AccordionItem key={question}>
                                        <h2>
                                            <AccordionButton>
                                                <Box as='span' flex='1' textAlign='left'>
                                                    {question}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            {answer}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    </Stack>
                </Container>
            </Box>
        </Fragment>
    )
}