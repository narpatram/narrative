import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <FontAwesomeIcon icon={faHome} />
                <span className="item-name">Home</span>
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon icon={faUser} />
                <span className="item-name">Profile</span>
            </div>
            <div className="sidebar-item">
                <FontAwesomeIcon icon={faCog} />
                <span className="item-name">Settings</span>
            </div>
        </div>
    );
}

export default Sidebar;
