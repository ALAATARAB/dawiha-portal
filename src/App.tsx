import React from 'react'
import { Provider } from 'react-redux'

import GlobalLayout from './app/core/Layout/GlobalLayout'
import { store } from './app/core/redux-store/store'
const App = () => {
    return (
        <>
            <Provider store={store}>
                <GlobalLayout />
            </Provider>
        </>
    )
}

export default App
