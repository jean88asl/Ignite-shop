import { stripe } from "../../lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Esse priceId será utilizado na sessão abaixo, ele vem diretamente da página relacionada ao produto
    const { priceId } = req.body
    // inibindo retorno para outros métodos que não sejam o post
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    // verificando se o id do preço existe
    if (!priceId) {
        return res.status(400).json({ error: 'Price not found' })
    }
    // criando as variáveis com as informações das URLs utilizando o padrão cadastrado no arquivo .env
    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}`
    // criando uma sessão no Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
        // urls que serão utilizadas para redirecionar o usuário no caso de sucesso ou cancelamento da compra.
        success_url: successUrl,
        cancel_url: cancelUrl,
        // criando o pagamento
        mode: 'subscription',
        // array que tem várias informações do produto. Essas informações poderiam ser carregadas no nosso lado, mas o Stripe tem uma forma de saber as informações que é o ID do preço, que é uma entidade diferente do produto em si, pois no stripe podemos cadastrar mais de um preço, isso é interessante pois podemos atribuir preços diferentes para se o usuário quiser comprar 5 camisetas, por exemplo.
        line_items: [
            {
                price: priceId,
                // quantidade que está sendo comprada.
                quantity: 1
            }
        ]
    })
    // retornando a url de checkout para ele finalizar a compra
    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}