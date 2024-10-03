'use client'
import { Image } from '@chakra-ui/next-js'
import { Box, Button, Container, HStack, List, ListItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export type HeaderProps = object

// eslint-disable-next-line
// @ts-ignore
const MotionBox = motion.create(Box)

export default function Header(props: HeaderProps) {

    const { } = props

    return (
        <Box as='header' backgroundColor='#FFF8E1' boxShadow='md' position='fixed' width='100vw' zIndex='1000'>
            <Container as='nav' maxWidth='container.lg'>
                <HStack justifyContent='flex-end' paddingY={3} spacing={12}>
                    <MotionBox
                        animate={{
                            rotate: [0, -10, 10, -5, 5, 0]
                        }}
                        initial={{ rotate: 0 }}
                        marginRight='auto'
                        transition={{
                            duration: 2,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatDelay: 1,
                            times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1]
                        }}>
                        <Link href='/' passHref={true}>
                            <Image alt='Logo' height={12} src='/static/10613008_10070_rect.svg' width={12} />
                        </Link>
                    </MotionBox>
                    <List alignItems='center' display='flex' spacing={0}>
                        <ListItem color='#512E5F' fontWeight='600' marginRight={6}>
                            <Link href='#conheça'>
                                Conheça
                            </Link>
                        </ListItem>
                        <ListItem color='#512E5F' fontWeight='600'>
                            <Link href='#faq'>
                                Faq
                            </Link>
                        </ListItem>
                    </List>
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
                            fontSize='13px'
                            height={10}
                            minWidth='230px'
                            transition='background-color 0.2s, transform 0.2s'>
                            Encontre o Presente Ideal
                        </Button>
                    </Link>
                </HStack>
            </Container>
        </Box>
    )
}