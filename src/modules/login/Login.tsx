import "./Login.css";
import { useState } from "react";
import Logo from "../../assets/IconVolpiWithName.svg";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleLoginClick() {
    // here perfom fetch and set error message if needed
    setLoading(true);
    if (email.length == 0 || password.length == 0) {
      setHasError(true);
      setLoading(false);
      setErrorMessage("Preencha todos os campos");
    } else {
      console.log("Email:", email);
      console.log("Senha:", password);
      setHasError(false);
    }
  }

  return (
    <>
      <div className="hero is-fullheight is-fullwidth login-background">
        <div className="container is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-fullheight">
          <span className="mt-4">
            <a href="/">
              <img src={Logo} />
            </a>
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
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    disabled={loading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {hasError && (
                <div className="message is-danger mt-4">
                  <div className="message-body has-background-light">
                    {errorMessage}
                  </div>
                </div>
              )}

              <div className="field">
                <div className="control">
                  <button
                    className={`button login-button has-text-white ${
                      loading ? "is-loading" : ""
                    }`}
                    onClick={handleLoginClick}
                  >
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
                    href="register"
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
