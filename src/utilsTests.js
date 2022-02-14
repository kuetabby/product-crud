import { render as rtlRender } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

export function render(
    ui,
    {
        route = '/',
        preloadedState,
        reducer,
        store = configureStore({
            reducer,
            preloadedState,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware()
        }),
        ...renderOptions
    } = {}
) {
    const Wrapper = ({ children }) => {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Provider>
        )
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}