import { useRouter } from 'next/dist/client/router'
import shared from '../styles/Shared.module.css'

export default function Aluno() { 
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={shared.container}>
      <main className={shared.main}>
        <h1>Aluno {id}</h1>
        <h2>Saldo: {0}</h2>

        <div>
          <div className={shared.inputgroup}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="João Silva"
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="joao@gmail.com"
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="rg" >RG</label>
            <input
              id="rg"
              type="text"
              placeholder="mg19234572"
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="CPF">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="111.111.111-11"
            />
          </div>

          <div className={shared.inputgroup}>
            <label htmlFor="address">Endereço</label>
            <input
              id="address"
              type="text"
              placeholder="Rua Manoel Campos, 12, Funcionarios, BH, MG, Brasil"
            />
          </div>

        </div>
      </main>
    </div>
  )
}

Aluno.Title = "Aluno"