import React from "react";
import "./App.css";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <div className="App">
      <h1>
        <i>
          <span style={{ color: "green" }}>Coingecko-clone</span>
        </i>
      </h1>
      <CoinDetails />
    </div>
  );
}

export default App;
