import React from 'react';
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom"
import { useCart } from "../contexts/cartContext"
import './ShoppingCart.css'

export const ShoppingCart = ({ isCheckoutPage, setIsOpen, className, onCheckout }) => {

  const { cart, totalPrice, clearCart } = useCart()

  return (
    <div className="cart">
      <div>
        { cart.length < 1 && (
          <div className="cart-empty">
            <p>Your cart is empty</p>
          </div>
        )}
        <div className='Item'>
        {cart.map(item =>
          item.product ? (
            <div key={`cart_${item.product._id}`} className="cart-item">
              <img
                src={item.product.images && item.product.images[0]}
                alt={item.product.title}
                className="cart-item-thumbnail"
                style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "6px", marginRight: "10px" }}
              />
              <span>{item.product.title}</span>
              <span>x{item.quantity}</span>
            </div>
          ) : null
        )}
      </div>
      </div>
      <div className={`cart-footer ${className}`}>
        <div className={`checkout-summery-box ${className}`}>
        <p className={`total-text ${className}`}>Total Price: <span className='total-price'>{ totalPrice }:-</span> </p>
          <p className={`total-text ${className}`}>Number of items: <span className='total-price'>{ cart.length }</span> </p>
          <p className='total-text'>Total Quantity: <span className='total-price'>{ cart.reduce((total, item) => total + item.quantity, 0) }</span> </p>
          <div className='checkout-stuff'>
          { isCheckoutPage
            ? (
              <>
                <button onClick={clearCart} className="cart-button">Clear Cart</button>
                {isCheckoutPage && (
                <button onClick={onCheckout} className="place-order-button">
                  Place order
                </button>
                )}
              </>
            )
            : <Link onClick={() => setIsOpen(false)} to="/checkout" className={`checkout-summery-box ${className}`}>Checkout</Link>
          }
          
        </div>
        </div>
      </div>
    </div>
  )
}