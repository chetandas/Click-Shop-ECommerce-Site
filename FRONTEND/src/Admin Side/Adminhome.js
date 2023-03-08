import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiCurrencyRupee } from "react-icons/hi";
import {MdProductionQuantityLimits} from "react-icons/md";
import {BsCart4} from "react-icons/bs";
import axios from "axios";
import Navigatesection from "./Navigatesection";
import Orderschart from "./Orderschart";
const Adminhome = () => {
    const [stats, setstats]=useState({
        earnings:0,
        products:0,
        orders:0,
    })
    useEffect(()=>{
        getstats();
    },[])
    const getstats=async()=>{
        const res1=await axios.get("http://localhost:5000/orderstats");
        const res2=await axios.get("http://localhost:5000/productstats");
        console.log(res1.data[0].earnings)
        setstats({earnings:res1.data[0].earnings, products:res2.data[0].products, orders:res1.data[0].orders})
    }
  return (
    <Wrapper>
      <div className="container">
        <Navigatesection section={"dashboard"}/>
        <div className="box2">
            <h2>Admin Dashboard</h2>
          <div className="stats">
            <div className="earnings statssection">
              <h3>Earnings</h3>
              <div className="data">
                <p>₹{stats.earnings}</p>
                <HiCurrencyRupee className="icon" size={"1.8rem"}/>
              </div>
            </div>
            <div className="products statssection">
              <h3>Products</h3>
              <div className="data">
                <p>{stats.products}</p>
                <MdProductionQuantityLimits className="icon" size={"1.7rem"}/>
              </div>
            </div>
            <div className="orders statssection">
              <h3>Orders</h3>
              <div className="data">
                <p>{stats.orders}</p>
                <BsCart4 className="icon" size={"1.8rem"}/>
              </div>
            </div>
          </div>
          <Orderschart/>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 1.2rem 2rem;
  .container {
    padding: 1.2rem;
    display: grid;
    grid-template-columns: 0.25fr 1fr;
    .box2 {
        h2{
            font-size:2rem;
            font-weight:450;
        }
      .stats{
        display:flex;
        justify-content:space-between;
        gap:1rem;
        padding:2rem 4.5rem;
        .statssection{
            width:22%;
            background-color: ${({ theme }) => theme.colors.bg};
            h3{
                text-align:center;
            }
            border:2px solid gray;
            border-radius:.7rem;
            padding:1.2rem 2rem;
            .data{
                display:flex;
                .icon{
                    margin-left:37%;
                    margin-top:12%;
                }
            }         
        }
      }
    }
  }
`;
export default Adminhome;
