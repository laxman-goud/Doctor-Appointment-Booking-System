// Importing necessary components used on the homepage
import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
    return (
        <div>
            {/* Header Section */}
            <Header />

            {/* Displays various medical specialties */}
            <SpecialityMenu />

            {/* Section showcasing top-rated doctors */}
            <TopDoctors />

            {/* Promotional or informational banner section */}
            <Banner />
        </div>
    )
}

export default Home
