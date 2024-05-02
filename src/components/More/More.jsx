import Button from 'react-bootstrap/Button'
import { IoIosArrowForward, IoIosAdd } from 'react-icons/io'

function BlockExample() {
    return (
      <div className="button-container"> 
        <Button variant="primary" size="lg" className="block-button" > 
          Block level button 
         
        </Button>


        <Button variant="secondary" size="lg" className="block-button">
          Block level button
        </Button>



        <Button variant="primary" size="lg" className="custom-button">
        <IoIosAdd className="icon-left" /> {/* Icon on the left */}
        Block level button
        <span className="icon-right">
          <IoIosArrowForward />
        </span>
      </Button>

      
      </div>
    )
  }

export default BlockExample;