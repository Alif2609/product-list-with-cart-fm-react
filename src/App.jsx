import { CartProvider } from "./CartContext";
import Menu from "./Menu.jsx";
import Cart from "./Cart.jsx";
// import ConfirmationModal from "./ConfirmationModal.jsx";

function App() {
  return (
    <CartProvider>
      <Menu />
      <Cart />
      
    </CartProvider>
  );
}

export default App;
