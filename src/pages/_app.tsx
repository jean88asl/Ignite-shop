import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";
import type { AppProps } from "next/app";
import { FiShoppingCart } from "react-icons/fi";
// melhor local para ficar o globalStyles é aqui
globalStyles();
import logoImg from "../assets/logo.svg";

import Image from "next/image";

import { CartProvider } from "use-shopping-cart";
// import { ShoppingModal } from "./hooks/shopping-cart";

export default function App({ Component, pageProps }: AppProps) {
  const stripeKey = process.env.STRIPE_PUBLIC_KEY;

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}`;

  return (
    // https://codingwithlucy.hashnode.dev/build-a-shopping-cart-in-nextjs-with-use-shopping-cart-and-stripe
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={successUrl}
      cancelUrl={cancelUrl}
      currency="BRL"
      allowedCountries={["BR"]}
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Image src={logoImg} alt="" />

          {/* <ShoppingModal /> */}
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
