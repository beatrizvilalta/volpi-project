import { UserModel } from "types";

const keyUser = "user";
const keyToken = "token";

interface userDataManager {
  setToken: (token: string) => void;
  getToken: () => string | null;
  removeToken: () => void;
  setuser: (user: UserModel) => void;
  getUser: () => UserModel | null;
  removeUser: () => void;
}

const localDataProvider: userDataManager = {
  setToken: (token: string) => {
    localStorage.setItem(keyToken, token);
  },
  getToken: () => {
    return localStorage.getItem(keyToken);
  },
  removeToken: () => {
    localStorage.removeItem(keyToken);
  },
  setuser: (user: UserModel) => {
    try {
      const serializedValue = JSON.stringify(user);
      localStorage.setItem(keyUser, serializedValue);
    } catch (error) {
      console.error("Erro ao salvar no localStorage", error);
    }
  },
  getUser: () => {
    try {
      const storedValue = localStorage.getItem(keyUser); // Pegando do localStorage
      if (storedValue) {
        return JSON.parse(storedValue) as UserModel; // Convertendo de volta para o tipo desejado
      }
      return null; // Retorna null caso o item não exista
    } catch (error) {
      console.error("Erro ao recuperar do localStorage", error);
      return null;
    }
  },
  removeUser: () => {
    localStorage.removeItem(keyUser);
  },
};

export default localDataProvider;
