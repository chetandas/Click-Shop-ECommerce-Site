import React from "react";
import HeroSection from "../../HeroSection";
import Services from "../Services";
import Categories from "./Categories";
import Topproducts from "./Topproducts";

export default function Home() {
  const data={
    image:"/images/home.jpg",
    para:"Click Shop is a vast Internet-based enterprise that sells headphones, mobile phones, accessories, electronics, and many other goods, either directly or as the middleman between other retailers and Click Shop's millions of customers."
  }
  return (
    //we are sending the info and image path as props so that for home and about we dont need to create the section again nd again
    <div>
      <HeroSection {...data}/>
      <Categories/>
      <Topproducts/>
      <Services/>
    </div>
  );
}