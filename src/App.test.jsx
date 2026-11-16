import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the landing page buttons', () => {
  window.history.pushState({}, '', '/');
  const { getByText } = render(<App />);
  expect(getByText('New Game')).toBeInTheDocument();
  expect(getByText('Join Game')).toBeInTheDocument();
});

test('renders a room page', () => {
  window.history.pushState({}, '', '/123456');
  const { getByText } = render(<App />);
  expect(getByText('Leave Room')).toBeInTheDocument();
});
