import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPets } from '../Profile/petProfileSlice'
import React, { useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import { IoIosArrowForward, IoIosAdd } from 'react-icons/io'
import { FaDog, FaQuestionCircle, FaHeadset} from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'

/* import { useDispatch, useSelector } from 'react-redux' */
/* import { fetchPets } from '../Profile/petProfileSlice' */

function More({ onLogout }) {

  const dispatch = useDispatch()
  const { pets, loading, error } = useSelector(state => state.pets)

  useEffect(() => {
    dispatch(fetchPets())
  }, [dispatch])

  const navigate = useNavigate()

  const handleCustomerServiceClick = () => {
    navigate('/customerservice')
  }

  const handleFaqClick = () => {
    navigate('/faq')
  }

  const handleAddPetClick = () => {
    navigate('/more/addpet')
  }

  const handlePetClick = (petId) => {
    navigate(`/petdetails/${petId}`)
  }

 

    return (


      
      <div className="button-container"> 
        



        {pets.map(pet => (
        <Button key={pet.id} variant="primary" size="lg" className="custom-button" onClick={() => handlePetClick(pet.id)}>
          <FaDog className="icon-left" />
          {pet.name}
          <span className="icon-right"><IoIosArrowForward /></span>
        </Button>
      ))}

       


      <Button variant="primary" size="lg" className="custom-button" onClick={handleAddPetClick}>
        <IoIosAdd className="icon-left" /> {/* Icon on the left */}
        Add a pet
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      <Button variant="primary" size="lg" className="custom-button" onClick={handleFaqClick}>
        <FaQuestionCircle className="icon-left" /> {/* Icon on the left */}
        FAQ
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      <Button variant="primary" size="lg" className="custom-button" onClick={handleCustomerServiceClick}>
        <FaHeadset className="icon-left" /> {/* Icon on the left */}
        Customer service
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      <Button variant="primary" size="lg" className="custom-button" onClick={onLogout}>
        <MdExitToApp className="icon-left" /> {/* Icon on the left */}
        Log out
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      

      
      </div>
    )
  }

export default More