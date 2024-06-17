import React, { Suspense, createContext, lazy, useEffect } from 'react'
import MainCorousel from './MainCorousel'
import Footer from './Footer'

const HomePage = () => {

  return (
      <div className='content-container'>
        <MainCorousel />
      </div>
  )
}

export default HomePage
