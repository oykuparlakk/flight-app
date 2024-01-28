// src/App.js
import React from "react";
import Header from "./components/Header/Header";
import FlightForm from "./components/Form/Form";
import SearchList from "./components/List/SearchList";
import { FlightProvider } from "./context/FlightContext";

function App() {
  return (
    <FlightProvider>
      <div className="App">
        <Header />
        <FlightForm />
        <SearchList />
      </div>
    </FlightProvider>
  );
}

export default App;
