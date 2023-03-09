import {FC, ReactNode} from "react"
import Head from "next/head"
import Header from './Header'
import Footer from './Footer'
import {ToastContainer} from 'react-toastify'

const General:FC<{children: ReactNode, title?: string}> = ({children, title='SHOP'}) => (
    <>
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='flex flex-col justify-between min-h-screen'>
            <Header />
            <main className='container m-auto mt-4 px-4'>{children}</main>
            <Footer />
        </div>

        <ToastContainer position='top-center' limit={1}/>
    </>
)
export default General
