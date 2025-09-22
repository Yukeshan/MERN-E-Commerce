import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import LoginSignup from "./Pages/LoginSignup";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import Wish from "./Pages/Wish";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import UserProfile from "./Components/UserProfile/UserProfile";
import EditProfile from "./Components/UserProfile/EditProfile";
import Offers from "./Pages/Offers";
import PlaceOrder from "./Components/PlaceOrder/PlaceOrder";
import OrderDone from "./Pages/OrderDone";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarWithConditionalRendering />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product" element={<Products />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orderDone" element={<OrderDone />} />
          <Route path="/myprofile" element={<UserProfile />} />
          <Route path="/editProfile/:id" element={<EditProfile />} />

          <Route path="/men" element={<ShopCategory category="men" />} />
          <Route path="/women" element={<ShopCategory category="women" />} />
          <Route path="/kids" element={<ShopCategory category="kids" />} />

          <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <FooterWithConditionalRendering />
      </BrowserRouter>
    </div>
  );
}

const NavbarWithConditionalRendering = () => {
  const location = useLocation();

  // Do not render Navbar on the OrderDone page
  if (location.pathname === "/orderDone") {
    return null;
  }

  return <Navbar />;
};

const FooterWithConditionalRendering = () => {
  const location = useLocation();

  // Do not render Footer on the OrderDone page
  if (location.pathname === "/orderDone") {
    return null;
  }

  return <Footer />;
};

export default App;
