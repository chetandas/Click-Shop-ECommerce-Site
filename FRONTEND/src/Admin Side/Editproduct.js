import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { useState } from "react";
import Navigatesection from "./Navigatesection";
import { Button } from "../styles/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Editproduct = () => {
    let navigate=useNavigate();
    const {id}=useParams();
    const [prodsname, setsname]=useState("");
    const [prodname, setname]=useState("");
    const [prodimage, setimage]=useState("");
    const [prodcategory, setcategory]=useState("");
    const [prodbrand, setbrand]=useState("");
    const [prodprice, setprice]=useState(0);
    const [proddesc, setdesc]=useState("");

    useEffect(()=>{
        loaddata();
    },[])

    const loaddata=async()=>{
        const res=await axios.get(`http://localhost:5000/getdetails/${id}`);
        setsname(res.data[0].product_sname);
        setname(res.data[0].product_name);
        setimage(res.data[0].product_img);
        setcategory(res.data[0].product_category);
        setbrand(res.data[0].product_brand);
        setprice(res.data[0].product_price);
        setdesc(res.data[0].product_desc);
    }

    const updateproduct=async(e)=>{
        e.preventDefault();
        const res=await axios.post(`http://localhost:5000/updateproduct/${id}`,{
            id:id,
            product_sname:prodsname,
            product_name:prodname,
            product_category:prodcategory,
            product_brand:prodbrand,
            product_desc:proddesc,
            product_price:prodprice,
            product_img:prodimage,
        })
        console.log(res.data);
        //when user successfully edits the product then show an alert saying uh successfully edited the product
        swal({
          title: "Updated Product Details Successfully",
          icon: "success",
          button: {
            text:"Continue",
            value:"button",
          },
        }).then((value)=>{
          navigate("/viewproducts");
        })
    }
  return (
    <Wrapper>
      <div className="container">
        <Navigatesection section={"edit product"} />
        <div className="box2">
          <h2>Add Product</h2>
          <form onSubmit={updateproduct}>
            <div className="input-block">
              <label htmlFor="product sname" className="input-label">
                Product Short Name
              </label>
              <input
                type="text"
                autoComplete="off"
                name="product sname"
                id="name"
                placeholder="Enter Product Name"
                value={prodsname}
                onChange={(e) => setsname(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product name" className="input-label">
                Product Name
              </label>
              <input
                type="text"
                autoComplete="off"
                name="product name"
                id="product name"
                placeholder="Enter Product Name"
                value={prodname}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product image" className="input-label">
                Product Image
              </label>
              <input
                type="text"
                autoComplete="off"
                name="product image"
                id="product image"
                placeholder="Enter Product Image Path"
                value={prodimage}
                onChange={(e) => setimage(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product category" className="input-label">
                Product Category
              </label>
              <input
                type="text"
                autoComplete="off"
                name="product category"
                id="product brand"
                placeholder="Enter Product Brand"
                value={prodcategory}
                onChange={(e) => setcategory(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product brand" className="input-label">
                Product Brand
              </label>
              <input
                type="text"
                autoComplete="off"
                name="product brand"
                id="product brand"
                placeholder="Enter Product Brand"
                value={prodbrand}
                onChange={(e) => setbrand(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product price" className="input-label">
                Product Price
              </label>
              <input
                type="text"
                autoComplete="off"
                name="product price"
                id="product price"
                placeholder="Enter Product Price"
                value={prodprice}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product Description" className="input-label">
                Product Description
              </label>
              <textarea
                name="product description"
                cols="50"
                rows="10"
                style={{ margin: "1.1rem 1.2rem", "border-radius": ".7rem" }}
                value={proddesc}
                onChange={(e) => setdesc(e.target.value)}
              ></textarea>
            </div>
            <div className="btn">
              <Button className="input-btn" type="submit">
                Update Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    padding: 1.2rem;
    display: grid;
    grid-template-columns: 0.25fr 1fr;
    .box2 {
      background-color: ${({ theme }) => theme.colors.bg};
      margin-left: 2rem;
      width: 50%;
      padding: 1rem 2rem;
      border: 2px translucent;
      border-radius: 0.7rem;
      h2 {
        font-size: 1.7rem;
        font-weight: 450;
        padding: 0.4rem;
      }
      .input-block {
        label {
          padding: 0 2.2rem;
          font-size: 1.3rem;
        }
        input {
          text-transform: none;
          margin: 1.1rem 1.5rem;
          border-radius: 0.7rem;
          width: 87%;
        }
        p {
          padding: 0 0;
          margin: -0.2rem 7rem;
          font-size: 1rem;
          font-weight: 400;
          color: ${({ theme }) => theme.colors.red};
        }
      }
      .btn {
        display: flex;
        justify-content: center;
        .input-btn {
          font-size: 1.3rem;
          padding: 0.3rem 1.2rem;
          margin: 0.4rem 0;
        }
      }
    }
  }
`;
export default Editproduct;
