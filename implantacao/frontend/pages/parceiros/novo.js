import { useState } from 'react'
import { Client } from "../../services/api";

import shared from '../styles/Shared.module.css'

export default function NovoParceiro() {
  const [parceiro, setParceiro] = useState({})
  const [error, setError] = useState({
    message: "",
    status: false
  })

  const setParceiroField = (field, value) => {
    parceiro[field] = value
    setParceiro(aluno)
  }

  const create = async () => {
    const r = await Client.post("/parceiro", aluno)
    const { criado } = await r.json()

    if (r.status === 201 && criado === true) {
      return;
    }

    setError({
      status: true,
      message: body.erros
    })
  }

  return (
    <div className={shared.container}>
      <main className={shared.main}>
        <div className={shared.errorMessage}>
          {error.status && (<h1>error.message</h1>)}
        </div>

        <div>
          <div className={shared.inputgroup}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="João Silva"
              value={aluno.name}
              onChange={(e) => setParceiroField("name", e.target.value)}
            />
          </div>

          <button
            onClick={() => create()} 
          >Criar</button>

        </div>
      </main>
    </div>
  )
}

NovoParceiro.Title = "Criar Parceiro"