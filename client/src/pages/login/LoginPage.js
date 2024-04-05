import React, { useState } from "react";
import { useAuth } from "../../components/authcontext/AuthContext";
import styles from './LoginPage.module.css'

function LoginPage() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const handleLogin = () => {
    login(username, password)
  }

return (
  <div className={styles.loginContainer}>
    <h2 className={styles.h2}>Login</h2>
    <form>
      <label className={styles.label}>
        Username
        <br />
        <input className={styles.input}
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <br />
      <label className={styles.label}>
        Password
        <br />
        <input className={styles.input}
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="button" className={styles.button} onClick={handleLogin} >
          Login
      </button>
    </form>
    <p>Username is "admin" and the Password is "1234", feel free to add or edit roles</p>
  </div>
)

}

export default LoginPage
