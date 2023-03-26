import fetch from 'node-fetch';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import FormPage from './pages/FormPage';

global.fetch = fetch as never;

describe('App', () => {
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });

  it('Renders not found if invalid path', () => {
    render(<FormPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Form page');
  });

  it('should render the form', () => {
    render(<FormPage />);
    const form = screen.getByText('Add person');
    expect(form).toBeInTheDocument();
  });
});
