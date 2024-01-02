import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "../src/pages/Product";
import Homepage from "../src/pages/Homepage";
import Login from "../src/pages/Login";
import Pricing from "../src/pages/Pricing";
import PageNotFound from "../src/pages/PageNotFound";
import AppLayout from "../src/pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="cities" element={<p>List of cities</p>} />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
