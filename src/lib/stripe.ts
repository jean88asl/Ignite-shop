import Stripe from "stripe"

// primeiro parâmetro vem de .env e o segundo é um objeto com a versão e nome da aplicação. Essa versão é obtida automaticamente pressionando as teclas ctrl + espaço
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
    appInfo: {
        name: "Ignite Shop",
    }
})