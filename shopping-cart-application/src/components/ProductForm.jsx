import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import PropTypes from "prop-types";
import { myFirebase } from "../models/MyFirebase";

export default function AddProduct() {
  const nameRef = useRef();
  const priceRef = useRef();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const action = urlSearchParams.get("action");
  const productId = urlSearchParams.get("id");
  const [productAction, setProductAction] = useState("");

  useEffect(() => {
    const setAction = () => {
      if (action === "edit") {
        setProductAction("Update Product");
        fetchProductDetails(productId);
      } else if (action === "add") {
        setProductAction("Add Product");
      }
    };

    setAction();
  }, [action]);

  const onCompleteProductAction = (e) => {
    e.preventDefault();

    if (action === "edit") {
      onUpdateProduct({
        productId: productId,
        productName: nameRef.current.value,
        productPrice: +priceRef.current.value,
      });
    } else if (action === "add") {
      onAddNewProduct({
        productName: nameRef.current.value,
        productPrice: +priceRef.current.value,
      });
    }
  };

  const onAddNewProduct = async (product) => {
    console.log("Add Product", product);
    await myFirebase.addNewProduct(product);
    alert("Added new product successfully!");
    window.location.reload();
  };

  const onUpdateProduct = async (product) => {
    console.log("Update Product", product);
    await myFirebase.updateProduct(product);
    alert("Updated product successfully!");
    fetchProductDetails(productId);
  };

  const fetchProductDetails = async (productId) => {
    console.log("Fetching product details", productId);
    const product = await myFirebase.getProductDetails(productId);
    nameRef.current.value = product.productName;
    priceRef.current.value = product.productPrice;
  };

  return (
    <>
      <div className="header">
        <h2>{`${productAction}`}</h2>
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
            onClick={onCompleteProductAction}
          >
            {`${productAction}`}
          </button>
        </form>
      </div>
    </>
  );
}
