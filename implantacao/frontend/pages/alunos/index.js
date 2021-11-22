import { useState } from 'react'
import { Client } from "../../services/api";

import styles from '../styles/Home.module.css'

export default async function Alunos() { 
  const [alunos, setAlunos] = useState([])
  const [load, setLoad] = useState(false)

  if (!load) {
    const r = await Client.get("/aluno")

    setAlunos(await r.json())
    setLoad(true)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Todos os alunos</h1>

        <div>
          {alunos.length == 0 && (<h1>Carregando...</h1>)}
          <table>
            <thead>
              <tr>
                <td>Id</td>
                <td>Nome</td>
                <td>Email</td>
                <td>RG</td>
                <td>CPF</td>
                <td>Saldo</td>
              </tr>
            </thead>
            <tbody>
              {alunos.map(p => (
                <tr key={p.id}>
                  <td>p.id</td>
                  <td>p.nome</td>
                  <td>p.email</td>
                  <td>p.rg</td>
                  <td>p.cpf</td>
                  <td>p.saldo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

Alunos.Title = "Todos os Alunos"