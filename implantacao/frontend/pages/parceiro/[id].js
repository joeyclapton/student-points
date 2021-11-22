import { useRouter } from 'next/dist/client/router'
import styles from '../styles/Home.module.css'

export default function Parceiro() { 
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Parceiro {id}</h1>
      </main>
    </div>
  )
}

Parceiro.Title = "Parceiro"