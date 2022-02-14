import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getProducts } from 'redux/productsSlice'
import './index.css'
import TableComponent from './Table'
import { ChartComponent } from './Chart'

const HomeComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className='container'>
      <ChartComponent />
      <TableComponent />
    </div>
  )
}

export default HomeComponent
