// src/pages/CustomPopup.js

import React from 'react';
import './CustomPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function CustomPopup({ message, type }) {
  return (
    <div className={`popup ${type}`}>
      <div className="icon-container">
        {type === 'success' ? (
          <FontAwesomeIcon icon={faCheckCircle} className="popup-icon success-icon" />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} className="popup-icon error-icon" />
        )}
      </div>
      <p>{message}</p>
    </div>
  );
}

export default CustomPopup;
