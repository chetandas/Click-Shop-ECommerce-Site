import React from "react";
import { NavLink } from "react-router-dom"; //this one just acts lyk anchor tag and an substitute to Link tag in router-dom
//below are the fontawesome icons used
import { FaShopify } from "react-icons/fa"; //for website logo
import { FaFacebookF } from "react-icons/fa"; //facebook icon
import { FaInstagram } from "react-icons/fa"; //insta icon
import { FaLinkedin } from "react-icons/fa"; //linkedin icon
import { FaTwitter } from "react-icons/fa"; //twitter icon
import { FaPhone } from "react-icons/fa"; //phone icon
import { FaEnvelope } from "react-icons/fa"; //email icon
import { FaMapMarkerAlt } from "react-icons/fa"; //location icon
import { FaArrowRight } from "react-icons/fa"; //right arrow icon
import { Button } from "../styles/Button"; //our custom button
import styled from "styled-components";
export default function Footer() {
  const Wrapper = styled.footer`
    margin-top:auto;
    padding: 0rem 2.2rem;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    .box-container {
      display: flex;
      justify-content: space-between;

      .headings{
        color:${({ theme }) => theme.colors.white};
      }
      .box { 
        p{
          color:${({ theme }) => theme.colors.helper};
        }
        width:25%;
        padding: 1rem 0;
      }
    }
    .share {
      padding: 1.5rem 0;
      display: grid;
      grid-template-columns: repeat(4, 30px);
      gap: 5px;
      .sociallinks{
        &:hover{
          transform:scale(1.2);
        }
      }
    }
    .linksbox {
      padding: 1rem 0;
      display: grid;
      gap: 22px;
      .contactlinks{
          &:hover{
            transform:scale(1.1);
          }
      }
    }
    .btn{
        margin:1.1rem 0;
    }
    .box{
      .pagelinks{
        p{
          &:hover{
            transform:scale(1.1);
          }
        }
        
      }
    }
    .newsbox{
      .email{
        text-transform:none;
        width:15rem;
      }
    }
    }
  `;
  return (
    <Wrapper className="footer">
      <div className="box-container">
        <div className="box">
          <h3 className="headings">Click Shop {<FaShopify />}</h3>
          <p style={{color:"white"}}>
            Feel Free To Follow Us On Our Social Media Handkers All The Links
            Are Given Below
          </p>
          <div className="share">
            <NavLink className="sociallinks" to="/about">{<FaFacebookF size="22px" color="white"/>}</NavLink>
            <NavLink className="sociallinks" to="/about">{<FaTwitter size="24px" color="white"/>}</NavLink>
            <NavLink className="sociallinks" to="/about">{<FaInstagram size="25px" color="white"/>}</NavLink>
            <NavLink className="sociallinks" to="/about">{<FaLinkedin size="25px" color="white"/>}</NavLink>
          </div>
        </div>

        <div className="box">
          <h3 className="headings" style={{padding:"0 12px"}}>Contact Info</h3>
          <div className="linksbox">
            <NavLink className="contactlinks" to="/" style={{color:"white",padding:"0 26.5px"}}>{<FaPhone size="15px" color="white"/>} +123-456-789</NavLink>
            <NavLink className="contactlinks" to="/" style={{color:"white",padding:"0 26.5px"}}>{<FaPhone size="15px" color="white"/>} +111-222-333</NavLink>
            <NavLink className="contactlinks" to="/" style={{color:"white",padding:"0 26.5px"}}>{<FaEnvelope size="15px" color="white"/>} Example@gmail.com</NavLink>
            <NavLink className="contactlinks" to="/" style={{color:"white",padding:"0 26.5px"}}>
              {<FaMapMarkerAlt size="15px" color="white"/>} Hyderabad Telangana 500013
            </NavLink>
          </div>
        </div>

        <div className="box">
          <h3 className="headings">Quick Links</h3>
          <NavLink className="pagelinks" to="/">
            <p  style={{color:"white"}}>{<FaArrowRight color="white"/>} Home</p>
          </NavLink>
          <NavLink className="pagelinks" to="/about">
            <p style={{color:"white"}}>{<FaArrowRight color="white"/>} About</p>
          </NavLink>
          <NavLink className="pagelinks" to="/products">
            <p style={{color:"white"}}>{<FaArrowRight color="white"/>} Products</p>
          </NavLink>
          <NavLink className="pagelinks" to="/contact">
            <p style={{color:"white"}}>{<FaArrowRight color="white"/>} Contact</p>
          </NavLink>
        </div>

        <div className="box newsbox">
          <h3 className="headings">NewsLetter</h3>
          <p style={{color:"white"}}>Subscribe For Latest Updates</p>
          <input
            type="email"
            placeholder="Enter Your MailId"
            className="email"
          />
          <Button className="btn">
            <h3>Subscribe</h3>
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
