import React from 'react'

import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'

import Companies from './Components/Companies'
import SearchedJobs from './Components/SearchedJobs'
import Jobs from './Components/Jobs'
import Job from './Components/Job'
import Login from './Components/Login'
import Register from './Components/Register'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/job/:jobId' element={<Job />} />
        <Route path='/companies' element={<Companies />} />
        <Route path='/searched-jobs/:searchedValue' element={<SearchedJobs />} />
      </Routes>


    </div>
  )
}

export default App
