import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CartItems = (props) => {
  const { product } = props;
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    addToCart,
    getCartItemQuantity,
    getItemSizes,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const createPdf = () => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please log in to generate PDF.");
      return;
    }

    const doc = new jsPDF();
    const title = "Your Cart Details";
    const titleX = doc.internal.pageSize.getWidth() / 2;
    doc.text(title, titleX, 10, { align: "center" });

    const data = [];
    all_product.forEach((item) => {
      const itemSizes = getItemSizes(item.id);
      for (const size in itemSizes) {
        if (itemSizes[size] > 0) {
          let total = item.new_price * itemSizes[size];
          data.push([item.name, size, itemSizes[size], item.new_price, total]);
        }
      }
    });

    doc.autoTable({
      head: [["Title", "Size", "Quantity", "Unit Price", "Total Price"]],
      body: data,
    });

    doc.save("cart_details.pdf");
  };

  // Function to get all cart items with their sizes and quantities
  const getCartItemsWithSizes = () => {
    const items = [];
    all_product.forEach((product) => {
      const sizes = getItemSizes(product.id);
      for (const size in sizes) {
        if (sizes[size] > 0) {
          items.push({
            ...product,
            size,
            quantity: sizes[size],
            total: product.new_price * sizes[size]
          });
        }
      }
    });
    return items;
  };

  return (
    <div className="main-cart">
      <div className="flex items-center justify-between mx-[150px]">
        <h1 className="text-2xl font-bold">Your Cart List</h1>
        <button
          className="bg-black text-white text-xl font-bold py-2 px-6 rounded-md"
          onClick={createPdf}
        >
          Print Cart details
        </button>
      </div>

      <div className="cartitems">
        <div className="cartitems-fomate-main">
          <p>Products</p>
          <p>Title</p>
          <p>Size</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {getCartItemsWithSizes().map((item, index) => (
          <div key={`${item.id}-${item.size}-${index}`}>
            <div className="cartitems-formate cartitems-fomate-main">
              <img src={item.image} alt="" className="carticon-product-icon" />
              <p>{item.name}</p>
              <p className="size-display">{item.size}</p>
              <p>Rs.{item.new_price}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    removeFromCart(item.id, item.size);
                  }}
                  className="cartitems-quantity"
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => {
                    addToCart(item.id, item.size);
                  }}
                  className="cartitems-quantity"
                >
                  +
                </button>
              </div>

              <p>Rs.{item.total}</p>
              <img
                className="cartitems-remove-icon w-[15px] cursor-pointer mx-10 my-0"
                src={remove_icon}
                onClick={() => {
                  // Remove all quantities of this size
                  for (let i = 0; i < item.quantity; i++) {
                    removeFromCart(item.id, item.size);
                  }
                }}
                alt="Remove"
              />
            </div>
            <hr />
          </div>
        ))}
        
        {getCartItemsWithSizes().length === 0 && (
          <div className="empty-cart-message">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        )}
        
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total </h3>
                <h3>Rs.{getTotalCartAmount()}</h3>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="catritems-promobox">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;