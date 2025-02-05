import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Home from "./pages/home/Home";
import Footer from "./component/footer/Footer";
import Contact from "./pages/contact/Contact";
import Aboutus from "./pages/AboutUs/Aboutus";
import "./index.css";
import PrivacyPolicy from "./pages/policies/privacypolicy/PrivacyPolicy";
import FAQ from "./pages/policies/faqSection/FaqSection";
import Terms from "./pages/policies/termsandcondition/Terms";
import RefundPolicy from "./pages/policies/refundandreturnpolicy/RefundPolicy";
import Chatbot from "./pages/chatbot/Chatbot";
import CartPage from "./pages/Cart/CartPage";
import Orders from "./pages/orders/Orders";
import WishList from "./pages/wishlist/Wishlist";
import ProfilePage from "./component/profilePage/ProfilePage";
import ShippingPolicy from "./pages/policies/Shipping/ShippingPolicy";
import ScrollToTop from "./component/footer/ScrollToTop";

import SeasonWear from "./seasonWearOutlet/SeasonWear";
import SeasonWearDetails from "./seasonWearOutlet/SeasonWearDetails";
import CancellationPolicy from "./pages/policies/cancelpolicy/CancellationPolicy";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cancellationPolicy" element={<CancellationPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/:seasonwear" element={<SeasonWear />} />
        <Route path="/:seasonwear/:id" element={<SeasonWearDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
