import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert"
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Button } from "../../styles/Button";
import { Link, useNavigate } from "react-router-dom";
const Login = (props) => {
  const { userlogin, setuser, setadmin}=props;//to login page we will be sending the data bcoz when user logs in we need to change the
  //content in usericon in navbar and also store the user details until he is logged out bcoz we need
  //to display all his info and store in db  
  const [email,setemail]=useState("");
  const [pwd,setpwd]=useState("");
  const [showpwd,setshowpwd]=useState(false);
  const togglepwd=()=>{
    setshowpwd(!showpwd);
  }
  let navigate=useNavigate();
  // console.log(email+" "+pwd);
  const login=async(e)=>{
    e.preventDefault();//this will prevent the page from reloading after submitting the form
    const result=await axios.post('http://localhost:5000/login',{
      email:email,
      password:pwd,
    });
    if(result.status===200)//if request was sent successfully and response was received
    {
      if(result.data.message ==="User Doesn't Exist")//if user entered invalid login credentials then send an alert
      {
        swal({
          title: result.data.message,
          text: "Please Register on the website to continue",
          icon: "error",
          button: "Try Again!!",
        });
      }
      else if(result.data.message === "Invalid Login Credentials")
      {
        swal({
          title: result.data.message,
          text: "Please Enter Valid Credentials",
          icon: "error",
          button: "Try Again!!",
        });
      }
      else
      {
        // console.log(result.data[0]);
        swal({
          title: "Logged in Successfully",
          text: "Happy Shopping!!",
          icon: "success",
          button: {
            text:"Continue",
            value:"button",
          },
        })
        .then((value)=>{//upon clicking the continue button do the below things 
          //1->change the login state
          //2->store the user details from database
          //3->navigate the user to home page
          userlogin();
          const userdata={
            id:result.data[0].user_id,
            name:result.data[0].name,
            email:result.data[0].email,
            phone:result.data[0].phone,
            password:result.data[0].password,
          }
          // console.log(userdata)
          setuser(userdata);        
          if(result.data[0].admin === 1)
          {
            console.log("user is admin")
            setadmin(true);
          }
          navigate("/");
        });
      }
    }
    else
    {
      swal({
        title: "Oops Something Went Wrong",
        // text: "Happy Browsing",
        icon: "warning",
        button: "Please Try Again",
      });
    }
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="container-left">
          <img src="./images/loginpic.jpg" alt="" />
        </div>
        <div className="container-right">
          <h3>Sign in</h3>
          <form onSubmit={login}>
            <div className="input-block">
              <label>{<FaUser />} Email</label>
              <input type="text" placeholder="Enter Your Email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
            </div>
            <div className="input-block">
              <label>{<FaLock />} Password</label>
              <input type={showpwd?"text":"password"} placeholder="Enter Your Password" value={pwd} onChange={(e)=>setpwd(e.target.value)} required/>
              <span className="pwdicon" onClick={togglepwd}>{showpwd?<FaEye/>:<FaEyeSlash/>}</span>            
            </div>
            <div className="btn">
              <Button className="input-btn" type="submit">
                Login
              </Button>
            </div>
          </form>
          <h2 className="sign-up">
            New User? Register Now <Link to="/registration"><Button className="signin-btn">Sign Up now</Button></Link>
          </h2>
        </div>
      </div>
    </Wrapper>
  );
};
//css part
const Wrapper = styled.section`
  .container {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 0;
    .container-left {
      display: flex;
      justify-content: end;
      padding: 1.3rem 0;
      padding-left: 12rem;
      img {
        width: 450px;
        height: 350px;
        object-fit: cover;
      }
    }
    .container-right {
      background-color: ${({ theme }) => theme.colors.bg};
      width: 40%;
      border: 2px translucent;
      border-radius: 0.7rem;
      padding-top: 0.5rem;
      padding-bottom: 2rem;
      h3 {
        padding: 1rem 6rem;
        font-weight: 700;
        font-size: 2rem;
      }
      .input-block {
        label {
          padding: 0 2.2rem;
          font-size: 1.3rem;
        }
        input {
          text-transform: none;
          margin: 0 1.5rem;
          margin-top: 0.2rem;
          margin-bottom: 1rem;
          border-radius: 0.7rem;
          width: 87%;
        }
        .pwdicon{
          &:hover{
            cursor:pointer;
          }
        }
      }
      .btn{
        display:flex;
        justify-content:center;
        .input-btn{
            font-size:1.3rem;
            padding:.3rem 1.2rem;
            margin:.4rem 0;
        }
      }
      h2{
        padding-top:1rem;
        padding-bottom:.5rem;
        font-size:1.4rem;
        font-weight:500;
        .signin-btn{
            font-size:1.1rem;
        }
      }
    }
    }
  }
`;
export default Login;
