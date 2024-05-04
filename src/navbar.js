import React from 'react';
import './nav.css'; // Import the CSS file for styling

const Navbar = ({ filters, setFilters, searchTerm, setSearchTerm, applyFilters }) => {
  // Event handler for role selection change
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setFilters(prevFilters => ({ ...prevFilters, selectedRole }));
  };

  // Event handler for location selection change
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setFilters(prevFilters => ({ ...prevFilters, selectedLocation }));
  };

  // Event handler for experience selection change
  const handleExperienceChange = (e) => {
    const selectedExperience = e.target.value;
    setFilters(prevFilters => ({ ...prevFilters, selectedExperience }));
  };

  // Event handler for salary selection change
  const handleSalaryChange = (e) => {
    const selectedSalary = e.target.value;
    setFilters(prevFilters => ({ ...prevFilters, selectedSalary }));
  };

  // Event handler for search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Event handler for applying filters
  const handleApplyFilters = () => {
    applyFilters();
  };

  return (
    <nav className="navbar">
      {/* Role selection dropdown */}
      <div className="navbar-item">
        <select value={filters.selectedRole} onChange={handleRoleChange} onClick={handleApplyFilters}>
          <option value="">Select Role</option>
          {filters.jobRole.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
      </div>
      {/* Location selection dropdown */}
      <div className="navbar-item">
        <select value={filters.selectedLocation} onChange={handleLocationChange} onClick={handleApplyFilters}>
          <option value="">Select Location</option>
          {filters.locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>
      {/* Experience selection dropdown */}
      <div className="navbar-item">
        <select value={filters.selectedExperience} onChange={handleExperienceChange} onClick={handleApplyFilters}>
          <option value="">Select MinExperience</option>
          {filters.minExp.map((experience, index) => (
            <option key={index} value={experience}>{experience}</option>
          ))}
        </select>
      </div>
      {/* Salary selection dropdown */}
      <div className="navbar-item">
        <select value={filters.selectedSalary} onChange={handleSalaryChange} onClick={handleApplyFilters}>
          <option value="">Select MaxSalary</option>
          {filters.maxJdSalary.map((salary, index) => (
            <option key={index} value={salary}>{salary}</option>
          ))}
        </select>
      </div>
      {/* Search input */}
      <div className="navbar-item">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
