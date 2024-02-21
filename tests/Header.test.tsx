import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContext } from '../src/contexts/AuthContext';
import { Header } from '../src/components/Header';

const mockSignOut = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  __esModule: true,
  default: AuthContext,
  Consumer: ({ children }: { children: (value: any) => React.ReactNode }) =>
    children({ signOut: mockSignOut }),
}));

describe('Header Component', () => {
  it('renders without crashing', () => {
    const { getByAltText, getByText } = render(<Header />);

    expect(getByAltText('Logo')).toBeInTheDocument();
    expect(getByText('Novo Agendamento')).toBeInTheDocument();
    expect(getByText('Agendamentos')).toBeInTheDocument();
    expect(getByText('Sair')).toBeInTheDocument();
  });

  it('calls signOut when "Sair" button is clicked', () => {
    const { getByText } = render(<Header />);
    const signOutButton = getByText('Sair');

    fireEvent.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
});