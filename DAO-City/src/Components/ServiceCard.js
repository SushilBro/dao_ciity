// src/components/ServiceCard.js
import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, imageUrl, body, level }) => {
  return (
    <div className="card-container"> 
      <div className="image-container1">
        <div className={`badge-container service-level-badge rounded-right`} data-level={level} >
           <span className="badge rounded-right">{level}</span>
        </div>
        <img src={imageUrl} alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <p>{body.slice(0, 50)}....</p>
        </div>
      </div>
      <div className="btn">
        <Link to={`/service-details/${title}`}>
          <button>View More</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
