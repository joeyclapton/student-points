import { useState } from 'react'
import styles from '../styles/Login.module.css'
import shared from '../styles/Shared.module.css'

export default function Login() {
  const [email, setEmail] = useState(undefined)
  const [pass, setPass] = useState(undefined)

  const login = () => {
    const payload = { email, pass }
    console.log(payload)
    // make api call
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
            value={email && email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={shared.inputGroup}>
          <label htmlFor="password" >Senha</label>
          <input
            id="password"
            type="password"
            placeholder="12345678"
            value={pass && pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button>Entrar</button>
      </main>
    </div>
  )
}

Login.Title = "Login"