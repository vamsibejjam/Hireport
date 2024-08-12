import React, { useState,  useContext } from 'react';

import { Link } from 'react-router-dom';
import './Jobs.css';
import WorkIcon from '@mui/icons-material/Work';
import TuneIcon from '@mui/icons-material/Tune';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Drawer, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material'; // Import CloseIcon for cross mark
import { GlobalContext } from '../GlobalContext';

const Jobs = () => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [preferredJobRole, setPreferredJobRole] = useState('');
  const [preferredSalary, setPreferredSalary] = useState('');
  const [preferredWorkLocations, setPreferredWorkLocations] = useState([]);
  const [savedJobRole, setSavedJobRole] = useState([]);
  const [savedSalary, setSavedSalary] = useState([]);
  const [savedWorkLocations, setSavedWorkLocations] = useState([]);
  const { jobsData, loading, error } = useContext(GlobalContext);
  const [filtered, SetFiltered] = useState(false)


  const handleFiltering = () => {
    SetFiltered(!filtered)
  }

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handlePreferredJobRoleChange = (event) => {
    setPreferredJobRole(event.target.value);
  };

  const handlePreferredSalaryChange = (event) => {
    const formattedSalary = event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPreferredSalary(formattedSalary);
  };

  const handlePreferredWorkLocationsChange = (event) => {
    setPreferredWorkLocations(event.target.value);
  };

  const handleSavePreferences = () => {
    if (preferredJobRole.trim() !== '') {
      setSavedJobRole((prev) => [...prev, preferredJobRole]);
    }

    if (preferredSalary.trim() !== '') {
      setSavedSalary((prev) => [...prev, preferredSalary]);
    }

    if (preferredWorkLocations.length > 0) {
      setSavedWorkLocations((prev) => [...prev, ...preferredWorkLocations]);
    }

    setPreferredJobRole('');
    setPreferredSalary('');
    setPreferredWorkLocations([]);

    toggleDrawer();
  };


  const handleRemovePreference = (item, type) => {
    if (type === 'role') {
      setSavedJobRole((prev) => prev.filter(role => role !== item));
    } else if (type === 'salary') {
      setSavedSalary((prev) => prev.filter(salary => salary !== item));
    } else if (type === 'location') {
      setSavedWorkLocations((prev) => prev.filter(location => location !== item));
    }
  };

  const handleResetPreferences = () => {
    setSavedJobRole([]);
    setSavedSalary([]);
    setSavedWorkLocations([]);
  };

  const drawerContent = (
    <div className='drawer-content'>
      <h6>Manage your job preferences</h6>
      <div className='drawer-section'>
        <p>Preferred Job Role (Max 3)</p>
        <TextField
          variant='outlined'
          fullWidth
          value={preferredJobRole}
          onChange={handlePreferredJobRoleChange}
        />
      </div>
      <div className='drawer-section'>
        <p>Preferred Salary</p>
        <TextField
          variant='outlined'
          fullWidth
          value={preferredSalary}
          onChange={handlePreferredSalaryChange}
        />
      </div>
      <div className='drawer-section'>
        <p>Preferred Work Locations (Max 10)</p>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="work-locations-label">Select locations</InputLabel>
          <Select
            labelId="work-locations-label"
            id="work-locations"
            multiple
            value={preferredWorkLocations}
            onChange={handlePreferredWorkLocationsChange}
            label="Preferred Work Locations"
          >
            {['Pune', 'Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Gurgaon', 'Noida', 'Mumbai', 'Kolkata', 'Kochi'].map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button onClick={handleSavePreferences} variant='contained' color='primary'>
        Save
      </Button>
      <Button onClick={handleResetPreferences} variant='outlined' color='secondary'>
        Reset
      </Button>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container jobs-container'>
      <div className='flex-row'>
        <div className='job-content'>
          <h6 className='headerTitle'>Recommended for You</h6>
          <div className="filterIcon" onClick={handleFiltering}>
            <TuneIcon />
          </div>
          {jobsData.length > 0 ? (
            jobsData
              .filter(job => job.location)
              .map(job => (
                <div key={job.id} className='job-card'>
                  <div className='job-header'>
                    <Link to={`/job/${job.id}`} className='jobTitle'>
                      <p >{job.role}</p>
                    </Link>
                    <small className='jobCompany'>{job.company_name}</small>
                  </div>
                  <div className='job-details'>
                    <div className='empType'>
                      <span><WorkIcon className='jobIcons' fontSize='small' />
                        {job.employment_type || "Not specified"}
                      </span>
                    </div>

                    <div className='jobLocation'>
                      <span><LocationOnOutlinedIcon className='jobIcons' />
                        {job.location || "Not specified"}
                      </span>
                    </div>

                  </div>
                  <button className='applyButton'>Apply</button>
                </div>
              ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
        <div className='job-filter-section'>
          <h6>Add preferences to get matching jobs</h6>
          <div className='preference'>
            <p>
              Preferred job role
              <span className='btn' onClick={toggleDrawer}>
                <EditIcon className='jobIcons' fontSize='small' />
              </span>
            </p>
            {savedJobRole.map((role, index) => (
              <span key={index} className='preference-detail highlighted'>
                {role}
                <CloseIcon
                  className='remove'
                  onClick={() => handleRemovePreference(role, 'role')}
                />
              </span>
            ))}
          </div>
          <div className='preference'>
            <p>
              Preferred work location
              <span className='btn' onClick={toggleDrawer}>
                <EditIcon className='jobIcons' fontSize='small' />
              </span>
            </p>
            <div className='locations'>
              {savedWorkLocations.map((location, index) => (
                <span key={index} className='preference-detail highlighted'>
                  {location}
                  <CloseIcon
                    className='remove'
                    onClick={() => handleRemovePreference(location, 'location')}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className='preference'>
            <p>
              Preferred salary
              <span className='btn' onClick={toggleDrawer}>
                <EditIcon className='jobIcons' fontSize='small' />
              </span>
            </p>
            {savedSalary.map((salary, index) => (
              <span key={index} className='preference-detail highlighted'>
                {salary}
                <CloseIcon
                  className='remove'
                  onClick={() => handleRemovePreference(salary, 'salary')}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      <Drawer className='drawer' anchor='right' open={openDrawer} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>

      {filtered ?
        <Drawer className='drawer' anchor='right' open={filtered} onClose={handleFiltering}>
          {drawerContent}
        </Drawer>
        : <div></div>
        }
    </div >
  );
};

export default Jobs;
