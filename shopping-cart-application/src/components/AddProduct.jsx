import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import PropTypes from "prop-types";
import { myFirebase } from "../models/MyFirebase";

export default function AddProduct() {
  const nameRef = useRef();
  const priceRef = useRef();

  const onAddNewProductHelper = (e) => {
    e.preventDefault();

    onAddNewProduct({
      productName: nameRef.current.value,
      productPrice: +priceRef.current.value,
    });
  };

  const onAddNewProduct = async (product) => {
    console.log("Add Product", product);
    await myFirebase.addNewProduct(product);
    alert("Added new product successfully!");
    window.location.reload();
  };

  return (
    <>
      <div className="header">
        <h2>Add Product</h2>
        <Link to="/">
          <FaHome className="header-icon" />
        </Link>
      </div>
      <div className="form-styling">
        <form className="container mt-4">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                ref={nameRef}
              />
            </div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              name="recipeName"
              id="price"
              ref={priceRef}
              required
            />
          </div>
          <button
            className="btn btn-primary custom-btn"
            onClick={onAddNewProductHelper}
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
