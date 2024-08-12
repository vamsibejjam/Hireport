
import React, {  useEffect, useState } from 'react';
import './CompanyCarousel.css';
import { Link } from 'react-router-dom';
import data from '../data.json';


const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
 
  return chunks;
};

const CompanyCarousel = ({ dataType}) => {
  const [domains, setDomains] = useState([]);
  useEffect(() => {
   

    fetch('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/company-domains/')
      .then(response => response.json())
      .then(data => setDomains(data));

   
  }, []);
 
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = chunkArray(domains, 5);
  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className=' companyContainer '>

      <button onClick={prevSlide} className="prevbtn   ">‹</button>

      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide   " key={index}>
            {slide.map(company => (
              <Link to='' className='companyLinks' >
                <div className='company'>
                  <h6>{company.company_type}</h6>
                  <small>{company.total_company_type}</small>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="nextbtn">›</button>

    </div>
  );
};



export default CompanyCarousel;
