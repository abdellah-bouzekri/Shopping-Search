import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CartPage from "./CartPage";

function App() {
  const [api, setApi] = useState([]);
  const [Cart, setCart] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  async function ProductApi() {
    const response = await fetch(
      "https://fakestoreapi.in/api/products?limit=12"
    );
    const data = await response.json();
    setApi(data.products);
  }

  useEffect(() => {
    ProductApi();
  }, []);

  // Add product to cart
  function AddToCart(item) {
    setCart((prevCart) => {
      const productInCart = prevCart.find((product) => product.id === item.id);
      if (productInCart) {
        return prevCart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Total price calculation
  function TotalPrice() {
    const total = Cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }

  useEffect(() => {
    TotalPrice();
  }, [Cart]);

  // Handle search input
  function handleSearch(e) {
    const searchItem = e.target.value.toLowerCase();
    setSearch(searchItem);
    const filterProducts = api.filter((product) =>
      product.title.toLowerCase().includes(searchItem)
    );
    setFilteredProducts(filterProducts);
  }

  useEffect(() => {
    setFilteredProducts(api);
  }, [api]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div
        className={`w-full relative min-h-screen ${
          darkMode ? "bg-slate-900 text-white" : "bg-white text-black"
        }`}>
        <button
          className="absolute top-0 right-0 py-3 px-3"
          onClick={handleToggle}>
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
        </button>

        <Router>
          <nav className="flex items-center justify-evenly ">
            <Link
              to="/"
              className={`p-4 pb-3 m-4 rounded-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-500 text-black"
              }`}>
              Products🔙
            </Link>
            <Link
              to="/cart"
              className={`p-4 flex gap-1 rounded-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-slate-400"
              }`}>
              <h1>Cart ({Cart.length})</h1>
              <span> 🛒</span>
            </Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1
                    className={`text-center font-bold text-3xl ${
                      darkMode ? "text-white" : "text-black"
                    }`}>
                    Shopping Cart App
                  </h1>
                  <div className="flex justify-center p-3">
                    <input
                      className={`m-auto p-6 rounded-l ${
                        darkMode ? "bg-gray-700 text-white" : "bg-slate-300"
                      }`}
                      type="text"
                      placeholder="Search for products..."
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="flex items-center justify-center flex-wrap gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`flex flex-col items-center p-4 border rounded-lg shadow-md w-64 ${
                          darkMode ? "bg-gray-800 border-gray-600" : "bg-white"
                        }`}>
                        <img
                          src={product.image}
                          loading="lazy"
                          alt={product.title}
                          className="w-full h-48 object-contain mb-2"
                        />
                        <h3 className="text-lg font-semibold text-center mb-1">
                          {product.title.length > 20
                            ? product.title.slice(0, 30) + "..."
                            : product.title}
                        </h3>
                        <p className="text-xl font-bold text-green-600">
                          ${product.price}
                        </p>
                        <button
                          onClick={() => AddToCart(product)}
                          className="bg-blue-500 hover:bg-orange-700 text-white font-bold rounded-sm p-3">
                          Add To Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            <Route
              path="/cart"
              element={<CartPage Cart={Cart} setCart={setCart} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
