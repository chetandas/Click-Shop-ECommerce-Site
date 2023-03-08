import React from "react";
import HeroSection from "../../HeroSection";
import Services from "../Services";
import Trusted from "../Trusted";

export default function About() {
  const data = {
    image: "/images/about.jpg",
    para: "E-commerce is revolutionizing the way we all shop in India.Click Shop houses everything you can possibly imagine, from trending electronics like laptops,smartphones and accessories that make your life easy like TVs, ACs and small appliances.Click Shop is your best bet. Shop in your PJs, at night or in the wee hours of the morning. This e-commerce never shuts down.",
  };
  return(
  <div>
   <HeroSection {...data} />
   <Services/>
   <Trusted/>
  </div>
  ); 
}
