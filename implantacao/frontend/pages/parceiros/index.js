import { useState } from 'react'
import { Client } from "../../services/api";

import styles from '../styles/Home.module.css'

export default async function Parceiros() { 
  const [parceiros, setParceiros] = useState([])
  const [load, setLoad] = useState(false)

  if (!load) {
    const r = await Client.get("/parceiro")

    setParceiros(await r.json())
    setLoad(true)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Todos os parceiros</h1>

        <div>
          {parceiros.length == 0 && (<h1>Carregando...</h1>)}
          <table>
            <thead>
              <tr>
                <td>Id</td>
                <td>Nome</td>
              </tr>
            </thead>
            <tbody>
              {parceiros.map(p => (
                <tr key={p.id}>
                  <td>p.id</td>
                  <td>p.nome</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

Parceiros.Title = "Todos os Parceiros"