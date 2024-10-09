'use client'
import { Button } from '@chakra-ui/react'
import { generatePdf } from '../actions'

export type GeneratePdfButtonProps = {
    paymentId: string
}

export default function GeneratePdfButton(props: GeneratePdfButtonProps) {

    const { paymentId } = props

    const onGeneratePdf = async () => {
        await generatePdf(paymentId)
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
            marginTop={16}
            minWidth='230px'
            transition='background-color 0.2s, transform 0.2s'
            onClick={onGeneratePdf}>
            Gerar Dossiê
        </Button>
    )
}