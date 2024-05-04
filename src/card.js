import React from 'react';
import './Card.css'; 

const Card = ({ job }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{job.companyName}</h2>
        <div>
          <img src={job.logoUrl} alt="Company Logo" className="company-logo" />
        </div>
        <p className="card-description">{job.jobDetailsFromCompany}</p>
        <p className="card-location">Location: {job.location}</p>
        <p className="card-role">Role: {job.jobRole}</p>
        <p className="card-salary">Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}</p>
        <p className="card-exp">Experience: {job.minExp} - {job.maxExp} years</p>
        <a href={job.jdLink} target="_blank" rel="noopener noreferrer" className="card-link">View Job Details</a>
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};

export default Card;
