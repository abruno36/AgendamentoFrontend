import { useContext  } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

  const { signOut } = useContext(AuthContext)

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logoAgendamentoSP.png" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category" legacyBehavior>
            <a>Novo Agendamento</a>
          </Link>

          <Link href="/product" legacyBehavior>
            <a>Agendamentos</a>
          </Link>   

          <button onClick={signOut} className={styles.logoff}>
            <FiLogOut color="#FFF" size={24} />
          </button>       
        </nav>

      </div>
    </header>
  )
}