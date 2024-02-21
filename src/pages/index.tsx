import { useContext, FormEvent, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logoAgendamentoSP.png';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import ThemeSwitcher from '../core-components/theme-switcher';
import ThemeProvider from "../providers/theme-provider";

import Link from 'next/link';

import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault(); //não atualiza a página

    if(email === '' || password === ''){
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
    <Head>
      <title>Agendamento SP</title> 
    </Head>
    <div className={styles.containerCenter}>
      <Image className={styles.logo} src={logoImg} alt="Logo Agendamento SP" />

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <Input
            placeholder="Sua senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          
          <Button
            type="submit"
            loading={loading}
          >
            Acessar
          </Button>
        </form>

        <Link href="/signup" legacyBehavior>
           <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
        </Link>
         <ThemeSwitcher />
      </div>
    </div>
    </ThemeProvider>
    </>
  )
}

//usuários não logados
export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})