function NavBar({ search, setSearch }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container justify-content-center">
        <div className="navbar-brand me-4" to="/">
          <img
            className="navbar-logo"
            src="./img/types/pokedex-logo.png"
            alt="logo"
            style={{ maxWidth: "100px" }}
          />
        </div>

        <div className="d-flex" id="navbarSupportedContent">
          <form
            className="d-flex"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Pokemon"
              value={search}
              onChange={(event) => setSearch(event.target.value.toLowerCase())}
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
