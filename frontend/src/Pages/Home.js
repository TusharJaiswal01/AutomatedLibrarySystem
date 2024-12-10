import React from 'react'
import About from '../Components/Home/About'
import Contact from '../Components/Home/Contact'
import Features from '../Components/Home/Features'
import Footer from '../Components/Home/Footer'
import Hero from '../Components/Home/Hero'

function Home() {
    return (
        <div id='home'>
           <Hero/>
           <Features/>
           <About/>
           <Contact/>
           <Footer/>
        </div>
    )
}

export default Home
