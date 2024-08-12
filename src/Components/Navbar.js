import React, { useContext, useState } from 'react';
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { GlobalContext } from '../GlobalContext';
import ProfileDrawer from './ProfileDrawer';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { userData } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [menuOpen, SetMenuOpen] = useState(false)

  const handleMenu = () => {
    SetMenuOpen(!menuOpen)
  }
  const handleMouseClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
    setTimeoutId(id);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMultipleClick = () => {
    toggleDrawer();
    handleMenu();
  };

  return (
    <div className='navbar'>
      <Link to='/' className='logo'>
        <img src="../hire_logo.png" alt="img not loaded" />
      </Link>

      <Link to='/jobs' className='jobLink'>
        <h6>Jobs</h6>
      </Link>

      <Link to='/companies' className='companyLink'>
        <h6>Companies</h6>
      </Link>

      <div className="searchbar">
        <input type="text" className='searchInp' onChange={(e) => setSearchedText(e.target.value)} placeholder='search...' />
        <Link to={searchedText ? `/searched-jobs/${searchedText}` : ''} className="SearchIcon">
          <SearchIcon />
        </Link>
      </div>

      <Link
        className="notifications"
        onClick={handleMouseClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NotificationsIcon />
        {showDropdown && (
          <div
            className="dropdown-menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to='/recommended-jobs'>Recommended Jobs</Link>
            <Link to='/email-invites'>Email Invites</Link>
            <Link to='/application-status'>Application Status</Link>
            <Link to='/blogs'>Blogs</Link>
          </div>
        )}
      </Link>

      {userData ? (
        <Link onClick={toggleDrawer} className='profileLink' >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
            className="profileAccount"
            alt="profile"
          />
        </Link>
      ) : (
        <Link to='/login/' className='profileLink'>Login</Link>
      )}

      <ProfileDrawer open={drawerOpen} onClose={toggleDrawer} />

      <div className="menubar" onClick={handleMenu}>
        <MenuIcon />
      </div>

      {menuOpen ? (
        <div className="mobile-links">
          <Link to='/jobs' onClick={handleMenu}>
            <h6>Jobs</h6>
          </Link>

          <Link to='/companies' onClick={handleMenu}>
            <h6>Companies</h6>
          </Link>

          <Link to='/recommended-jobs'>Recommended Jobs</Link>
          <Link to='/email-invites'>Email Invites</Link>
          <Link to='/application-status'>Application Status</Link>
          <Link to='/blogs'>Blogs</Link>

          {userData ? (
            <Link onClick={handleMultipleClick} >
              <img
                src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
                className="profileAccount"
                alt="profile"
              />
            </Link>

          ) : (
            <Link to='/login/' onClick={handleMenu}>Login</Link>
          )}

        </div>
      ) : (
        <div></div>
      )}

    </div>
  );
}

export default Navbar;
