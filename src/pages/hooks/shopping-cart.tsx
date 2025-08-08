import { useShoppingCart } from "use-shopping-cart";
import { ButtonCart } from '../../styles/pages/shopping-cart'
import { FiShoppingCart } from "react-icons/fi"

export function ShoppingModal() {
  const { handleCartClick, cartCount } = useShoppingCart();

    return (
        <div>
           <ButtonCart onClick={() => handleCartClick()}>
            <FiShoppingCart size={32} />
            <div>{cartCount}</div>
          </ButtonCart>
        </div>
    );
}