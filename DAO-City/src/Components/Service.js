// src/Components/Service.js
import React from 'react';

const Service = ({ title, body, imageUrl }) => {
  return (
    <div className="service">
      <div className="photo-section">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="details-section">
        <h2>{title}</h2>
        <p>{body}</p>
        <button>Get Access</button>
      </div>
    </div>
  );
};

export default Service;
