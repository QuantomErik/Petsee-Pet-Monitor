import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPets } from '../Profile/petProfileSlice'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { IoIosArrowForward, IoIosAdd } from 'react-icons/io'
import { FaDog, FaQuestionCircle, FaHeadset} from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'
import PropTypes from 'prop-types'

function More({ onLogout }) {
  const dispatch = useDispatch()
  const { pets} = useSelector(state => state.pets)

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
        <IoIosAdd className="icon-left" />
        Add a pet
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      <Button variant="primary" size="lg" className="custom-button" onClick={handleFaqClick}>
        <FaQuestionCircle className="icon-left" />
        FAQ
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      <Button variant="primary" size="lg" className="custom-button" onClick={handleCustomerServiceClick}>
        <FaHeadset className="icon-left" />
        Customer service
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>


      <Button variant="primary" size="lg" className="custom-button" onClick={onLogout}>
        <MdExitToApp className="icon-left" />
        Log out
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>
      </div>
    )
  }

  More.propTypes = {
    onLogout: PropTypes.func.isRequired,
  }

export default More