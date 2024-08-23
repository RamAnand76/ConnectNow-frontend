import React from 'react';
import '../styles/CustomPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function CustomPopup({ message, type, show }) {
  return (
    <div className={`popup ${type} ${show ? 'show' : ''}`}>
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
