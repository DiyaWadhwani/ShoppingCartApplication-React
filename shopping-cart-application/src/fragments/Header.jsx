import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>Shopping Cart Application</h1>{" "}
        <Link to="/cart">
          <FaShoppingCart className="cart-icon" />
        </Link>
      </div>
    </>
  );
}
