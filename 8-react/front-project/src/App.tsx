import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/login/login";
import HomePage from "./home";

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
