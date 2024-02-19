import { useState, FormEvent, ChangeEvent } from 'react';
import Head from "next/head";
import {Header} from '../../components/Header';
import styles from './styles.module.scss';
import InputMask from 'react-input-mask';

import { toast } from 'react-toastify';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Scheduling(){
  const [plate, setPlate] = useState('')
  const [washingType, setWashingType] = useState('Simples')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [name, setName] = useState('')

  function handleOpcaoChange(event: ChangeEvent<HTMLSelectElement>): void {
        const newWashingType = event.target.value;
        setWashingType(newWashingType);
  }

    const changeDate = (e) => {
    setDate(e)
  }

  async function handleRegister(event: FormEvent){
    event.preventDefault(); //não atualiza a página

    try{
      if(plate === ''){
        toast.error('Informar a placa do veículo!')
        return;
      }
  
      if(name === ''){
        toast.error('Informar nome do cliente!')
        return;
      }

      if(date === ''){
        toast.error('Informar a data do agendamento!')
        return;
      }

      if(hour === ''){
        toast.error('Informar a hora do agendamento!')
        return;
      }

      const apiClient = setupAPIClient();
      const dataConvertida = converterDataFormato(date);

      if(validarPlacaMercosul(plate))
      {
          await apiClient.post('/scheduling', {
            plate: plate,
            name: name,
            washingType: washingType,
            date: dataConvertida,
            hour: hour
          })
          toast.success('Agendamento cadastrado com sucesso!')
          setPlate('');
          setWashingType('');
          setDate('');
          setHour('');
          setName('');
      } else 
      {
        toast.error('Placa inválida. Por favor, insira uma placa Mercosul válida!')
        return;
      }

    }catch(err){
      toast.error("Erro ao cadastrar - verificar se o agendamento já está cadastrado - " + name);
      console.log("erro ao cadastrar ", err);
    }
  }

  return(
    <>
    <Head>
      <title>Nova categoria</title>
    </Head>
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Novo Agendamento</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.line1}>
              <input 
              type="text" 
              placeholder="Placa"
              className={styles.input}
              value={plate}
              onChange={ (e) => setPlate(e.target.value) }
              />

              <select className={styles.washingType} value={washingType} onChange={handleOpcaoChange}>
                <option value="Simples">Simples</option>
                <option value="Completa">Completa</option>
              </select>              
          </div>

          <div className={styles.line1}>

              <InputMask 
              type="text" 
              mask="99/99/9999"
              placeholder="Data"
              className={styles.input}
              value={date}
              onChange={ (e) => setDate(e.target.value) }
              />

              <InputMask 
              type="text" 
              mask="99:99"
              placeholder="Horário"
              className={styles.input}
              value={hour}
              onChange={ (e) => setHour(e.target.value) }
              />
          </div>

          <input 
              type="text" 
              placeholder="Nome cliente"
              className={styles.input}
              value={name}
              onChange={ (e) => setName(e.target.value) }
              />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>

        </form>

      </main>
    </div>
    </>
  )
}

function converterDataFormato(input: string): string | null {
  const partes = input.split('/');
  
  if (partes.length === 3) {
    const dataFormatoISO = `${partes[2]}-${partes[1]}-${partes[0]}`;
    const data = new Date(dataFormatoISO);
    if (!isNaN(data.getTime())) {
      const dataFormatada = data.toISOString();
      return `${dataFormatada.substring(0, 10)}T00:00:00.000Z`;
    }
  }
  return null;
}

function validarPlacaMercosul(placa: string): boolean {
  const regexPlacaMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  return regexPlacaMercosul.test(placa);
}
//Somente usuários logados podem acessar esta página
export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }

})