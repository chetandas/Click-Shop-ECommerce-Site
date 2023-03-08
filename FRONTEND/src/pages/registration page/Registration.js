import React, { useState } from "react";
import axios from "axios"; //axios for making http request to backend
import swal from "sweetalert"; //this is for sweet alert
import styled from "styled-components";
import { Button } from "../../styles/Button";
//these icons are used for hiding and showing password
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
//now to validate and handle the form we will be using yup and formik
//formik is used to handle the form i.e store the values and handle the events
//yup is used for validation i.e whether the fields are valid or not or entered or not as such

//now to handle we need formik so inbuilt we have a hook called useformik which is used fr form handling
import { useFormik } from "formik";
import { regSchema } from "../../Validation";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Registration = () => {
  const [showpwd, setshowpwd] = useState(false);//this is to store the state of the toggling the pwd
  const [showcpwd, setshowcpwd] = useState(false);//this is for confirm pwd
  const togglepwd=()=>{
    setshowpwd(!showpwd);
  }
  const togglecpwd=()=>{
    setshowcpwd(!showcpwd);
  }
  let navigate = useNavigate(); // for redirecting to other page we use usenavigate
  const submitdata = async (data) => {
    // console.log("submitdata fucntion called");
    // console.log(data.name+" "+data.email+" "+data.phone+" "+data.password);
    const user = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    /*before adding the user details first check whether the credentials are unique or not i.e whether the entered 
    email is not present and username is not present etc...*/
    const result = await axios.get("http://localhost:5000/getusers");
    //now to display error using sweet alert we need title and text so declare two variables errortitle and errormsg and initally
    //there are no errors so they are empty
    let errortitle = "";
    let errormsg = "";
    if (result.status === 200) {
      //i.e if result status is successfull it means we retrieved the data successfully
      for (let i = 0;i < result.data.length;i++) //iterate through the data retrieved and check for conditions 
      {
        if (result.data[i].name === user.name) {
          //if the username already exists then indicate error
          errortitle = "Username Already Exists";
          errormsg = "Please enter another username";
          break;
        }
        if (result.data[i].email === user.email) {
          //if the email already exists then indicate error
          errortitle = "Email is Already in use";
          errormsg = "Please use another email address";
          break;
        }
        if (result.data[i].phone === user.phone) {
          //if the phone no already exists then indicate error
          errortitle = "Phone Number entered is Already in use";
          errormsg = "Please enter another phone number";
          break;
        }
      }
      if (errormsg && errortitle) {
        //now after itreating through the retrieved data then check are there any errors or not if found
        //then call swal
        swal({
          title: errortitle,
          text: errormsg,
          icon: "info",
          button: "Click to continue",
        });
      } //if no errors and the user's credentials are unique then it means he is a new user then make a adduser call and add to db
      else {
        //set all the fields name,email,phone,password to send the values to backend
        //now make a post req using axios to backend to insert the data
        axios
          .post("http://localhost:5000/adduser", {
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
          })
          .then((response) => {
            //if request is successfull then it returns a promise so call swal informing
            //the user that registration was done
            swal({
              title: "Registered Successfully!!",
              text: "Now please login to your account to continue",
              icon: "success",
              button: "Click here to Continue",
            });
            console.log(response.data);
            navigate("/login"); //and after registration is done redirect him to login page to login into his account
          })
          .catch((error) => {
            //if by any chance the request to registration fails then alert the user saying registration failed using swal
            console.log(error.response);
            console.log("registration failed");
            swal({
              title: "Registration Failed",
              text: "Something went wrong please try again",
              icon: "error",
              button: "Click here to register again",
            });
          });
      }
    }
  };

  //this is handling and validation part
  //this useformik contains different fields lyk events values etc... and our fields values are in formik.values and to access events lyk
  //handleChange which is same as Onchange in react we need to write formik.handleChange
  //so to avoid that we will be importing the required fields from the hook
  const { values, touched, handleChange, handleBlur, errors, handleSubmit } =
    useFormik({
      //initial values of all the fields are null so mention that in initialvalues object
      initialValues: {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
      },
      //now for validation we have validation schema inside useFormik hook so now that schema is ntng but our defined schema
      validationSchema: regSchema,
      onSubmit: (data) => {
        //just to verify we are displaying it in the console
        //console.log(data);//after submitting the form display the data in console
        submitdata(data); //when the user clicks on register then call our own submit func which is submitdata
      },
    });
  return (
    <Wrapper>
      <div className="container">
        <div className="container-left">
          <h3>Sign Up</h3>
          <form onSubmit={handleSubmit}>
            {/* when user clicks register now then formik will handle the form bcoz we use handlesubmit event of formik hook*/}
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <input
                type="name"
                autoComplete="off"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/*display the error only if we touch dat field and dont fill it or if we violate the rules of the field value*/}
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>
              <input
                type="phonenumber"
                autoComplete="off"
                name="phone"
                id="phone"
                placeholder="Enter Your Phone Number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone ? (
                <p className="form-error">{errors.phone}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type={showpwd?"text":"password"}
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="pwdicon" onClick={togglepwd}>{showpwd?<FaEye/>:<FaEyeSlash/>}</span>
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>
            <div className="input-block">
              <label htmlFor="confirm_password" className="input-label">
                Confirm Password
              </label>
              <input
                type={showcpwd?"text":"password"}
                autoComplete="off"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="pwdicon" onClick={togglecpwd}>{showcpwd?<FaEye/>:<FaEyeSlash/>}</span>
              {errors.confirm_password && touched.confirm_password ? (
                <p className="form-error">{errors.confirm_password}</p>
              ) : null}
            </div>
            <div className="btn">
              <Button className="input-btn" type="submit">
                Register
              </Button>
            </div>
          </form>
          <h2 className="sign-up">
            Already have an account?{" "}
            <Link to="/login">
              <Button className="signin-btn">Sign In now</Button>
            </Link>
          </h2>
        </div>
        <div className="container-right">
          <img src="./images/signuppic.jpg" alt="" />
        </div>
      </div>
    </Wrapper>
  );
};

//this is css part
const Wrapper = styled.section`
  .container {
    padding-top: 0.8rem;
    padding-bottom: 5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 8rem;
    justify-content: center;
    .container-left {
      margin-left: 5%;
      background-color: ${({ theme }) => theme.colors.bg};
      width: 40%;
      padding: 1rem 2rem;
      border: 2px translucent;
      border-radius: 0.7rem;
      h3 {
        padding: 20px 12rem;
        font-weight: 600;
        font-size: 2rem;
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
        .pwdicon{
          &:hover{
            cursor:pointer;
          }
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
      h2 {
        padding-top: 1rem;
        padding-bottom: 1.5rem;
        text-align: center;
        .signin-btn {
          font-size: 1.2rem;
        }
      }
    }
    .container-right {
      img {
        padding: 9rem 0rem;
      }
    }
  }
`;
export default Registration;
