import React from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import './Chart.css'

export const ChartComponent = () => {
  const dataProducts = useSelector((state) => state.products.data)
  const dataLoading = useSelector((state) => state.products.loading)
  const dataError = useSelector((state) => state.products.error)

  return (
    <div className='container'>
      <div className='text-wrapper'>
        <p className='text'>Chart Product</p>
      </div>
      <div className='chart-wrapper'>
        {dataLoading && <Spin />}
        {!dataLoading && Boolean(dataProducts.length) && (
          <>
            <ResponsiveContainer>
              <AreaChart
                data={dataProducts}
                margin={{
                  top: 30,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name_product' />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='price'
                  stroke='#8884d8'
                  fill='#3783c6'
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
        {dataError && <p style={{ color: '#a61d24' }}>{dataError}</p>}
      </div>
    </div>
  )
}
