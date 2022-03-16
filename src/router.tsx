import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageIndex from './pages/index'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageIndex />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
