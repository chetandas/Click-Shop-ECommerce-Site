import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigatesection = (props) => {
    let navigate=useNavigate();
    const [section, setsection]=useState(props.section);
  return (
    <Wrapper>
      <div className="box1">
        <div className="icon-section">
          <img src="/images/adminicon.jpg" alt="adminicon" />
          <h3 style={{ padding: "0 17%" }}>Admin</h3>
        </div>
        <div className="category-section">
          <p onClick={()=>{setsection("dashboard"); navigate("/admindashboard")}}
            style={
              section === "dashboard"
                ? { "text-decoration": "underline", color: "#8490ff" }
                : null
            }
          >
           Dashboard
          </p>
          <p onClick={()=>{setsection("view products"); navigate("/viewproducts")}} style={
              section === "view products"
                ? { "text-decoration": "underline", color: "#8490ff" }
                : null
            } >View Products</p>
          <p onClick={()=>{setsection("add product"); navigate("/addproduct")}} style={
              section === "add product"
                ? { "text-decoration": "underline", color: "#8490ff" }
                : null
            } >Add Product</p>
          <p onClick={()=>{setsection("view orders"); navigate("/vieworders")}} style={
              section === "view orders"
                ? { "text-decoration": "underline", color: "#8490ff" }
                : null
            } >View Orders</p>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper=styled.section`
.box1 {
    background-color: ${({ theme }) => theme.colors.bg};
    border:2px solid gray;
    border-radius:.8rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .icon-section {
      img {
        width: 200px;
        height: 150px;
        object-fit: scale-down;
      }
    }
    .category-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-left:15%;
      p{
          &:hover{
              cursor:pointer;
          }
      }
    }
  }
`;
export default Navigatesection;