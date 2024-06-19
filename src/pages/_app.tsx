import { globalStyles } from "../styles/global";
import {Container, Header} from '../styles/pages/app'
import type { AppProps } from "next/app";
// melhor local para ficar o globalStyles é aqui
globalStyles()

import logoImg from "../assets/logo.svg"

import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
