import React from "react";
import Navbar from "../component/Navbar";
import VeterinaryTeamCard from "../component/VeterinaryTeamCard";
import Footer from "../component/Footer";

const VeterinaryTeam = () => {
  return (
    <div>
        <Navbar></Navbar>
        <VeterinaryTeamCard></VeterinaryTeamCard>
        <Footer></Footer>
    </div>
    );
};

export default VeterinaryTeam;