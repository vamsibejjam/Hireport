import React, { useContext, useState, useEffect, useRef } from 'react';
import './Carousel.css';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GlobalContext } from '../GlobalContext';

const chunkArray = (array, count) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += count) {
    chunks.push(array.slice(i, i + count));
  }
  return chunks;
};

const Carousel = () => {
  const { jobsData } = useContext(GlobalContext);
  const filteredJobsData = jobsData.filter(job => job.location);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(getSlideCount(window.innerWidth));
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setSlideCount(getSlideCount(sliderRef.current.offsetWidth));
      }
    };

    // Initial set based on the initial width
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slides = chunkArray(filteredJobsData, slideCount);

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

  function getSlideCount(width) {
    if (width < 480) return 1; // For small screens
    if (width < 768) return 2; // For tablets
    return 3; // For larger screens
  }

  return (
    <div className='jobsContainer' ref={sliderRef}>
      <button onClick={prevSlide} className="prevbtn">‹</button>
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {slide.map(job => (
              <Link to={`/job/${job.id}`} key={job.id}>
                <div className='jobCard'>
                  <small>{job.company_name}</small>
                  <p>{job.role}</p>
                  <div className="locateIcon">
                    <LocationOnIcon style={{ height: '15px' }} />
                    <small>{job.location}</small>
                  </div>
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

export default Carousel;
