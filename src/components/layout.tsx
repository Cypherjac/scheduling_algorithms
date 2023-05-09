import React from 'react'
import Footer from './footer'
import NavBar from './navbar'

export default function Layout({ children, ...pageProps }){
    return (
        <div id="container" className={ pageProps.location }>
            <NavBar location={ pageProps.location }></NavBar>
            <div className='h-nav'></div>
            {children}
            <div className='h-60 w-full'></div>
            <Footer></Footer>
        </div>
    )
}