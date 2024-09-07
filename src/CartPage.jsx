import React from "react";

function CartPage({ Cart }) {
  const totalprice = Cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
