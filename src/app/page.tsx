'use client'
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
import Image from 'next/image'
import questions from '@/data/questions.json'
import { Select } from 'chakra-react-select'

export default function HomePage() {

    return (
        <VStack backgroundColor='#471ca8'>
            <Container maxWidth='container.xl' paddingY={20}>
                <HStack justifyContent='center' spacing={8}>
                    <VStack alignItems='self-start' maxWidth='500px'>
                        <Text
                            as='h1'
                            color='#ffffff'
                            fontSize='xxx-large'
                            fontWeight='700'>
                            Operação presente
                        </Text>
                        <Text color='#ffffff'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas possimus
                            deleniti commodi aliquid hic quo, reiciendis tenetur numquam vel delectus
                            minima iure consequatur adipisci, odio deserunt. Aspernatur quis similique nesciunt.
                        </Text>
                        <Button margin='20px auto 0'>
                            Test
                        </Button>
                    </VStack>
                    <Image alt='Imagem principal' src='https://placehold.jp/300x400.png' height={400} width={300} />
                </HStack>
            </Container>
            <Box backgroundColor='#391686' width='100%'>
                <Container maxWidth='container.xl' paddingY={20}>
                    <Stack alignItems='center'>
                        <Text
                            as='h2'
                            color='#ffffff'
                            fontSize='xxx-large'
                            fontWeight='700'>
                            Título do problema
                        </Text>
                        <Text color='#ffffff'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas possimus
                            deleniti commodi aliquid hic quo, reiciendis tenetur numquam vel delectus
                            minima iure consequatur adipisci, odio deserunt. Aspernatur quis similique nesciunt.
                        </Text>
                        <Grid gap={6} templateColumns='repeat(4, 1fr)' width='100%'>
                            <GridItem backgroundColor='#000000' borderRadius='10px' height='250px' width='100%' />
                            <GridItem backgroundColor='#000000' borderRadius='10px' height='250px' width='100%' />
                            <GridItem backgroundColor='#000000' borderRadius='10px' height='250px' width='100%' />
                            <GridItem backgroundColor='#000000' borderRadius='10px' height='250px' width='100%' />
                        </Grid>
                        <Button>
                            Test
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
                    <Tabs backgroundColor='#ffffff' borderRadius='15px' boxShadow='lg' isFitted={true} variant='unstyled' width='550px'>
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
                            <Tab padding={4}>
                                <Text as='span' fontWeight='600'>
                                    Avançado
                                </Text>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel padding={6} paddingBottom={0}>
                                <Stack>
                                    {
                                        questions.simple.map(({ id, name, hint, options, placeholder, type }) => (
                                            <FormControl key={id}>
                                                <FormLabel marginBottom={1}>{name}</FormLabel>
                                                <FormHelperText fontSize='smaller' marginTop={1}>{hint}</FormHelperText>
                                                {
                                                    type === 'input' &&
                                                    <Input placeholder={placeholder} />
                                                }
                                                {
                                                    type === 'select' &&
                                                    <Select options={options} placeholder={placeholder} useBasicStyles={true} />
                                                }
                                            </FormControl>
                                        ))
                                    }
                                </Stack>
                            </TabPanel>
                            <TabPanel padding={6} paddingBottom={0}>
                                <Stack>
                                    {
                                        questions.advanced.map(({ id, name, hint, options, placeholder, type }) => (
                                            <FormControl key={id}>
                                                <FormLabel marginBottom={1}>{name}</FormLabel>
                                                <FormHelperText fontSize='smaller' marginTop={1}>{hint}</FormHelperText>
                                                {
                                                    type === 'input' &&
                                                    <Input placeholder={placeholder} />
                                                }
                                                {
                                                    type === 'select' &&
                                                    <Select options={options} placeholder={placeholder} useBasicStyles={true} />
                                                }
                                            </FormControl>
                                        ))
                                    }
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                        <Center margin='20px 0'>
                            <Button
                                _hover={{}}
                                backgroundColor='#D1105A'
                                color='#ffffff'
                                margin='auto'>
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
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left'>
                                            Pergunta
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quidem autem voluptatum optio molestiae repellat veniam dolor dolorem iste recusandae aperiam exercitationem dolores, sit enim iusto quis, incidunt amet cum.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left'>
                                            Pergunta
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ullam non ut deleniti reprehenderit mollitia temporibus harum doloribus delectus repudiandae! Amet reiciendis non illo ad! Dignissimos dolor numquam quis ipsum!
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Stack>
                </Container>
            </Box>
        </VStack>
    )
}