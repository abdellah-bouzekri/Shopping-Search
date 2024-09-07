import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CartPage from "./CartPage";
function App() {
  const [api, setApi] = useState([]);
  const [Cart, setCart] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  // function to add produit to cart

  function AddToCart(item) {
    setCart((pervcart) => {
      const productInCart = pervcart.find((product) => product.id == item.id);
      if (productInCart) {
        return pervcart.map((product) => product.id === item.id)
          ? { ...product, quantity: product.quantity + 1 }
          : product;
      } else {
        return [...pervcart, { ...item, quantity: 1 }];
      }
    });
    // scroll to top when the click
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // function for total price bro
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
  // function for search
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

  return (
    <>
      <Router>
        <nav>
          <Link to="/" className="p-4 bg-gray-500 pb-3 m-4 rounded-lg">
            Products🔙
          </Link>
          <Link to="/cart" className="p-4">
            Cart ({Cart.length})
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-slate-900 text-center font-bold text-3xl">
                  Shopping Cart App
                </h1>
                <div className="flex justify-center p-3">
                  <input
                    className="m-auto p-6 rounded-l bg-slate-300"
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
                      className="flex flex-col items-center p-4 border rounded-lg shadow-md w-64 ">
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
    </>
  );
}

export default App;
