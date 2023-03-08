import React from "react";
import { NavLink, Link } from "react-router-dom";
// import Navbar from "./Navbar";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa"; //shopping cart icon
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"; //user icon
import { useState } from "react";
import { Button } from "../styles/Button";
import axios from "axios";
import {GiShoppingCart} from "react-icons/gi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header(props) {
  const [logicon, setlogicon] = useState(false);
  const { isuserloggedin, userlogin, userdetails, isadmin, setcartproducts} = props;
  
  const handlelogout=()=>{
    axios.get("http://localhost:5000/logout").then((res)=>{
      if(res.data.loggedout === true)
      {
        console.log("loggedout successfully");
        userlogin();
        toast.success('Logged Out Successfully', {
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
    })
  }

  //add css for the elements
  const MainHeader = styled.header`
    .container {
      padding: 0 4.5rem;
      height: 6rem;
      background-color: ${({ theme }) => theme.colors.bg};
      display: flex;
      justify-content:space-between;
      align-items: center;
      .logo {
        height: 90px;
        object-fit: cover;
        width: 200px;
      }
      .navbar-list {
        display: flex;
        gap: 4rem;
        padding-right:5rem;
        li {
          .navbar-link {
            padding-top: 0.5em;
            &:link,
            &:visited {
              display: inline-block;
              text-decoration: none;
              font-size: 1.3rem;
              font-weight: 500;
              text-transform: uppercase;
              color: ${({ theme }) => theme.colors.black};
              transition: color 0.3s linear;
            }
            &:hover,
            &:active {
              color: ${({ theme }) => theme.colors.helper};
            }
          }
        }
      }
      .usericon {
        //usericon css
        padding-top:.45rem;
        padding:right:1rem;
        &:hover {
          //when we place our cursor on the usericon we change the cursor style to pointer which indicates a link
          cursor: pointer;
          transform: scale(
            1.2
          ); //this will increase the size when we place the curosor on the icon
        }
      }
    }
    .menu{
      position:absolute;
      right:3%;
      .sub-menu{
        .user-info{
          display:flex;
          flex-direction:column;
          gap:1rem;
          background-color:${({ theme }) => theme.colors.bg};
          border:2px solid;
          border-radius:0.5rem;
          h2{
            background-color:${({ theme }) => theme.colors.bg};
            // padding:0 .5rem;
            padding-top:.1rem;
            padding-bottom:.2rem;
            margin:0 .2rem;
            font-size:1.3rem;
            font-weight:500;
            .menu-icons{
              margin-right:.3rem;
            }
            .btn{
              font-size:1.2rem;
            }
          }
        }
      }
    }
  `;
  return (
    <MainHeader>
      <div className="container">
        <div className="container-left">
          {/*navlink is same lyk link so if anyone clicks on logo he will be redirected to home page*/}
          <NavLink to="/">
            <img src="/images/logo-1.jpg" alt="logo" className="logo" />
          </NavLink>
        </div>
        <div className="container-right">
          <ul className="navbar-list">
            <li>
              <NavLink className="navbar-link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar-link" to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar-link" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="navbar-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <div className="usericon" onClick={() => setlogicon(!logicon)}>
              {<FaUserAlt size="25px" />}
            </div>
          </ul>
        </div>
      </div>
      {logicon ? (
        <div className="menu">
          <div className="sub-menu">
            {isuserloggedin &&
              <div className="user-info">
                <h2>Welcome!!<br />{isadmin === false ? userdetails.name : "Admin"}</h2>
                <hr />
                <Link to={isadmin === false ? "/orders": "/admindashboard"} onClick={() => setlogicon(!logicon)}>
                  <h2>{isadmin === false ? <GiShoppingCart className="menu-icons" size="1.5rem" /> 
                  : <FaUserAlt className="menu-icons" size="1.5rem"/> }{isadmin === false  ? "MyOrders" : "Dashboard"}</h2>
                </Link>
                <hr />
                <Link to="/cart" onClick={() => setlogicon(!logicon)}>
                  <h2><FaShoppingCart className="menu-icons" size="1.5rem" />{" "}MyCart</h2>
                </Link>
                <hr />
                {/*when user clicks on logout then hide the dropdown and also change the isuserloggedin state 
                    for calling mutiple functions onclick below is the syntax */}
                <Link onClick={() => {setlogicon(!logicon); setcartproducts([]); handlelogout()} } to="/login">
                  <h2><FaSignOutAlt className="menu-icons" size="1.5rem" />Logout</h2>
                </Link>
              </div>
           }
            {!isuserloggedin  &&
              <div className="user-info notloggedin">
              <Link to="/login" onClick={() => setlogicon(!logicon)}>
                <h2>Sign In</h2>
              </Link>
              <hr />
              <Link to="/registration" onClick={() => setlogicon(!logicon)}>
                <h2>
                  New User? <Button className="btn">Sign Up</Button>
                </h2>
              </Link>
            </div>}
            <ToastContainer/>
          </div>
        </div>
      ) : null}
    </MainHeader>
  );
}
