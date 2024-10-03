'use client'
import { Button } from '@chakra-ui/react'
import { saveAs } from 'file-saver'

export type DownloadPdfButtonProps = {
    pdfLink: string
}

export default function DownloadPdfButton(props: DownloadPdfButtonProps) {

    const { pdfLink } = props

    const onDownloadPdf = () => {
        console.log('res')
        saveAs(pdfLink, 'asd')
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
            onClick={onDownloadPdf}>
            Baixar Dossiê
        </Button>
    )
}