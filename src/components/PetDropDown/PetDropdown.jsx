import { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPets, setCurrentPet } from '../Profile/petProfileSlice'


/**
 * PetDropdown component that displays a dropdown menu for selecting a pet.
 *
 * Fetches the list of pets from the server and allows the user to select a pet from the dropdown.
 *
 * @component
 * @example
 * return (
 *   <PetDropdown />
 * )
 */
const PetDropdown = () => {
    const dispatch = useDispatch()
    const pets = useSelector(state => state.pets.pets)
    const currentPet = useSelector(state => state.pets.currentPet)

    useEffect(() => {
        dispatch(fetchPets())
    }, [dispatch])


     /**
   * Handles the selection of a pet from the dropdown.
   *
   * @param {string} petId - The ID of the selected pet.
   */
    const handleSelect = (petId) => {
        const selectedPet = pets.find(pet => pet.id === petId)
        dispatch(setCurrentPet(selectedPet))
        console.log("Selected pet:", selectedPet.name)
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currentPet ? currentPet.name : "Select a Pet"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {pets.map((pet) => (
                    <Dropdown.Item key={pet.id} onClick={() => handleSelect(pet.id)}>
                        {pet.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PetDropdown
