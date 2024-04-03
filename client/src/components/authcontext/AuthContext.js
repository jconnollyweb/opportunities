import React, { createContext, useContext, useState} from "react";

const AuthContext = createContext()

export const  AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)

  const login = (username, password) => {
    if (username === "admin" && password === "1234") {
      setAuthenticated(true)
    }
  }

  const logout = () => {
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }} >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
