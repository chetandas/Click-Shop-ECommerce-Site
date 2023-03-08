//this page will display the particular product which user is willing to view
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
//below is for including react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Wrapper = styled.section`
  padding: 1.2rem;
  .container {
    display: flex;
    flex-wrap: wrap;
    gap:.4rem;
    padding: 2rem 2rem;
    align-items: center;
    justify-content: center;
    .left-container {
      img {
        height: 250px;
        weight: 180px;
        object-fit: scale-down;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .right-container {
      width: 65%;
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 0.8rem;
      .btn {
        max-width: 15rem;
        font-size: 1.3rem;
      }
      .desc{
        font-size:1.2rem;
        margin:0;
        padding:0;
      }
      p {
        padding: 0;
        margin: 0;
      }
      .box {
        display: flex;
        gap: 0.2rem;
        flex-wrap: wrap;
        p {
          font-size: 1.5rem;
        }
        .cnt{
          padding:0;
          margin:0;
          font-size:1.4rem;
        }
        .icons{
          margin:.2rem;
          &:hover{
            cursor:pointer;
          }
        }
      }
    }
  }
`;
const Singleproduct = (props) => {
  const {addproduct , cartproducts , setcartproducts}=props
  const { id } = useParams(); //will fetch the id of the product attached to url
  const [data, setdata] = useState([]);
  const [count, setcnt] = useState(0);
  const [cart,setcart]=useState(false);
  useEffect(() => {
    getproduct();
  }, []);
  const delproduct=(id)=>{
    const newarr=cartproducts.filter((item)=>{
        return item.product_id !== id
    })
    setcartproducts(newarr);
  }
  const decrease=(id)=>{
    for(let i=0;i<cartproducts.length;i++)
    {
        if(cartproducts[i].product_id === id)
        {
            if(cartproducts[i].product_quantity === 1)
            {
                 delproduct(id);
                 break;
            }
            else
            {
                cartproducts[i].product_quantity=cartproducts[i].product_quantity-1;
                const newarr=[...cartproducts];
                setcartproducts(newarr);
                break;
            }
        }
    }
  }
  const increase=(id)=>{
    for(let i=0;i<cartproducts.length;i++)
    {
        if(cartproducts[i].product_id === id)
        {
            cartproducts[i].product_quantity=cartproducts[i].product_quantity+1;
            break;
        }
    }
    const newarr=[...cartproducts];
    setcartproducts(newarr);
  }
  const dodec = () => {
    if(count===0)
    {
      setcnt(0);
      setcart(false);
      toast.info('Item Removed From The Cart', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      
    }
    else
    {
      setcnt(count-1);
      toast.info('Item Quantity Decreased', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };
  const doinc = () => {
    setcnt(count + 1);
    console.log(count + 1);
    toast.info('Item Quantity Increased', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

  };
  const managecart=()=>{
    setcart(true);
    toast.success('Item Added to Cart Successfully', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  const getproduct = async () => {
    const result = await axios.get(`http://localhost:5000/getproduct/${id}`); //send a req to backend to fetch that product details
    /*we get response in the form of array so to access any data its lyk accessing the index...as we have
      only 1 product it will be available at 0th index*/
    setdata(result.data[0]);
    // console.log(data);
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="left-container">
          <img src={data.product_img} alt={data.product_sname} />
        </div>
        <div className="right-container">
          <h3 className="title">{data.product_name}</h3>
          <div className="box">
            <h3>Price:</h3>
            <h3>₹{data.product_price}</h3>
          </div>
          <p className="desc">{data.product_desc}</p>
          <div className="box">
            <h3>Brand:</h3>
            <p>{data.product_brand}</p>
          </div>
          {cart?
            (<div className="box">
              <AiOutlineMinus className="icons" onClick={()=> {dodec(); decrease(data.product_id)}} size="1.6rem"/>
              <p className="cnt">{count+1}</p>
              <AiOutlinePlus className="icons" onClick={()=> {doinc(); increase(data.product_id)}} size="1.5rem"/>
            </div>):null
          }
          <Button className="btn" onClick={()=> { addproduct(data); managecart()}}>
            Add To Cart
          </Button>
          <ToastContainer/>
        </div>
      </div>
    </Wrapper>
  );
};
export default Singleproduct;