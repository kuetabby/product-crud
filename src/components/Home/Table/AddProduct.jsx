import React from 'react'
import { Modal, Row, Form, Input, InputNumber, Button, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { createProduct } from 'redux/productSlice'
import { getProducts } from 'redux/productsSlice'

const AddProductComponent = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  const dataLoading = useSelector((state) => state.product.loading)
  const dataError = useSelector((state) => state.product.error)

  const onFinish = (values) => {
    const DataJSON = JSON.stringify(values)
    dispatch(createProduct(DataJSON))
      .unwrap()
      .then(() => {
        dispatch(getProducts()).then(() => onClose())
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal visible={visible} title='Add Product' footer={null} closable={false}>
      <Form
        name='add product'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Name'
          htmlFor='name'
          name='name_product'
          rules={[
            { required: true, message: 'Please input your product name!' },
          ]}
        >
          <Input id='name' data-testid='name' type='text' />
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          htmlFor='price'
          rules={[
            { required: true, message: 'Please input your product price!' },
          ]}
        >
          <InputNumber
            id='price'
            data-testid='price'
            style={{ width: '100%' }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </Form.Item>

        <Form.Item
          label='Color'
          name='colour'
          htmlFor='color'
          rules={[
            { required: true, message: 'Please input your product Color!' },
          ]}
        >
          <Input id='color' data-testid='color' type='text' />
        </Form.Item>

        {dataError && (
          <Row justify='end'>
            <p style={{ color: '#a61d24' }}>{dataError}</p>
          </Row>
        )}

        <Row justify='end' align='center' style={{ width: '100%' }}>
          <Button
            key='back'
            onClick={onClose}
            disabled={dataLoading}
            style={{ marginRight: '10px' }}
          >
            Back
          </Button>
          {!dataLoading && (
            <Button
              type='primary'
              key='submit'
              data-testid='submit'
              htmlType='submit'
            >
              Submit
            </Button>
          )}
          {dataLoading && <Spin style={{ margin: 'auto 0px' }} />}
        </Row>
      </Form>
    </Modal>
  )
}

export default AddProductComponent
