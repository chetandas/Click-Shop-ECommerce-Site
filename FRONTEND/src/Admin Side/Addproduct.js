import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigatesection from "./Navigatesection";
import { Button } from "../styles/Button";
import axios from "axios";
const Addproduct = () => {
    const [prodsname, setsname]=useState("");
    const [prodname, setname]=useState("");
    const [prodimage, setimage]=useState("");
    const [prodcategory, setcategory]=useState("");
    const [prodbrand, setbrand]=useState("");
    const [prodprice, setprice]=useState("");
    const [proddesc, setdesc]=useState("");
    const [categories, setcategories]=useState([]);

    useEffect(()=>{
        getcategories();
    },[])

    const getcategories=async()=>{
        const result = await axios.get("http://localhost:5000/getcategories");
        setcategories(result.data);
    }
    
    /*while adding we need product id bcoz i forgot to put auto increment for product_id and used it as foreign key in orders table
  now to fix it we need to remove it as foreign key and again modify it so instead directly get the latest value of product_id from
  database by using MAX() func and do +1 to it and send it to backend while making post req for adding product */
  const addproduct = async (e) => {
    e.preventDefault();
    const ans = await axios.get("http://localhost:5000/getproductid");
    if(ans.data.message === "Cant get the id")
    {
      swal({
        title: "Something Went Wrong",
        text:"Please Try again",
        icon: "error",
        button:"Try Again"
      })
    }
    else {
      const res = await axios.post("http://localhost:5000/addproduct", {
        product_id:ans.data[0].product_id+1,
        product_sname: prodsname,
        product_name: prodname,
        product_category: prodcategory,
        product_brand: prodbrand,
        product_desc: proddesc,
        product_price: prodprice,
        product_img: prodimage,
      });
      console.log(res.data);
      if (res.status === 200) {
        swal({
          title: "Product Added Successfully",
          icon: "success",
          button: {
            text: "Continue",
            value: "button",
          },
        }).then((value) => {
          navigate("/admindashboard");
        });
      }
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <Navigatesection section={"add product"} />
        <div className="box2">
           <h2>Add Product</h2>
          <form onSubmit={addproduct}>
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
                onChange={(e)=>setsname(e.target.value)}
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
                onChange={(e)=>setname(e.target.value)}
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
                onChange={(e)=>setimage(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product category" className="input-label">
                Product Category
              </label>
              <br />
              <select name="category" id="category" style={{width:"87%", 
                padding:"1.1rem" , margin:"1.1rem 1.5rem", "border-radius":"0.7rem" }} onChange={e=>setcategory(e.target.value)}>
                <option>None</option>
                {
                    categories.map((elem)=>{
                        return(
                            <option key={elem.category_id}>{elem.category_name}</option>
                        )
                    })
                }
              </select>
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
                onChange={(e)=>setbrand(e.target.value)}
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
                onChange={(e)=>setprice(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="product Description" className="input-label">
                Product Description
              </label>
              <textarea name="product description" cols="50" rows="10" 
                style={{margin:"1.1rem 1.2rem", "border-radius":".7rem"}}
                value={proddesc} onChange={e=>setdesc(e.target.value)}></textarea>
            </div>
            <div className="btn">
              <Button className="input-btn" type="submit">
                Add Product
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
      margin-left:2rem;
      width: 50%;
      padding: 1rem 2rem;
      border: 2px translucent;
      border-radius: 0.7rem;
      h2{
        font-size:1.7rem;
        font-weight:450;
        padding:.4rem;
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
export default Addproduct;
