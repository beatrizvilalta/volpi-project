import "./Login.css";
import Logo from "../../assets/IconVolpiWithName.svg";

function Login() {
  return (
    <>
      <div className="hero is-fullheight is-fullwidth login-background">
        <div className="container is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-fullheight">
          <span className="mt-4">
            <img src={Logo} />
          </span>
          <div className="card has-background-white login-card my-4 mx-2">
            <div className="card-content">
              <p className="login-title has-text-weight-medium has-text-centered mb-2">
                Entrar
              </p>

              <div className="field">
                <label className="label is-black">Email</label>
                <div className="control">
                  <input
                    className="input login-input"
                    type="email"
                    placeholder="Digite seu e-mail"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label is-black">Senha</label>
                <div className="control">
                  <input
                    className="input login-input"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>

              <div className="message is-danger mt-4">
                <div className="message-body has-background-light">
                  Login ou senha incorretos
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-loading login-button has-text-white">
                    Entrar
                  </button>
                </div>
              </div>

              <p className="has-text-centered register-text mt-4">
                Ainda não possui uma conta?
                <span>
                  {" "}
                  <a
                    className="register-text register-link has-text-weight-medium"
                    href="#register"
                  >
                    Crie a sua
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
