import fetch from 'node-fetch';
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import FormPage from './pages/FormPage';
import Home from './pages/Home';

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

  it('should render the Home', () => {
    render(<Home />);
    const input = screen.getByRole('heading');
    expect(input).toHaveTextContent('Hello these are characters from the Rick & Morty');
  });

  it('should render Card ', async () => {
    const { findByText } = render(<Home />);
    expect(await findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should render Detaited Card', async () => {
    const { findByText } = render(<Home />);
    const card = await findByText('Rick Sanchez');
    await fireEvent.click(card);
    expect(await findByText('Last known location: Citadel of Ricks')).toBeInTheDocument();
  });
});
