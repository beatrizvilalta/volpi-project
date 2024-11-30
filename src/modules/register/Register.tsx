import "../Register/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/IconVolpiWithName.svg";
import localDataProvider from "../../localDataProvider";
import { RequestType, UserModel } from "../../types";
import { request } from "../../Api";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const requestRegister = async () => {
    const data = {
      name: name,
      password: password,
      email: email,
    };

    try {
      const userResponse = await request<UserModel>(
        "/auth/register",
        RequestType.post,
        data
      );
      localDataProvider.setuser(userResponse);
      localDataProvider.setToken(userResponse.token);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setErrorMessage("falha ao registrar usuário");
      setHasError(true);
      setLoading(false);
    }
  };

  // const requestRegister = async () => {
  //   console.log("start request");
  //   const data = {
  //     name: name,
  //     password: password,
  //     email: email,
  //   };

  //   try {
  //     const response = await axios.post<UserModel>(
  //       "https://volpi-api-ec9e2c714aa7.herokuapp.com/auth/register",
  //       data
  //     );
  //     const userResponse = response.data;
  //     if (response.status == 200) {
  //       localDataProvider.setuser(userResponse);
  //       localDataProvider.setToken(userResponse.token);
  //       navigate("/");
  //     } else {
  //       setErrorMessage("falha ao registrar usuário");
  //       setHasError(true);
  //     }
  //   } catch (error) {
  //     console.error("Erro ao fazer o POST request:", error);
  //     setErrorMessage("falha ao registrar usuário");
  //     setHasError(true);
  //     setLoading(false);
  //   }
  // };

  function handleClickRegister() {
    const isFormValid = validateForm();

    if (isFormValid) {
      setLoading(true);
      console.log("start request");
      requestRegister();
    } else {
      setLoading(false);
    }
  }

  function validateForm() {
    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setHasError(true);
      setErrorMessage("Todos os campos são obrigatórios");
      return false;
    } else if (password != confirmPassword) {
      setHasError(true);
      setErrorMessage("Os campos de senha devem ser iguais");
      return false;
    } else if (password.length < 8) {
      setHasError(true);
      setErrorMessage("A senha deve ter pelo menos 8 caracteres");
      return false;
    } else {
      setHasError(false);
      return true;
    }
  }

  function isEmpty(text: string) {
    return text.length == 0;
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
              <p className="register-title has-text-weight-medium has-text-centered mb-2">
                Criar conta
              </p>
              <div className="field">
                <label className="label is-black">Nome:</label>
                <div className="control">
                  <input
                    className="input login-input"
                    type="text"
                    placeholder="Digite seu nome"
                    disabled={loading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label is-black">Email:</label>
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
                <label className="label is-black">Senha:</label>
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
              <div className="field">
                <label className="label is-black">Confirmar senha:</label>
                <div className="control">
                  <input
                    className="input login-input"
                    type="password"
                    placeholder="Repita sua senha"
                    disabled={loading}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={handleClickRegister}
                  >
                    Criar conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
