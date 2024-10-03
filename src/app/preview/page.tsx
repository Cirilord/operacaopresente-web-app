import Header from '@/components/Header'
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
            <Header />
        </Fragment>
    )
}