import React, { useContext } from 'react'
import './Home.css'

import { Link } from 'react-router-dom'
import Carousel from './Carousel'
import DoneIcon from '@mui/icons-material/Done';
import { GlobalContext } from '../GlobalContext';


const Home = () => {
  const { userData } = useContext(GlobalContext);
  return (
    <div className='home container'>

      {userData?.id && (
        <div className="homeone">
          <div className="profile">
            <img src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png" alt="profile not loaded" />
          </div>
          <small className="profileName">{userData.username}</small>
          <h6 className='profileDesignation'>Full stack developer</h6>
          <small className='updateTime'>Last updated 3 minutes ago</small>
          <Link to='/profile' className="profileButton">View Profile</Link>
          <div className="profileInfo">
            <Link> <small>Profile views</small></Link>
            <Link> <small>Recruiter actions</small></Link>
          </div>
        </div>
      )}

      <div className="hometwo">



        <div className="carouselSection">
          <h6 className='sectionTitle'>Recommended jobs for you</h6>
          <Carousel slideCount="2"  />
        </div>

        <div className="carouselSection">
          <h6 className='sectionTitle'>Top Companies</h6>
          <Carousel slideCount="2"  />
        </div>

        

        <div className="carouselSection">
          <h6 className='sectionTitle'>Remote Jobs</h6>
          <Carousel slideCount="2"  />
        </div>

        <div className="carouselSection">
          <h6 className='sectionTitle'>Walkin Jobs</h6>
          <Carousel slideCount="2"  />
        </div>

        <div className="carouselSection">
          <h6 className='sectionTitle'>Popular Courses</h6>
          <Carousel slideCount="2"  />
        </div>


      </div>

      <div className="homethree">
        <div className="applicationStatus">
          <h6 className='sectionTitle'>Application Status Updates</h6>
          <p>Your job application Status for :<span className='appliedCompany'> Tranistics Data Technologies</span> </p>
          <div className='statusInfo'>
            <small>Application viewed <span ><DoneIcon className='doneIcon' /></span></small>

            <small>Resume downloaded <span ><DoneIcon className='doneIcon' /></span></small>

            <small>Email Contacted <span ><DoneIcon className='doneIcon' /></span></small>
          </div>
        </div>

        <div className="articlesAndBlogs">
          <h6 className='sectionTitle'>Articles & Blogs About Job Searching Tips</h6>

          <div className="articleSection">
            <ul className="articleList">
              <li className="articleListItem">
                <a href="https://example.com/full-stack-tips" className="articleLink">Top 10 Tips to Become an Expert Full-Stack Developer</a>
                <p className="articleDescription">Learn the essential skills and best practices to excel in full-stack development.</p>
              </li>
            </ul>
          </div>

        </div>

        <div className="industryNews">
          <h6 className='sectionTitle'>Industry News</h6>
          <div className="newsSection">
            <img className='newsImage' src="https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg" alt="" />
            <p className="newsContent">
              Stay updated with the latest trends and breakthroughs in the field of data science.
              From AI advancements to big data applications, explore how industry leaders are shaping
              the future of data-driven technologies.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home
