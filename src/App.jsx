import "./App.css";
import NavBar from "./components/navbar.jsx";
import { Outlet } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
