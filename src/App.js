// 
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Card from './card';
import Navbar from './navbar';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({ jobRole: [], locations: [], minExp: [], maxJdSalary: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const endOfPageRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch job data
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({ "limit": 10, "offset": (pageNumber - 1) * 10 });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();
        if (Array.isArray(data.jdList)) {
          setJobs(prevJobs => [...prevJobs, ...data.jdList]);
          setFilteredJobs(prevJobs => [...prevJobs, ...data.jdList]); // Set filtered jobs initially

          // Extracting filter data from the received API response
          const jobRoles = [...new Set(data.jdList.map(job => job.jobRole))];
          const locations = [...new Set(data.jdList.map(job => job.location))];
          const minExperiences = [...new Set(data.jdList.map(job => job.minExp))];
          const maxSalaries = [...new Set(data.jdList.map(job => job.maxJdSalary))];

          // Updating the filters state with extracted data
          setFilters(prevFilters => ({
            ...prevFilters,
            jobRole: jobRoles,
            locations: locations,
            minExp: minExperiences,
            maxJdSalary: maxSalaries
          }));
        } else {
          console.error('Invalid data format:', data);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber]);

  // Function to filter jobs
  const applyFilters = () => {
    let filtered = jobs.filter(job => {
      let match = true;
      if (filters.selectedRole && job.jobRole !== filters.selectedRole) {
        match = false;
      }
      if (filters.selectedLocation && job.location !== filters.selectedLocation) {
        match = false;
      }
      if (filters.selectedExperience && (job.minExp < filters.selectedExperience || job.maxExp > filters.selectedExperience)) {
        match = false;
      }
      if (filters.selectedSalary && (job.maxJdSalary < filters.selectedSalary || job.minJdSalary > filters.selectedSalary)) {
        match = false;
      }
      if (searchTerm && !job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
        match = false;
      }
      return match;
    });
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm, jobs]);

//for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    }, { threshold: 0.5 });

    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Navbar
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        applyFilters={applyFilters}
      />
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, index) => (
          <Card key={index} job={job} />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
      {loading && <p>Loading...</p>}
      <div ref={endOfPageRef} style={{ height: '10px' }}></div>
    </div>
  );
};

export default App;
