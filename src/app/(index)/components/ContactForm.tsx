import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Textarea,
    useToast,
    UseToastOptions
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { t } from 'tuple-it'
import { sendEmail } from '../actions'
import { ContactSchema } from '../schemas'
import { Contact } from '../types'

export type ContactFormProps = object

export default function ContactForm(props: ContactFormProps) {

    const { } = props
        , formMethods = useForm<Contact>({ resolver: zodResolver(ContactSchema) })
        , toast = useToast({ duration: 3000, position: 'top-right' })

    const onSubmit = formMethods.handleSubmit(async values => {

        const [responseError, response] = await t(sendEmail(values))
            , toastOptions: UseToastOptions = {}

        if (responseError || !response.success) {
            toastOptions.status = 'error'
            toastOptions.description = 'Erro ao gerar dossiê!'
        }
        else {

            toastOptions.status = 'success'
            toastOptions.description = 'Email enviado com sucesso!'

            formMethods.reset()
        }

        toast(toastOptions)
    })

    return (
        <Box
            as='form'
            backgroundColor='#ffffff'
            borderRadius='15px'
            boxShadow='lg'
            marginTop={10}
            maxWidth='550px'
            padding={6}
            width='full'
            onSubmit={onSubmit}>
            <Stack marginBottom='20px'>
                <FormControl isInvalid={!!formMethods.formState.errors.name} isRequired={true}>
                    <FormLabel marginBottom={1}>Nome</FormLabel>
                    <Input
                        maxLength={100}
                        placeholder='Digite seu nome'
                        {...formMethods.register('name')}
                    />
                    <FormErrorMessage>Nome é obrigatório</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formMethods.formState.errors.email} isRequired={true}>
                    <FormLabel marginBottom={1}>Email</FormLabel>
                    <Input
                        maxLength={100}
                        placeholder='Digite seu email'
                        {...formMethods.register('email')}
                    />
                    <FormErrorMessage>Nome é obrigatório</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!formMethods.formState.errors.message} isRequired={true}>
                    <FormLabel marginBottom={1}>Mensagem</FormLabel>
                    <Textarea
                        maxLength={100}
                        placeholder='Digite sua mensagem'
                        {...formMethods.register('message')}
                    />
                    <FormErrorMessage>Mensagem é obrigatório</FormErrorMessage>
                </FormControl>
            </Stack>
            <Center>
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
                    minWidth='230px'
                    transition='background-color 0.2s, transform 0.2s'
                    type='submit'>
                    Enviar
                </Button>
            </Center>
        </Box>
    )
}