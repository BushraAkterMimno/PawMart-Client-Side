import React from "react";
import Navbar from "../component/Navbar";
import RecentListingCard from "../component/RecentListingCard";
import AccessoriesCard from "../component/AccessoriesCard";
import FoodCard from "../component/FoodCard";
import CareProductCard from "../component/CareProductCard";
import Footer from "../component/Footer";

const PetAccessories = () => {
  return (
    <div>
        <Navbar></Navbar>
        <RecentListingCard></RecentListingCard>
        <AccessoriesCard></AccessoriesCard>
        <FoodCard></FoodCard>
        <CareProductCard></CareProductCard>
        <Footer></Footer>
    </div>
    );
};

export default PetAccessories;