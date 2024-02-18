import Modal from 'react-modal';
import styles from './style.module.scss';

import { FiX } from 'react-icons/fi'

import { SchedulingItemProps } from '../../pages/dashboard'

interface ModalSchedulingProps{
  isOpen: boolean;
  onRequestClose: () => void;
  scheduling: SchedulingItemProps;
  handleFinishScheduling: (id: string) => void;
}

export function ModalScheduling({ isOpen, onRequestClose, scheduling, handleFinishScheduling  }: ModalSchedulingProps){


  function formatDateString(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  }

const formattedDate = formatDateString(scheduling.date);

console.log(formattedDate); // Saída: '01/03/2024'

  const customStyles = {
    content:{
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    }
  };

  return(
   <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
   >

    <button
    type="button"
    onClick={onRequestClose}
    className="react-modal-close"
    style={{ background: 'transparent', border:0 }}
    >
      <FiX size={45} color="#f34748" />
    </button>

    <div className={styles.container}>

      <h2>Detalhes do agendamento</h2>

        <section key={scheduling.id} className={styles.containerItem}>
          <span className={styles.table}>
            Placa: <strong>{scheduling.plate}</strong>
          </span>
         <span> Nome: {scheduling.name}</span>
          <span className={styles.washingType}>
            Lavagem: {scheduling.washingType}
          </span>
           <span> Data: {formattedDate} - Horário: {scheduling.hour}</span>
        </section>


      <button className={styles.buttonOrder} onClick={ () => handleFinishScheduling(scheduling[0].id) }>
        Concluir Agendamento
      </button>


    </div>

   </Modal>
  )
}