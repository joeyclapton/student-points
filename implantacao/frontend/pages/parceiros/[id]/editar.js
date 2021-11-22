import { useRouter } from 'next/dist/client/router'
import styles from '../styles/Home.module.css'

export default function Parceiro() { 
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Editando Parceiro {id}</h1>

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
      </main>
    </div>
  )
}

Parceiro.Title = "Editar Parceiro"