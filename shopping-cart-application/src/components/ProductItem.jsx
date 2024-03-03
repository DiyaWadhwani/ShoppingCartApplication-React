import PropTypes from "prop-types";

export default function ProductItem({
  products,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
}) {
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
                className="product-button btn btn-success"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="product-button btn btn-primary"
                onClick={() => onEditProduct(product)}
              >
                Edit
              </button>

              <button
                type="button"
                className="product-button btn btn-danger"
                onClick={() => onDeleteProduct(product)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

ProductItem.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
