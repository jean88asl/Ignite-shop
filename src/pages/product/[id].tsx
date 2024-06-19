import { ProductContainer, ImageContainer, ProductDetails } from "../../styles/pages/product"
import { GetStaticProps, GetStaticPaths } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        // adicionando o id do preço na tipagem
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    // estado para lidar com load da requisição
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyButton() {
        try {
            setIsCreatingCheckoutSession(true)
            // criando a sessão com auxilio da lib axios e enviando o priceId para a rota checkout
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })
            // pegando a url que retorna da resposta     
            const { checkoutUrl } = response.data
            // direcionando o usuário para uma rota externa utilizando esse método do próprio JS. Se interna usaríamos o useRouter      
            window.location.href = checkoutUrl
        } catch (err) {
            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout')
        }
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} alt="" width={520} height={480} />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>
                    {/* utilizando o estado para desabilitar o botão quando a variável estiver como true */}
                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
                        Comprar agora
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}
// Nesse caso como a página depende de um parâmetro dinâmico, utilizamos esse método para ter acesso as informações que não são estáticas passando o path de um produto prod_QHYL8IzofHcAbR
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { id: 'prod_QHYL8IzofHcAbR' }
            }
        ],
        fallback: 'blocking',
    }
}

// essa página apesar optarmos por utilizar o SSG, temos que receber o parâmetro, pois existem vários produtos. Para isso podemos desestruturar os params e pegar o que queremos
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params?.id ? params.id : ""
    // diferente de como vimos na home, não vai retornar uma lista, mas apenas um produto
    const product = await stripe.products.retrieve(productId, {
        // como é apenas um produto conseguimos pegar apenas o dado que queremos
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount! / 100),
                description: product.description,
                // passando o ID do PREÇO para nosso objeto de retorno
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hour
    }
}
