import React, { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  userId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'REMOVE_USER_ID':
      return { ...state, userId: null };
    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userError, SetUserError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserId = (id) => {
    dispatch({ type: 'SET_USER_ID', payload: id });
  };

  const removeUserId = () => {
    dispatch({ type: 'REMOVE_USER_ID' });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (state.userId) {
        try {
          const response = await axios.get(`https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/users/${state.userId}`);
          setUserData(response.data);
        } catch (error) {
          SetUserError(error.message);
        }
      } else {
        setUserData(null);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/');
        setJobsData(response.data.jobs);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setError('Too many requests. Please try again later.');
          setTimeout(fetchJobs, 5000);
        } else {
          setError(error.message);
        }
      }
    };

    const fetchData = async () => {
      await fetchUserData();
      await fetchJobs();
      setLoading(false);
    };

    fetchData();
  }, [state.userId]);

  return (
    <GlobalContext.Provider value={{ 
      userData, 
      jobsData, 
      loading, 
      error, 
      userError, 
      setUserId, 
      removeUserId,
      userId: state.userId 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
