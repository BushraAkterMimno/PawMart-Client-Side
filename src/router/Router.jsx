import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddService from "../pages/AddService";
import ServicesDetails from "../pages/ServiceDetails";
import PetAccessories from "../pages/PetAccessories";
import AccessoriesDetails from "../pages/AccessoriesDetails";
import PetAdopt from "../pages/PetAdopt";
import PetDetails from "../pages/PetDetails";
import CareProductsDetails from "../pages/CareProductsDetails";
import FoodDetails from "../pages/FoodDetails";
import VeterinaryTeam from "../pages/VeterinaryTeam";
import VeterinaryMemberDetails from "../pages/VeterinaryMemberDetails";
import MyListings from "../pages/MyListings";
import Edit from "../pages/ListEdit";  
import MyOrders from "../pages/MyOrders";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Error from "../pages/Error";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },

  {
    path: "/add-service",
    element: (
      <PrivateRoute>
        <AddService />
      </PrivateRoute>
    ),
  },

  { 
    path: "/services-details", 
    element: <ServicesDetails /> 
  },

  { 
    path: "/pet-adopt", 
    element: <PetAdopt /> 
  },

  { 
    path: "/pet-details/:id", 
    element: <PetDetails /> 
  },

  { 
    path: "/pet-accessories", 
    element: <PetAccessories /> 
  },

  { 
    path: "/accessory-details/:id", 
    element: <AccessoriesDetails /> 
  },

  { 
    path: "/food-details/:id", 
    element: <FoodDetails /> 
  },

  { 
    path: "/care-product-details/:id", 
    element: <CareProductsDetails /> 
  },

  { 
    path: "/veterinary-team", 
    element: <VeterinaryTeam /> 
  },

  { 
    path: "/veterinary-member/:id", 
    element: <VeterinaryMemberDetails /> 
  },

  {
    path: "/my-listings",
    element: (
      <PrivateRoute>
        <MyListings />
      </PrivateRoute>
    ),
  },

  {
    path: "/my-listings/:id",
    element: (
      <PrivateRoute>
        <Edit />
      </PrivateRoute>
    ),
  },

  {
    path: "/my-orders",
    element: (
      <PrivateRoute>
        <MyOrders />
      </PrivateRoute>
    ),
  },

  { 
    path: "/contacts", 
    element: <Contacts /> 
  },

  { 
    path: "/about", 
    element: <About /> 
  },

  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },

  { 
    path: "/login", 
    element: <Login /> 
  },

  { 
    path: "/register", 
    element: <Register /> 
  },

  { 
    path: "/*", 
    element: <Error /> 
  },
]);

export default router;