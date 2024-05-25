import { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPets, setCurrentPet } from '../Profile/petProfileSlice'

const PetDropdown = () => {
    const dispatch = useDispatch()
    const pets = useSelector(state => state.pets.pets)
    const currentPet = useSelector(state => state.pets.currentPet)

    useEffect(() => {
        dispatch(fetchPets())
    }, [dispatch])

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
