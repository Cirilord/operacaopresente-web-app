import { Box, Container } from '@chakra-ui/react'
import { Fragment } from 'react'

export type PreviewPageProps = {
    searchParams: {
        paymentId: string
    }
}

export default async function PreviewPage(props: PreviewPageProps) {

    const { } = props

    return (
        <Fragment>
            <Box as='section' width='full'>
                <Container backgroundColor='#6B3FA0' maxWidth='container.lg' paddingY={28}>
                    Test
                </Container>
            </Box>
        </Fragment>
    )
}