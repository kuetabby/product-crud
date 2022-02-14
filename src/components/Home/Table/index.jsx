import React, { useState, useMemo, lazy, Suspense } from 'react'
import { Table, Button, Row, Card, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { deleteProduct, getProducts } from 'redux/productsSlice'
import './index.css'

const AddProductComponent = lazy(() => import('./AddProduct'))
const EditProductComponent = lazy(() => import('./EditProduct'))

const TableComponent = () => {
  const dispatch = useDispatch()
  const dataProducts = useSelector((state) => state.products.data)
  const dataLoading = useSelector((state) => state.products.loading)
  const dataError = useSelector((state) => state.products.error)

  const [toggleAddProduct, setToggleAddProduct] = useState(false)
  const [toggleEditProduct, setToggleEditProduct] = useState(false)

  const [idEditProduct, setIdEditProduct] = useState(0)

  const onHandleToggleAddProduct = () => {
    setToggleAddProduct(!toggleAddProduct)
  }

  const onHandleToggleEditProduct = (id = 0) => {
    setIdEditProduct(id)
    setToggleEditProduct(!toggleEditProduct)
  }

  const onDeleteUser = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        dispatch(getProducts())
      })
  }

  const columns = [
    {
      title: 'Name',
      align: 'center',
      dataIndex: 'name_product',
      key: 'name_product',
    },
    {
      title: 'Price',
      align: 'center',
      render: ({ price }) => <p>Rp. {Number(price || 0).toLocaleString()}</p>,
      key: 'price',
    },
    {
      title: 'Color',
      align: 'center',
      dataIndex: 'colour',
      key: 'colour',
    },
    {
      title: 'Action',
      align: 'center',
      width: 175,
      render: (props) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!toggleEditProduct && (
              <Button
                type='primary'
                style={{ width: '100%' }}
                onClick={() => onHandleToggleEditProduct(props._id)}
              >
                Edit
              </Button>
            )}
            {toggleEditProduct && (
              <Suspense fallback={<Spin />}>
                <EditProductComponent
                  visible={toggleEditProduct}
                  onClose={onHandleToggleEditProduct}
                  id={idEditProduct}
                />
              </Suspense>
            )}
            <Button
              type='primary'
              style={{ width: '100%', marginTop: '10px' }}
              data-testid={`delete-${props._id}`}
              danger
              onClick={() => onDeleteUser(props._id)}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className='main-wrapper'>
      <Card
        title='Table Product'
        extra={
          <>
            {!toggleAddProduct && (
              <Button type='primary' onClick={onHandleToggleAddProduct}>
                Add Product
              </Button>
            )}
            {toggleAddProduct && (
              <Suspense fallback={<Spin style={{ marginRight: '1rem' }} />}>
                <AddProductComponent
                  visible={toggleAddProduct}
                  onClose={onHandleToggleAddProduct}
                />
              </Suspense>
            )}
          </>
        }
        bordered
      >
        {dataError && (
          <Row justify='center' className='error-wrapper'>
            <p className='error'>Something Went wrong</p>
          </Row>
        )}
        {!dataError && (
          <Table
            columns={columns}
            dataSource={dataProducts}
            loading={dataLoading}
            style={{ width: '100%' }}
            rowKey='_id'
          />
        )}
      </Card>
    </div>
  )
}

export default TableComponent
