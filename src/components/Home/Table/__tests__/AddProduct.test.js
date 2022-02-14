import userEvent from '@testing-library/user-event'

import { render } from 'utilsTests'
import productReducer from 'redux/productSlice'
import AddProductComponent from '../AddProduct'

describe('render Add Product without crashing', () => {
    const setup = (state, props) => {
        const utils = render(<AddProductComponent {...props} />, {
            preloadedState: {
                product: state
            },
            reducer: { product: productReducer }
        })
        return {
            ...utils,
        }
    }

    test('defining all variable', () => {
        const state = {
            data: {},
            loading: false,
            loadingUpdate: false,
            error: ''
        }

        const props = {
            visible: true,
            onClose: jest.fn(),
        }

        const { getByTestId, getByText } = setup(state, props)
        expect(getByText(/Add Product/i)).toBeInTheDocument()
        expect(getByText(/name/i)).toBeInTheDocument()
        expect(getByText(/price/i)).toBeInTheDocument()
        expect(getByText(/color/i)).toBeInTheDocument()

        const name = getByTestId('name')
        userEvent.type(name, 'xiaomi')
        expect(name.value).toBe('xiaomi')

        const price = getByTestId('price')
        userEvent.type(price, '10000')
        expect(price.value).toBe('10,000')

        const color = getByTestId('color')
        userEvent.type(color, 'blue')
        expect(color.value).toBe('blue')

        const button = getByTestId(/submit/i)
        userEvent.click(button)
    })

    test('rendering error message', () => {
        const state = {
            data: {},
            loading: false,
            loadingUpdate: false,
            error: 'Something Went Wrong'
        }

        const props = {
            visible: true,
            onClose: jest.fn(),
        }

        const { getByText } = setup(state, props)

        const error = getByText(/something went wrong/i)
        expect(error).toBeInTheDocument()
    })
})