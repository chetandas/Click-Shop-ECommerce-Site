import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button"; //custom button css that we created we are importing it
//we are creating this bcoz our home page and about page both have images and content in common so instead of defining the properties
//again and again simply create it once and then just add the data dynamically to it...
export default function HeroSection(props) {
  const Wrapper = styled.section`
    padding: 3rem 5rem;
    .section-hero-data {
      h1{
        font-weight:500;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .btn {
      margin-left:30%;
      max-width: 15rem;
    }
    .hero-top-data {
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.black};
    }
    .hero-heading {
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      font-size: 2.4rem;
    }
    .hero-para {
      margin-left:12%;
      margin-top: 1.2rem;
      margin-bottom: 2.4rem;
      max-width: 60rem;
    }
    .section-hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    picture {
      text-align: center;
    }
    .hero-img {
      max-width: 70%;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .grid {
        gap: 7.2rem;
      }
    }
  `;
  return (
    <Wrapper>
      <div className="container grid grid-two-column">
        <div className="section-hero-data">
          <p className="hero-top-data">Welcome to</p>
          <h1 className="hero-heading">Click Shop Online Stores</h1>
          <p className="hero-para">
            {props.para}
          </p>
          {/*now here for the button we want the css to be applied for all the buttons in our website so for dat
        same lyk globalstyle create a button.js file and add all the css in it and import it wherever requiered*/}
          <Button className="btn getstarted-btn">
            <NavLink to="/products">Get Started</NavLink>
          </Button>
        </div>
        {/*this is for image part*/}
        <div className="section-hero-image">
          <picture>
            <img src={props.image} alt="hero" className="hero-img" />
          </picture>
        </div>
      </div>
    </Wrapper>
  );
}
