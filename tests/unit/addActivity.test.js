import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ActivityDetails from '../../src/components/activity/ActivityDetails';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';

const mockStore = configureStore([thunk]); // Ensure thunk is passed correctly as an array

const initialState = {
  pets: {
    currentPet: { id: '123', name: 'Fluffy' },
  },
};

let store;

describe('ActivityDetails', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    fetch.mockClear();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <ToastContainer />
        <ActivityDetails />
      </Provider>
    );

    fireEvent.click(getByRole('button', { name: /save activity details/i }));

    await waitFor(() => {
      expect(getByText(/please fill in all the fields/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ activity: { type: 'Running', duration: '30', intensity: 'Medium' } }),
    });

    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <ToastContainer />
        <ActivityDetails />
      </Provider>
    );

    fireEvent.change(getByLabelText(/default select example/i), { target: { value: 'Running' } });
    fireEvent.change(getByLabelText(/select duration/i), { target: { value: '30' } });
    fireEvent.change(getByLabelText(/default select example/i), { target: { value: 'Medium' } });

    fireEvent.click(getByRole('button', { name: /save activity details/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://cscloud7-95.lnu.se/petsee/pet/123/activitydetails',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ type: 'Running', duration: '30', intensity: 'Medium' }),
        })
      );
    });
  });

  it('handles failed form submission', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to save activity details' }),
    });

    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <ToastContainer />
        <ActivityDetails />
      </Provider>
    );

    fireEvent.change(getByLabelText(/default select example/i), { target: { value: 'Running' } });
    fireEvent.change(getByLabelText(/select duration/i), { target: { value: '30' } });
    fireEvent.change(getByLabelText(/default select example/i), { target: { value: 'Medium' } });

    fireEvent.click(getByRole('button', { name: /save activity details/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to save activity details');
    });
  });
});
