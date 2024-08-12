import React, { useState,  useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './Job.css';
import DoneIcon from '@mui/icons-material/Done';
import { GlobalContext } from '../GlobalContext';

const Job = () => {
  const { jobsData, loading, error } = useContext(GlobalContext);
  const { jobId } = useParams();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(!submitted);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const job = jobsData.find(job => job.id === jobId);

  if (!job) return <p className='text-center mt-5'>Job not found</p>;

  return (
    <div className="job-container">
      {submitted ? (
        <div className='submission-confirmation'>
          <h1>Applied Successfully <DoneIcon fontSize='large' /></h1>
         <Link to='/'> <p>redirected to home</p></Link>
        </div>
      ) : (
        <div className='job-details-container'>
          <h2 className="job-title">{job.role}</h2>
          <p className="job-company"><strong>Company:</strong> {job.company_name}</p>
          <p className="job-employment-type"><strong>Employment Type:</strong> {job.employment_type}</p>
          <p className="job-location"><strong>Location:</strong> {job.location || "Not specified"}</p>
          <p className="job-remote"><strong>Remote:</strong> {job.remote ? "Yes" : "No"}</p>
          <p className="job-date-posted"><strong>Date Posted:</strong> {job.date_posted}</p>
          <div className="job-description">{parse(job.text)}</div>
          <button className="apply-button" onClick={handleSubmit}>Apply</button>
        </div>
      )}
    </div>
  );
};

export default Job;
