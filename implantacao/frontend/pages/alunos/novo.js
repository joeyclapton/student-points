import { useState } from 'react'
import { Client } from "../../services/api";

import shared from '../styles/Shared.module.css'

export default function NovoAluno() {
  const [aluno, setAluno] = useState({})
  const [error, setError] = useState({
    message: "",
    status: false
  })

  const setAlunoField = (field, value) => {
    aluno[field] = value
    setAluno(aluno)
  }

  const create = async () => {
    const r = await Client.post("/aluno", aluno)
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
              onChange={(e) => setAlunoField("name", e.target.value)}
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="joao@gmail.com"
              value={aluno.email}
              onChange={(e) => setAlunoField("email", e.target.value)}
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="rg" >RG</label>
            <input
              id="rg"
              type="text"
              placeholder="mg19234572"
              value={aluno.rg}
              onChange={(e) => setAlunoField("rg", e.target.value)}
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="CPF">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="111.111.111-11"
              value={aluno.cpf}
              onChange={(e) => setAlunoField("cpf", e.target.value)}
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="endereco">Endereço</label>
            <input
              id="endereco"
              type="text"
              placeholder="Rua Manoel Campos, 12, Funcionarios, BH, MG, Brasil"
              value={aluno.endereco}
              onChange={(e) => setAlunoField("endereco", e.target.value)}
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

NovoAluno.Title = "Criar Aluno"