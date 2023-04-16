import fetch from 'node-fetch';
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import store from './store';

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

  it('succes render form page', () => {
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Form page');
  });

  it('should render the form', () => {
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    const form = screen.getByText('Add person');
    expect(form).toBeInTheDocument();
  });

  it('should render the Home', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const input = screen.getByRole('heading');
    expect(input).toHaveTextContent('Hello these are characters from the Rick & Morty');
  });

  it('should render Card ', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(await findByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should render Detaited Card', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const card = await findByText('Rick Sanchez');
    await fireEvent.click(card);
    expect(await findByText('Last known location: Citadel of Ricks')).toBeInTheDocument();
  });
});
