function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container justify-content-center">
        <div className="navbar-brand me-4" to="/">
          <img
            className="navbar-logo"
            src="./img/types/pokedex-logo.png"
            alt="logo"
          />
        </div>

        <div className="d-flex" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
            />
            <button
              className="btn btn-warning btn-outline-success"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
