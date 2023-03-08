//this page will fetch the top products and display it on home page in top products section
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {Link} from "react-router-dom";
const Wrapper = styled.section`
  padding: 1rem;
  h2 {
    text-align: center;
    padding: 1.2rem;
    font-size: 2.6rem;
    font-weight: 500;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(auto, auto);
    grid-gap: 1.2rem;
    .box {
      padding-top: 0.9rem;
      display: flex;
      flex-direction: column;
      img {
        margin-left: 1rem;
        width: 250px;
        height: 245px;
        object-fit: scale-down; //this will fit entire pic correctly irrespective of width and height
        &:hover {
          transform: scale(1.1);
        }
      }
      .title {
        // margin-top:auto;
        // margin-bottom:auto;
        padding: auto auto;
        font-weight: 501;
        font-size: 1.3rem;
      }
      .price {
        margin-top:auto;
        // padding-top: 0.2rem;
        // padding-bottom: 0.1rem;
        text-align:center;
        font-size: 1.8rem;
        font-weight: 500;
      }
    }
  }
`;
const Topproducts = () => {
  const [data, setdata] = useState([]); //this will store the fetched data from database
  useEffect(() => {
    getdata(); //we use useeffect to monitor changes so everytime the page loads call the func to get the data
  },[]);
  const getdata = async () => {
    const result = await axios.get("http://localhost:5000/topproducts"); //makes a req to backend to fetch the data
    setdata(result.data); //after successfully fetching store in the array delcared
  };
  return (
    <Wrapper className="section">
      <h2>Top Products</h2>
      <div className="container">
        {data.map((currelem) => {
          return (
            <div className="box" key={currelem.product_id}>
              <Link to={`/singleproduct/${currelem.product_id}`}><img src={currelem.product_img} alt={currelem.product_sname} /></Link>
              {/* <img src={currelem.product_img} alt={currelem.product_sname} /> */}
              <h2 className="title">{currelem.product_sname}</h2>
              <h2 className="price">₹{currelem.product_price}</h2>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default Topproducts;
