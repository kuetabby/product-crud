import { cleanup } from '@testing-library/react'

import { render } from 'utilsTests'
import productReducer from 'redux/productSlice'
import EditProductComponent from '../EditProduct'

beforeEach(cleanup)

describe('render Edit Product without crashing', (done) => {
    const setup = (state, props) => {
        const utils = render(<EditProductComponent {...props} />, {
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
            data:
            {
                name_product: 'xiaomi',
                price: '100000',
                colour: 'blue'
            },
            loading: false,
            loadingUpdate: false,
            error: ''
        }

        const props = {
            visible: true,
            onClose: jest.fn(),
        }

        const { getByTestId, getByText } = setup(state, props)

        const name_product = getByTestId(/name/i)
        const price = getByTestId(/price/i)
        const color = getByTestId(/color/i)

        expect(getByText(/Edit Product/i)).toBeInTheDocument()
        expect(getByText(/name/i)).toBeInTheDocument()
        expect(getByText(/price/i)).toBeInTheDocument()
        expect(getByText(/color/i)).toBeInTheDocument()

        expect(name_product.value).toBe("xiaomi")
        expect(price.value).toBe("100,000")
        expect(color.value).toBe("blue")

        expect(name_product.value).toBeDefined()
        expect(price.value).toBeDefined()
        expect(color.value).toBeDefined()
    })

    test('crashing all variable & render error message', () => {
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

        const { queryByText, getByText } = setup(state, props)

        const error = getByText(/something went wrong/i)

        const name_product = queryByText(/xiaomi/i)
        const price = queryByText(/100,000/i)
        const color = queryByText(/blue/i)

        expect(error).toBeInTheDocument()

        expect(name_product).not.toBeInTheDocument()
        expect(price).not.toBeInTheDocument()
        expect(color).not.toBeInTheDocument()
    })
})