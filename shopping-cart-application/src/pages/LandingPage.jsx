import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myFirebase } from "../models/MyFirebase";
import PropTypes from "prop-types";
import ProductItem from "../components/ProductItem";

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const itemsPerPage = 10;
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await myFirebase.getProducts();
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = allProducts.slice(start, end);
      setProducts(paginatedProducts);
    };

    getProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const onAddToCart = async (product) => {
    console.log("Add to Cart", product.id, product.data);
    const response = await myFirebase.addProductsToCart(product);
    const cartCount = await myFirebase.fetchCountInCart();
    setCartItemCount(cartCount);
    console.log(response);
  };

  return (
    <>
      <div className="header">
        <h1>Shopping Cart Application</h1>{" "}
        <Link to="/cart">
          <FaShoppingCart className="header-icon" />
          <span className="cart-count">{cartItemCount}</span>
        </Link>
      </div>
      <ProductItem products={products} onAddToCart={onAddToCart} />

      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">«</span>
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
        <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(2)}>
            2
          </button>
        </li>
        <li className={`page-item ${currentPage === 3 ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(3)}>
            3
          </button>
        </li>
        <li className={`page-item ${currentPage === 3 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 3}
          >
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </>
  );
}

LandingPage.propTypes = {
  products: PropTypes.array.isRequired,
};
