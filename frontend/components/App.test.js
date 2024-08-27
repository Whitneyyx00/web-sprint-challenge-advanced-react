import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('renders all headings and buttons', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved/i)).toBeInTheDocument();
  expect(screen.getByText(/left/i)).toBeInTheDocument();
  expect(screen.getByText(/up/i)).toBeInTheDocument();
  expect(screen.getByText(/right/i)).toBeInTheDocument();
  expect(screen.getByText(/down/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
});

test('typing in the input changes its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/ type email/i);
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  expect(emailInput.value).toBe('test@test.com');
});