import "./Navbar.css";
import Logo from "../../assets/Logo";

interface Props {
  isUserLogged: boolean;
}

function Navbar({ isUserLogged }: Props) {
  function navigateToFileForm() {
    console.log("FOI PRA TELA DE ADD CONTEUDO");
  }

  function handleLogoutClick() {
    console.log("FEZ LOGOUT");
  }

  function handleLoginClick() {
    console.log("VAI PRO LOGIN");
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
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
