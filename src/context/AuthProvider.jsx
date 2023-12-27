import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "fatemeh",
  email: "fatemeh@gmail.com",
  password: "1234",
};
const AuthContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      break;
  }
}
export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
