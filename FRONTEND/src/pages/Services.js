import React from "react";
import styled from "styled-components";
import { TbTruckDelivery } from "react-icons/tb"; //icon for delivery
import { MdSecurity } from "react-icons/md"; //icon for shipping
import { GiReceiveMoney } from "react-icons/gi"; //icon for refund
import { RiSecurePaymentLine } from "react-icons/ri"; //icon for security payment
const Wrapper = styled.section`
  .title{
    padding:1rem;
    font-size:2.6rem;
    font-weight:500;    
  }
  .container {
    padding-top:.8rem;
    padding-bottom: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    .box1 {
      padding-top: 3rem;
      .icon {
        color: ${({ theme }) => theme.colors.helper};
        margin-left: 30%;
      }
      h2 {
        padding-bottom: 1rem;
      }
      background-color: ${({ theme }) => theme.colors.bg};
      border-radius: 1em;
    }
    .box2 {
      display: grid;
      grid-gap: 1.5rem;
      .box2a {
        display: flex;
        padding: 1.2rem;
        gap: 0.5rem;
        .icon {
          color: ${({ theme }) => theme.colors.helper};
          margin-left: 5%;
        }
        h2 {
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        background-color: ${({ theme }) => theme.colors.bg};
        border-radius: 0.8rem;
      }
      .box2b {
        display: flex;
        padding: 1.2rem;
        gap: 0.5rem;
        .icon {
          color: ${({ theme }) => theme.colors.helper};
          margin-left: 5%;
        }
        h2 {
          padding-top: 1.4rem;
          padding-bottom: 1rem;
        }
        background-color: ${({ theme }) => theme.colors.bg};
        border-radius: 0.8rem;
      }
    }
    .box3 {
      padding-top: 3rem;
      .icon {
        color: ${({ theme }) => theme.colors.helper};
        margin-left: 33%;
      }
      h2 {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      background-color: ${({ theme }) => theme.colors.bg};
      border-radius: 1rem;
    }
  }
`;
const Services = () => {
  return (
    <Wrapper>
      <h2 className="title">Our Services</h2>
      <div className="container">
        <div className="box1">
          <TbTruckDelivery size="8rem" className="icon" />
          <h2>Super And Fast Delivery</h2>
        </div>
        <div className="box2">
          <div className="box2a">
            <MdSecurity size="4rem" className="icon" />
            <h2>Non-Contact Shipping</h2>
          </div>
          <div className="box2b">
            <GiReceiveMoney size="4rem" className="icon" />
            <h2>Money-Back Gauranteed</h2>
          </div>
        </div>
        <div className="box3">
          <RiSecurePaymentLine size="7rem" className="icon" />
          <h2>Super Secure Paymnet System</h2>
        </div>
      </div>
    </Wrapper>
  );
};
export default Services;
