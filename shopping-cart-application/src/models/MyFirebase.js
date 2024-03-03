import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default function MyFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyC5PXm6G95rkci49nWXVLi6dvoD2nVcOGc",
    authDomain: "shoppingcart-c69ac.firebaseapp.com",
    projectId: "shoppingcart-c69ac",
    storageBucket: "shoppingcart-c69ac.appspot.com",
    messagingSenderId: "1076077748257",
    appId: "1:1076077748257:web:a7ff4df7a096ec40780360",
    measurementId: "G-3QQVT4F7WE",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const myDatabase = getFirestore(app);

  const me = {};

  me.getProducts = async () => {
    const products = [];
    const productsRef = collection(myDatabase, "products");
    const fetchedProducts = await getDocs(productsRef);
    for (const doc of fetchedProducts.docs) {
      products.push({ id: doc.id, data: doc.data() });
    }
    return products;
  };

  me.addProductsToCart = async (product) => {
    let response = {};
    const cartRef = collection(myDatabase, "cart");
    try {
      const { id, data } = product;
      const productDocRef = doc(cartRef, id);
      await setDoc(productDocRef, {
        productName: data.productName,
        productPrice: data.productPrice,
      });
      console.log("Products added to cart successfully");
      response = {
        success: true,
        message: "Products added to cart successfully",
      };
      return response;
    } catch (error) {
      console.error("Error adding products to cart:", error);
      response = { success: false, message: "Failed to add products to cart" };
      return response;
    }
  };

  me.fetchProductsInCart = async () => {
    const productsInCart = [];
    const cartRef = collection(myDatabase, "cart");
    const fetchedProducts = await getDocs(cartRef);
    for (const doc of fetchedProducts.docs) {
      productsInCart.push({ id: doc.id, data: doc.data() });
    }
    return productsInCart;
  };

  me.fetchCountInCart = async () => {
    let cartItemCount = 0;
    const cartRef = collection(myDatabase, "cart");
    const fetchedProducts = await getDocs(cartRef);
    cartItemCount = fetchedProducts.docs.length;
    return cartItemCount;
  };

  me.removeProductsFromCart = async (product) => {
    console.log("Removing products from cart", product);
    let response = {};
    const cartRef = collection(myDatabase, "cart");
    console.log("cartRef", cartRef);
    try {
      await deleteDoc(doc(cartRef, product.id));
      console.log("Products removed from cart successfully");
      response = {
        success: true,
        message: "Products removed from cart successfully",
      };
      return response;
    } catch (error) {
      console.error("Error removing products from cart:", error);
      response = {
        success: false,
        message: "Failed to remove products from cart",
      };
      return response;
    }
  };

  me.addNewProduct = async (product) => {
    console.log("Adding new product", product);
    const productsRef = collection(myDatabase, "products");
    console.log("productsRef", productsRef);
    try {
      await setDoc(doc(productsRef), {
        productName: product.productName,
        productPrice: product.productPrice,
      });
      console.log("New product added successfully");
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  me.deleteProduct = async (product) => {
    console.log("Deleting products", product);
    const productRef = collection(myDatabase, "products");
    try {
      await deleteDoc(doc(productRef, product.id));
      console.log("Products removed from cart successfully");
    } catch (error) {
      console.error("Error removing products from cart:", error);
    }
  };

  return me;
}

export const myFirebase = new MyFirebase();
