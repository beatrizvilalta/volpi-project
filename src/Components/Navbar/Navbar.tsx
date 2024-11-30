import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/Logo";
import LocalDataProvider from "../../localDataProvider";

function Navbar() {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = LocalDataProvider.getUser();
    if (user) {
      setIsUserLogged(true);
    }
  }, [isUserLogged]);

  function navigateToFileForm() {
    navigate("/addPostForm");
  }

  function handleLogoutClick() {
    LocalDataProvider.removeUser();
    LocalDataProvider.removeToken();
    setIsUserLogged(false);
    window.location.reload();
  }

  function handleLoginClick() {
    navigate("/login");
  }

  function handleHomeTap() {
    navigate("/");
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand" onClick={handleHomeTap}>
          <a className="navbar-item">
            <Logo iconColor="#FFFFFF" />
          </a>
        </div>

        <div className="navbar-menu navbar is-active">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isUserLogged && (
                  <>
                    <a
                      className="button is-rounded is-light is-navbar-purple"
                      onClick={navigateToFileForm}
                    >
                      <strong>Adicionar conteúdo</strong>
                    </a>
                    <a
                      className="button is-rounded is-light is-red"
                      onClick={handleLogoutClick}
                    >
                      <strong>Sair</strong>
                    </a>
                  </>
                )}
                {!isUserLogged && (
                  <a
                    className="button is-rounded is-light is-navbar-purple"
                    onClick={handleLoginClick}
                  >
                    <strong>Iniciar sessão</strong>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
