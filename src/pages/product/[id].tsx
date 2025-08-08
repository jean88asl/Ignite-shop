import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
  ButtonGroup,
  ButtonQuantity,
} from "../../styles/pages/product";
import { GetStaticProps, GetStaticPaths } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import { FiMinus, FiPlus } from "react-icons/fi";

//import { useShoppingCart, cartDetails } from "use-shopping-cart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    // adicionando o id do preço na tipagem
    defaultPriceId: string;
  };
}

export interface ProductCart {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
}

export default function Product({ product }: ProductProps) {
  // estado para lidar com load da requisição
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const [quantityOfItems, setQuantityOfItems] = useState(1);

  //const { addItem } = useShoppingCart();

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);
      // criando a sessão com auxilio da lib axios e enviando o priceId para a rota checkout
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
        quantityItem: quantityOfItems,
      });
      // pegando a url que retorna da resposta
      const { checkoutUrl } = response.data;
      // direcionando o usuário para uma rota externa utilizando esse método do próprio JS. Se interna usaríamos o useRouter
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert("Falha ao redirecionar ao checkout");
    }
  }

  function addItems() {
    if (quantityOfItems >= 1) {
      setQuantityOfItems(quantityOfItems + 1);
    }
  }

  function removeItems() {
    if (quantityOfItems > 1) {
      setQuantityOfItems(quantityOfItems - 1);
    }
  }

  function addToCart() {
    const productCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      currency: "BRL",
    };

    console.log(productCart);

    //addItem(productCart, { count: quantityOfItems });
    setQuantityOfItems(1);
  }

  //console.log(cartDetails)

  useEffect(() => {}, []);

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
          <ButtonGroup>
            <div>
              <ButtonQuantity
                onClick={removeItems}
                disabled={isCreatingCheckoutSession}
              >
                <FiMinus />
              </ButtonQuantity>
              <span title="quantidade">{quantityOfItems}</span>
              <ButtonQuantity
                onClick={addItems}
                disabled={isCreatingCheckoutSession}
              >
                <FiPlus />
              </ButtonQuantity>
            </div>
            {/* <button className="add" title="adicionar ao carrinho" onClick={() => addToCart(product)}>
                            Add ao Carrinho
                        </button> */}
            <button
              className="add"
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyButton}
            >
              Comprar agora
            </button>
          </ButtonGroup>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_QHYL8IzofHcAbR" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id ? params.id : "";
  // diferente de como vimos na home, não vai retornar uma lista, mas apenas um produto
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        // passando o ID do PREÇO para nosso objeto de retorno
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
