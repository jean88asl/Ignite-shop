import { SuccessContainer, ImageContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import { stripe } from "../lib/stripe"
import Link from "next/link"
import Stripe from "stripe"
import Image from "next/image"
import Head from "next/head"

interface SuccessProps {
    customerName: string,
    product: {
        name: string
        imageUrl: string
    }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex"/>
            </Head>
            <SuccessContainer>
                <h1>Compra efetuada</h1>

                <ImageContainer>
                    <Image src={product.imageUrl} alt={""} width={120} height={110} />
                </ImageContainer>

                <p>
                    Uhuulll <strong>{customerName}</strong>, <strong>{product.name}</strong> já está a caminho da sua casa.
                </p>

                <Link href="/">
                    voltar ao catalogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // Realizando um redirecionamento do usuário caso não tenha nenhuma sessionId informado
    if (!query.sessionId) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    const sessionId = String(query.session_id)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })
    // pegando o nome do cliente que efetuou a compra
    const customerName = session.customer_details.name
    
    const product = session.line_items.data[0].price.product as Stripe.Product
    console.log(product.images[0])

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}

