import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';

import { Header } from '../../components/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

import { ModalScheduling } from '../../components/ModalScheduling';

import { toast } from 'react-toastify';

import Modal from 'react-modal';

type SchedulingProps = {
  id: string;
  name: string | null;
  plate: string,
  date: string,
  hour: string,
  washingType: string,
  status: boolean;
  vehicle: string;
}

export interface HomeProps{
  schedulings: SchedulingProps[];
}

export type SchedulingItemProps = {
    id: string;
    name: string | null;
    plate: string,
    date: string,
    hour: string,
    washingType: string,
    status: boolean;
    vehicle: string
  }

export default function Dashboard({ schedulings }: HomeProps){

  const [schedulingList, setSchedulingList] = useState(schedulings || [])

  const [modalItem, setModalItem] = useState<SchedulingItemProps>()
  const [modalVisible, setModalVisible] = useState(false);

 
  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string, plate: string){
   
     const apiClient = setupAPIClient(); 

     const response = await apiClient.get('/scheduling/detail', {
       params:{
        scheduling_id: id
       } 
     })

     setModalItem(response.data);
     setModalVisible(true);

  }

  async function handleFinishItem(id: string){
    console.log("id", id)
    const apiClient = setupAPIClient();
    await apiClient.put('/scheduling/finish', {
      scheduling_id: id,
    })

    const response = await apiClient.get('/schedulings');

    toast.success('Agendamento concluído com sucesso! ' )

    setSchedulingList(response.data);
    setModalVisible(false);
  }

  async function handleRefreshScueduling(){
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/schedulings')
    setSchedulingList(response.data);

  }

  Modal.setAppElement('#__next');

  return(
    <>
    <Head>
      <title>Painel - Agendamento SP</title>
    </Head>
    <div>
      <Header/>
    
      <main className={styles.container}>

        <div className={styles.containerHeader}>
          <h1>Últimos agendamentos</h1>
          <button onClick={handleRefreshScueduling}>
            <FiRefreshCcw size={25} color="#3fffa3"/>
          </button>
        </div>

        <article className={styles.listOreders}>

          {schedulingList.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum agendamento aberto foi encontrado...
            </span>
          )}

          {schedulingList.map( item => (
            <section  key={item.id} className={styles.orderItem}> 
              <button onClick={ () => handleOpenModalView(item.id, item.plate) }>
                <div className={styles.tag}></div>
                <span className={styles.plate}>Placa - {item.plate}</span>
              </button>
              <span className={styles.label}>Nome: </span><span className={styles.name}>{item.name}</span>
              <span className={styles.label}>Hora: </span><span className={styles.name}>{item.hour}hs</span>
              <span className={styles.label}>Tipo Lavagem: </span><span className={styles.name}>{item.washingType}</span>
            </section>
          ))}
                 
        </article>

      </main>

      { modalVisible && (
        <ModalScheduling
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          scheduling={modalItem}
          handleFinishScheduling={ handleFinishItem }
        />
      )}

    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/schedulings');

  return {
    props: {
      orders: response.data
    }
  }
})