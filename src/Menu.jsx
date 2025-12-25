import menuData from "./data/data.json";
import { useCart } from "./CartContext";

export default function Menu() {
  return (
    <div className="menu-container">
      <h1>Desserts</h1>
      <div className="menu-wrap">
        <MenuCard />
      </div>
    </div>
  );
}
function MenuCard() {
  return (
    <>
      {menuData.map((data, index) => (
        <div className="menu-card" key={index}>
          <picture>
            <source media="(min-width: 1000px)" srcSet={data.image.desktop} />
            <source media="(min-width: 768px)" srcSet={data.image.tablet} />
            <img
              src={data.image.mobile}
              alt={data.name}
              className="menu-image"
            />
            <CardButton data={data} />
          </picture>
          <div className="menu-info">
            <p className="menu-category">{data.category}</p>
            <p className="menu-name">{data.name}</p>

            <p className="menu-price">
              $<span>{data.price.toFixed(2)}</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

function CardButton({ data }) {
  const { getItemQuantity, addToCart, menuIncrement, menuDecrement } =
    useCart();

  const quantity = getItemQuantity(data.name);

  if (quantity > 0) {
    return (
      <div className="cart-incr-decr">
        <button className="btn-decr" onClick={() => menuDecrement(data.name)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="2"
            fill="none"
            viewBox="0 0 10 2"
          >
            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
          </svg>
        </button>
        <p className="cart-quantity">{quantity}</p>
        <button className="btn-incr" onClick={() => menuIncrement(data.name)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 10 10"
          >
            <path
              fill="#fff"
              d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
            />
          </svg>
        </button>
      </div>
    );
  } else {
    return (
      <>
        <button className="btn-cart-add" onClick={() => addToCart(data)}>
          <img
            src="/images/icon-add-to-cart.svg"
            alt=""
            aria-hidden="true"
          />
          Add to Cart
        </button>
      </>
    );
  }
}

