import NavBar from "./components/navbar.jsx";
import Pokedex from "./pages/pokedex/Pokedex.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <NavBar search={search} setSearch={setSearch} />
      <Pokedex search={search} />
    </>
  );
}

export default App;
