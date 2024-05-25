import { useNavigate } from 'react-router-dom'
import { IoHomeSharp, IoCalendar, IoPaw } from 'react-icons/io5' 
import { FiCheckSquare } from 'react-icons/fi';


const Dock = () => {
    const navigate = useNavigate()

    return (
        <div className="dock-container">
            <button className="dock-icon" onClick={() => navigate('/')}>
                <IoHomeSharp />
            </button>
            <button className="dock-icon" onClick={() => navigate('/more')}>
                <IoPaw />
            </button>
            <button className="dock-icon" onClick={() => navigate('/todolist')}>
                <FiCheckSquare />
            </button>
            <button className="dock-icon" onClick={() => navigate('/scheduledetails')}>
                <IoCalendar />
            </button>
        </div>
    )
}

export default Dock
