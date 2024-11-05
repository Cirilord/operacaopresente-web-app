'use client'
import { Button, useToast, UseToastOptions } from '@chakra-ui/react'
import { useState } from 'react'
import { t } from 'tuple-it'
import { generatePdf } from '../actions'

export type GeneratePdfButtonProps = {
    paymentId: string
}

export default function GeneratePdfButton(props: GeneratePdfButtonProps) {

    const { paymentId } = props
        , [isLoading, setIsLoading] = useState(false)
        , toast = useToast({ duration: 3000, position: 'top-right' })

    const onGeneratePdf = async () => {

        const toastOptions: UseToastOptions = {}

        setIsLoading(true)

        const [error, response] = await t(generatePdf(paymentId))

        setIsLoading(false)

        if (error || response.error) {

            toastOptions.status = 'error'
            toastOptions.description = 'Erro ao gerar dossiê!'
        }
        else {
            toastOptions.status = 'success'
            toastOptions.description = 'Dossiê gerado com sucesso!'
        }

        toast(toastOptions)
    }

    return (
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
            fontSize='13px'
            height={10}
            isLoading={isLoading}
            marginTop={16}
            minWidth='230px'
            transition='background-color 0.2s, transform 0.2s'
            onClick={onGeneratePdf}>
            Gerar Dossiê
        </Button>
    )
}