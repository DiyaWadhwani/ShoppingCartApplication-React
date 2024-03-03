import PropTypes from "prop-types";

export default function ProductItem({ products, onAddToCart }) {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li className="product-display" key={product.id}>
            <div className="product-name">
              <strong>{product.data.productName}</strong>
              <div className="product-price">${product.data.productPrice}</div>
            </div>
            <div className="product-accessory">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

ProductItem.PropTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
