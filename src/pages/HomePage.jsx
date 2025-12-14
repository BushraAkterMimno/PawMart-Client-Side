import React from "react";
import Navbar from "../component/Navbar";
import HeroCarousel from "../component/HeroCarousel";
import PetCategory from "../component/PetCategory";
import PetFoodCategory from "../component/PetFoodCategory";
import PetCareProductsCategory from "../component/PetCareProductsCategory";
import RecentListing from "../component/RecentListing";
import PawMartSections from "../component/PawMartSections";
import Footer from "../component/Footer";

const HomePage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <HeroCarousel></HeroCarousel>
            <PetCategory></PetCategory>
            <PetFoodCategory></PetFoodCategory>
            <PetCareProductsCategory></PetCareProductsCategory>
            <RecentListing></RecentListing>
            <PawMartSections></PawMartSections>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;