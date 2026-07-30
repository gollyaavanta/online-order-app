import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};