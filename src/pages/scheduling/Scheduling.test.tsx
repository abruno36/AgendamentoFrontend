import { render, screen, fireEvent, act } from '@testing-library/react';
import Scheduling from '../scheduling';

jest.mock('react-input-mask', () => ({ children }) => children);

describe('Scheduling component', () => {
  test('renders correctly', async () => {
    render(<Scheduling />);
    
    expect(screen.getByText('Novo Agendamento')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Placa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Data')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Horário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome cliente')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  test('envia formulário com dados válidos', async () => {
    render(<Scheduling />);
    
    fireEvent.change(screen.getByPlaceholderText('Placa'), { target: { value: 'ABC1D34' } });
    fireEvent.change(screen.getByPlaceholderText('Data'), { target: { value: '01/01/2024' } });
    fireEvent.change(screen.getByPlaceholderText('Horário'), { target: { value: '12:00' } });
    fireEvent.change(screen.getByPlaceholderText('Nome cliente'), { target: { value: 'John Doe' } });

    fireEvent.click(screen.getByText('Cadastrar'));
  });
});