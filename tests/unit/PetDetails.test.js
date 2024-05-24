import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PetDetails from '../../src/components/Profile/PetDetails.jsx';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: () => ({ id: '123' }),
}));

// Mock ToastContainer to prevent errors during tests
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));

describe('PetDetails', () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    global.fetch.mockRestore();
    localStorage.clear();
  });

  const renderComponent = async () => {
    let utils;
    await act(async () => {
      utils = render(
        <Router>
          <ToastContainer />
          <PetDetails />
        </Router>
      );
    });
    return utils;
  };

  it('shows validation errors for empty fields', async () => {
    const { getByRole } = await renderComponent();

    fireEvent.click(getByRole('button', { name: /save pet details/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Please fill in all the fields'));
    });
  });

  it('submits the form successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        id: '123',
        name: 'Fluffy',
        age: '2',
        weight: '10',
        length: '50',
        favouriteFood: 'Bone',
        favouriteToy: 'Ball',
        medicalNotes: 'None',
        animalType: 'Dog',
        caloriesDay: '500',
        activitiesDay: '3',
      }),
    });

    const { getByRole, getByLabelText } = await renderComponent();

    fireEvent.change(getByLabelText('Name'), { target: { value: 'Fluffy' } });
    fireEvent.change(getByLabelText('Animal Type'), { target: { value: 'Dog' } });
    fireEvent.change(getByLabelText('Age'), { target: { value: '2' } });
    fireEvent.change(getByLabelText('Weight (kg)'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Length (cm)'), { target: { value: '50' } });
    fireEvent.change(getByLabelText('Favourite Food'), { target: { value: 'Bone' } });
    fireEvent.change(getByLabelText('Favourite Toy'), { target: { value: 'Ball' } });
    fireEvent.change(getByLabelText('Medical Notes'), { target: { value: 'None' } });
    /* fireEvent.change(getByLabelText('Choose calories needed per day'), { target: { value: '500' } }); */
    /* fireEvent.change(getByLabelText('Choose activities needed per day'), { target: { value: '3' } }); */

    fireEvent.click(getByRole('button', { name: /save pet details/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://cscloud7-95.lnu.se/petsee/pet/petdetails',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            id: '123',
            name: 'Fluffy',
            age: '2',
            weight: '10',
            length: '50',
            favouriteFood: 'Bone',
            favouriteToy: 'Ball',
            medicalNotes: 'None',
            animalType: 'Dog',
            caloriesDay: '500',
            activitiesDay: '3',
          }),
        })
      );
      expect(toast.info).toHaveBeenCalledWith('Information updated successfully!');
    });
  });

  it('handles failed form submission', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to save pet details' }),
    });

    const { getByRole, getByLabelText } = await renderComponent();

    fireEvent.change(getByLabelText('Name'), { target: { value: 'Fluffy' } });
    fireEvent.change(getByLabelText('Animal Type'), { target: { value: 'Dog' } });
    fireEvent.change(getByLabelText('Age'), { target: { value: '2' } });
    fireEvent.change(getByLabelText('Weight (kg)'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Length (cm)'), { target: { value: '50' } });
    fireEvent.change(getByLabelText('Favourite Food'), { target: { value: 'Bone' } });
    fireEvent.change(getByLabelText('Favourite Toy'), { target: { value: 'Ball' } });
    fireEvent.change(getByLabelText('Medical Notes'), { target: { value: 'None' } });
    fireEvent.change(getByLabelText('Choose calories needed per day'), { target: { value: '500' } });
    fireEvent.change(getByLabelText('Choose activities needed per day'), { target: { value: '3' } });

    fireEvent.click(getByRole('button', { name: /save pet details/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to save pet details');
    });
  });
});
