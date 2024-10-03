'use client'
import { Button, useClipboard } from '@chakra-ui/react'

export type CopyLinkButtonProps = object

export default function CopyLinkButton(props: CopyLinkButtonProps) {

    const { } = props
        , { onCopy } = useClipboard(location.href)

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
            onClick={onCopy}>
            Copiar Link Atual
        </Button>
    )
}