import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { myFirebase } from "../models/MyFirebase";
import PropTypes from "prop-types";
import ProductItem from "../components/ProductItem";

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  //   const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const products = await myFirebase.getProducts();
      console.log(products);
      setProducts(products);
    };

    // const getCartCount = async () => {
    //   const cartCount = await myFirebase.fetchCountInCart();
    //   console.log(cartCount);
    //   setCartItemCount(cartCount.length);
    // };

    getProducts();
  }, []);

  const onAddToCart = async (product) => {
    console.log("Add to Cart", product.id, product.data);
    const response = await myFirebase.addProductsToCart(product);
    console.log(response);
  };

  return (
    <>
      <div className="header">
        <h1>Shopping Cart Application</h1>{" "}
        <Link to="/cart">
          <FaShoppingCart className="header-icon" />
          {/* <span className="cart-count">{cartItemCount}</span> */}
        </Link>
      </div>
      <ProductItem products={products} onAddToCart={onAddToCart} />{" "}
    </>
  );
}

LandingPage.propTypes = {
  products: PropTypes.array.isRequired,
};
