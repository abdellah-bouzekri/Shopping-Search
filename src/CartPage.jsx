import React, { useState } from "react";

function CartPage({ Cart, setCart }) {
  const totalprice = Cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // function to multiply the quantity by 2
  function handleAddItem(itemId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 p-8">
      {Cart.length === 0 ? (
        <p className="text-lg font-bold text-center">Cart is Empty</p>
      ) : (
        Cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center p-4 border rounded flex-col font-bold">
            <h2>
              {item.title.length > 20
                ? item.title.slice(0, 30) + "..."
                : item.title}
            </h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            <img src={item.image} alt="image" width={70} />
            {/* "+" Button to multiply quantity */}
            <button
              className="bg-blue-500 text-white font-bold p-1 mt-2"
              onClick={() => handleAddItem(item.id)}>
              +
            </button>
          </div>
        ))
      )}
      <h3 className="font-bold text-lg">
        Total Price: ${totalprice.toFixed(2)}
      </h3>
    </div>
  );
}

export default CartPage;
