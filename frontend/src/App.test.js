import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders login page by default', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
});

test('renders inventory page on navigation', () => {
  render(
    <MemoryRouter initialEntries={['/inventory']}>
      <App />
    </MemoryRouter>
  );
});
