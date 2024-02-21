import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard, { HomeProps } from '../src/pages/dashboard';
import { setupServer } from 'msw/node';
import { handlers } from '../src/mocks/handlers';

const server = setupServer(...handlers);

const mockScheduling: HomeProps = {
  schedulings: [
    {
      id: '1',
      name: 'John Doe',
      plate: 'ABC123',
      date: '2022-02-20',
      hour: '10:00',
      washingType: 'Standard',
      status: false,
      vehicle: 'Car'}
  ],
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Dashboard Component', () => {
  it('renders scheduling list', async () => {
    render(<Dashboard {...mockScheduling} />);


    const schedulingItem = screen.getByText(/Placa - ABC123/i);
    expect(schedulingItem).toBeInTheDocument();
  });

  it('fetches and displays schedulings on load', async () => {
    render(<Dashboard {...mockScheduling} />);

    await waitFor(() => {
      const schedulingItem = screen.getByText(/Placa - ABC123/i);
      expect(schedulingItem).toBeInTheDocument();
    });
  });

  it('handles opening modal when button is clicked', async () => {
    render(<Dashboard {...mockScheduling} />);


    const openModalButton = screen.getByText(/Open Modal/i);

    fireEvent.click(openModalButton);

    const modalElement = screen.getByText(/Modal Content/i);
    expect(modalElement).toBeInTheDocument();
  })
});