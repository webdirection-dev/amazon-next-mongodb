import '/static/styles/reset.css'
import '/static/styles/globals.css'

import {store} from '../static/store'
import {Provider} from "react-redux"

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
)
export default App
