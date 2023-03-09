import '/static/styles/reset.css'
import '/static/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import {store} from '../static/store'
import {Provider} from "react-redux"
import {SessionProvider} from 'next-auth/react'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
    <SessionProvider session={pageProps.session}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </SessionProvider>
)
export default App
