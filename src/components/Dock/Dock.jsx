// components/Dock.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoHomeSharp, IoRestaurant, IoWalk, IoCalendar, IoPaw } from 'react-icons/io5' 
import { FiCheckSquare } from 'react-icons/fi';
import { HiCheckCircle } from 'react-icons/hi';
import { MdChecklist } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';




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
