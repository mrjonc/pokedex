import "./App.css";
import NavBar from "./components/navbar.jsx";
import Pokedex from "./pages/pokedex/Pokedex.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Pokedex />
    </>
  );
}

export default App;
