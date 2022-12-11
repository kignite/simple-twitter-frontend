import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* UserSignup */}
          <Route path="/login" element={<LoginPage />}/>
          {/* <Route path="/" element={<Layout />}/> */}
          <Route path="/" element={<Layout />}>
            {/* <Route path="home" element={} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
