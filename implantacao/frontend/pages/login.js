import { useState } from 'react'
import { Client } from "../services/api";

import styles from '../styles/Login.module.css'
import shared from '../styles/Shared.module.css'

export default function Login() {
  const [usuario, setUsuario] = useState(undefined)
  const [senha, setSenha] = useState(undefined)

  const login = () => {
    Client.post("/signin", { usuario, senha })
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <div className={shared.inputGroup}>
          <label htmlFor="email" >Email</label>
          <input
            id="email"
            type="email"
            placeholder="joao@gmail.com"
            value={usuario && usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className={shared.inputGroup}>
          <label htmlFor="password" >Senha</label>
          <input
            id="password"
            type="password"
            placeholder="12345678"
            value={senha && senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button
          onClick={() => login()}
        >Entrar</button>
      </main>
    </div>
  )
}

Login.Title = "Login"