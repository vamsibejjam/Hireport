import React, { useState, useEffect } from 'react';
import './Companies.css';
import TuneIcon from '@mui/icons-material/Tune';
import CompanyCarousel from './CompanyCarousel';


const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [domains, setDomains] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showMoreCompanies, setShowMoreCompanies] = useState(false);
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [showMoreDepartments, setShowMoreDepartments] = useState(false);
  const [filtered, setFiltered] = useState(false);

  const handleFilter = () => {
    setFiltered(!filtered)
  }

  useEffect(() => {
    fetch('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/company-names/')
      .then(response => response.json())
      .then(data => setCompanies(data));

    fetch('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/company-domains/')
      .then(response => response.json())
      .then(data => setDomains(data));

    fetch('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/locations/')
      .then(response => response.json())
      .then(data => setLocations(data));

    fetch('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/departments/')
      .then(response => response.json())
      .then(data => setDepartments(data));
  }, []);

  const handleShowMoreCompanies = (e) => {
    e.preventDefault();
    setShowMoreCompanies(!showMoreCompanies);
  };

  const handleShowMoreLocations = (e) => {
    e.preventDefault();
    setShowMoreLocations(!showMoreLocations);
  };

  const handleShowMoreDepartments = (e) => {
    e.preventDefault();
    setShowMoreDepartments(!showMoreDepartments);
  };

  return (
    <div className="companiesContainer">
      <h2 className="title">Top Companies Hiring Now</h2>
      <div className="companiesList container">
        <CompanyCarousel dataType="companiesDomains" />
      </div>

      <div className="companySection">

        <div className="tuning" onClick={handleFilter}>
          <TuneIcon />
        </div>

        {filtered ?
          <div className="filters">
            <h5>Filters</h5>
            <div className="industry">
              <p className="text-center">Industry</p>
              {domains.slice(0, 4).map((comp, key) => (
                <div className="indusCheck" key={key}>
                  <input type="checkbox" id={`company-${key}`} value={comp.company_type} />
                  <label htmlFor={`company-${key}`}>{comp.company_type}</label><br />
                </div>
              ))}
              {showMoreCompanies && domains.slice(4).map((comp, key) => (
                <div className="indusCheck" key={key + 4}>
                  <input type="checkbox" id={`company-more-${key}`} value={comp.company_type} />
                  <label htmlFor={`company-more-${key}`}>{comp.company_type}</label><br />
                </div>
              ))}
              <a href="#" className="showMoreLink" onClick={handleShowMoreCompanies}>
                {showMoreCompanies ? 'Show less' : 'More'}
              </a>
            </div>

            <div className="department">
              <p className="text-center">Departments</p>
              {departments.slice(0, showMoreDepartments ? departments.length : 4).map((dept, key) => (
                <div className="departCheck" key={key}>
                  <input type="checkbox" id={`dept-${key}`} value={dept.department_name} />
                  <label htmlFor={`dept-${key}`}>{dept.department_name}</label><br />
                </div>
              ))}
              {departments.length > 4 && (
                <a href="#" className="showMoreLink" onClick={handleShowMoreDepartments}>
                  {showMoreDepartments ? 'Show less' : 'More'}
                </a>
              )}
            </div>

            <div className="location">
              <p className="text-center">Locations</p>
              {locations.slice(0, 4).map((loc, key) => (
                <div className="locCheck" key={key}>
                  <input type="checkbox" id={`location-${key}`} value={loc.location_name} />
                  <label htmlFor={`location-${key}`}>{loc.location_name}</label><br />
                </div>
              ))}
              {showMoreLocations && locations.slice(4).map((loc, key) => (
                <div className="locCheck" key={key + 4}>
                  <input type="checkbox" id={`location-more-${key}`} value={loc.location_name} />
                  <label htmlFor={`location-more-${key}`}>{loc.location_name}</label><br />
                </div>
              ))}
              <a href="#" className="showMoreLink" onClick={handleShowMoreLocations}>
                {showMoreLocations ? 'Show less' : 'More'}
              </a>
            </div>
          </div>
          : <div></div>}
        <div className="companies">
          <div className="row">
            {companies.map((comp, index) => (
              <div className="col" key={index}>
                <h6>{comp.company_name}</h6>
                <p>{comp.domain}</p>
                <small>Founded in {comp.founded_year}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
