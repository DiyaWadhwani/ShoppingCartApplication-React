import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myFirebase } from "../models/MyFirebase";
import PropTypes from "prop-types";
import ProductItem from "../components/ProductItem";

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const itemsPerPage = 20;
  const [cartItemCount, setCartItemCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await myFirebase.getProducts();
      setTotalItems(allProducts.length);
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedProducts = allProducts.slice(start, end);
      setProducts(paginatedProducts);
    };

    getProducts();
    getCartCount();
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };

  const onAddToCart = async (product) => {
    const response = await myFirebase.addProductsToCart(product);
    getCartCount();
    console.log(response);
  };

  const getCartCount = async () => {
    const cartCount = await myFirebase.fetchCountInCart();
    setCartItemCount(cartCount);
  };

  const onDeleteProduct = async (product) => {
    console.log("Deleting Product", product.id, product.data);
    const response = await myFirebase.deleteProduct(product);
    console.log(response);
    window.location.reload();
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
      <Link to="/productForm?action=add">
        <button type="button" className="new-product btn btn-warning">
          Create New Product
        </button>
      </Link>
      <ProductItem
        products={products}
        onAddToCart={onAddToCart}
        onDeleteProduct={onDeleteProduct}
      />
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
        {renderPaginationButtons()}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </>
  );
}
