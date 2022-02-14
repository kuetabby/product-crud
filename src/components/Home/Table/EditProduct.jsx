import React, { useEffect } from 'react'
import { Modal, Row, Form, Input, InputNumber, Button, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { getProduct, updateProduct, resetState } from 'redux/productSlice'
import { getProducts } from 'redux/productsSlice'

const EditProductComponent = ({ visible, onClose, id }) => {
  const dispatch = useDispatch()
  const dataProduct = useSelector((state) => state.product.data)
  const dataLoading = useSelector((state) => state.product.loading)
  const dataLoadingUpdate = useSelector((state) => state.product.loadingUpdate)
  const dataError = useSelector((state) => state.product.error)

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id))
    }
  }, [id, dispatch])

  const onFinish = (values) => {
    const DataJSON = JSON.stringify(values)
    dispatch(updateProduct({ id, data: DataJSON }))
      .unwrap()
      .then(() => {
        dispatch(getProducts()).then(() => onCancel())
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onCancel = () => {
    dispatch(resetState())
    onClose()
  }

  return (
    <Modal
      visible={visible}
      title='Edit Product'
      footer={null}
      closable={false}
    >
      <Form
        name='edit product'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        {dataLoading && (
          <div style={{ textAlign: 'center', height: 100 }}>
            <Spin />
          </div>
        )}
        {!dataLoading && !dataError && (
          <>
            <Form.Item
              label='Name'
              htmlFor='name'
              name='name_product'
              rules={[
                { required: true, message: 'Please input your car name!' },
              ]}
              initialValue={dataProduct?.name_product}
            >
              <Input id='name' type='text' data-testid='name' />
            </Form.Item>

            <Form.Item
              label='Price'
              htmlFor='price'
              name='price'
              rules={[
                { required: true, message: 'Please input your car price!' },
              ]}
              initialValue={dataProduct?.price}
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
              htmlFor='color'
              name='colour'
              rules={[
                { required: true, message: 'Please input your car Color!' },
              ]}
              initialValue={dataProduct?.colour}
            >
              <Input id='color' data-testid='color' type='text' />
            </Form.Item>
          </>
        )}
        {dataError && (
          <div
            style={{
              textAlign: 'center',
              margin: 'auto',
              color: '#a61d24',
              height: 100,
            }}
          >
            {dataError}
          </div>
        )}
        <Row justify='end' style={{ width: '100%' }}>
          <Button
            key='back'
            disabled={dataLoading}
            onClick={onCancel}
            style={{ marginRight: '10px' }}
          >
            Back
          </Button>
          {!dataLoadingUpdate && !dataError && (
            <Button
              type='primary'
              key='submit'
              disabled={dataLoading}
              htmlType='submit'
            >
              Submit
            </Button>
          )}
          {dataLoadingUpdate && <Spin style={{ margin: 'auto 0px' }} />}
        </Row>
      </Form>
    </Modal>
  )
}

export default EditProductComponent
