import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "../src/pages/Product";
import Homepage from "../src/pages/Homepage";
import Login from "../src/pages/Login";
import Pricing from "../src/pages/Pricing";
import PageNotFound from "../src/pages/PageNotFound";
import AppLayout from "../src/pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const url = "http://localhost:8000/";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${url}cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error couldn't fetch");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
