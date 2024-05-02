// components/Dock.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeSharp, IoRestaurant, IoWalk, IoCalendar, IoPaw } from 'react-icons/io5'; // Example icons from react-icons

const Dock = () => {
    const navigate = useNavigate();

    return (
        <div className="dock-container">
            <button className="dock-icon" onClick={() => navigate('/')}>
                <IoHomeSharp />
            </button>
            <button className="dock-icon" onClick={() => navigate('/more')}>
                <IoPaw />
            </button>
            <button className="dock-icon" onClick={() => navigate('/activitydetails')}>
                <IoWalk />
            </button>
            <button className="dock-icon" onClick={() => navigate('/scheduledetails')}>
                <IoCalendar />
            </button>
        </div>
    );
};

export default Dock;
