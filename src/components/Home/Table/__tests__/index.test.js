import userEvent from '@testing-library/user-event'

import { render } from 'utilsTests'
import productsReducer from 'redux/productsSlice'
import TableComponent from '../index'

describe('render Add Product without crashing', () => {
    const setup = (state, props) => {
        const utils = render(<TableComponent {...props} />, {
            preloadedState: {
                products: state
            },
            reducer: { products: productsReducer }
        })
        return {
            ...utils,
        }
    }

    test('defining all variable', () => {
        const state = {
            data: [
                {
                    "_id": "1",
                    "name_product": "volta",
                    "price": 300000,
                    "colour": "black"
                },
                {
                    "_id": "2",
                    "name_product": "druga",
                    "price": 200000,
                    "colour": "silver"
                }
            ],
            loading: false,
            error: ''
        }

        const { getByTestId, getByText } = setup(state)
        expect(getByText(/Add Product/i)).toBeInTheDocument()
        expect(getByText(/Table Product/i)).toBeInTheDocument()

        expect(getByText(/volta/i)).toBeInTheDocument()
        expect(getByText(/druga/i)).toBeInTheDocument()

        expect(getByText(/300,000/i)).toBeInTheDocument()
        expect(getByText(/200,000/i)).toBeInTheDocument()

        expect(getByText(/black/i)).toBeInTheDocument()
        expect(getByText(/silver/i)).toBeInTheDocument()

        const button = getByTestId(/delete-1/i)
        userEvent.click(button)

        // debug()
    })

    test('rendering error message', () => {
        const state = {
            data: [],
            loading: false,
            error: 'Something Went Wrong'
        }

        const { getByText } = setup(state)
        const error = getByText(/something went wrong/i)
        expect(error).toBeInTheDocument()
    })
})