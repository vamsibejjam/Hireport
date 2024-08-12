import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './SearchedJobs.css'; // Ensure to import the updated CSS

const SearchedJobs = () => {
  const { searchedValue } = useParams();
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/');
      setJobsData(response.data.jobs);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError('Too many requests. Please try again later.');
        setTimeout(fetchJobs, 5000);
      } else {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobsData.filter(job =>
    job.role.toLowerCase().includes(searchedValue.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="search-results-container">
      <div className="search-header">
        <p>{filteredJobs.length} search results for "{searchedValue}"</p>
      </div>
      {filteredJobs.length === 0 ? (
        <p className="no-results">No jobs found for "{searchedValue}"</p>
      ) : (
        filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <p><strong>Role:</strong> {job.role}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {parse(job.text)}</p>
            <p><strong>Posted:</strong> {job.date_posted}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchedJobs;
