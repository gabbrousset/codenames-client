import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the landing page buttons', () => {
  const { getByText } = render(<App />);
  expect(getByText('New Game')).toBeInTheDocument();
  expect(getByText('Join Game')).toBeInTheDocument();
});
