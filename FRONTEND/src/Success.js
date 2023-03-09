import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from './styles/Button'
import { useEffect } from 'react'
const Success = (props) => {
  const { setcartproducts, userdetails, cartproducts ,setuserlogin ,setuser} = props;
  let navigate=useNavigate();
  /*we need few things to happen when the page loads so place it inside useEffect */
  useEffect(()=>{
    loaduser();
  },[])

  /* now when payment is completed the page is reloaded and now two req happen 
  1->checking session 2->placing orders in database 
  so now 1st thing already happens but we need dese things to happen in order so we will nly send req to backend to retrieve session
  variables and when we fetch session varaible we will get user details which is need to place order*/
  const loaduser=async()=>{
    const res=await axios.get("http://localhost:5000/check")
      if(res.data.loggedin === true)
      {
        const userdata={
          id:res.data.user[0].user_id,
          name:res.data.user[0].name,
          email:res.data.user[0].email,
          phone:res.data.user[0].phone,
          password:res.data.user[0].password,
        }
        setuserlogin(true);
        setuser(userdata);
      }
  }
  const placeorder=async()=>{
    cartproducts.forEach(item => {
      const res=axios.post("http://localhost:5000/placeorder",{
        user_id:userdetails.id,
        product_id:item.product_id,
        order_quantity:item.product_quantity,
        order_amount:item.product_quantity * item.product_price,
      })
      console.log("placed successfully");
      console.log(res.data)
      setcartproducts([]);
      navigate("/")
    })
  }
  return (
    <Wrapper>
      <img src="/images/success.jpg" alt="success" />
      {/* <Link to="/"> */}
       <Button className='btn' onClick={()=>placeorder()}>Back To Home Page</Button>
      {/* </Link> */}
    </Wrapper>
  )
}
const Wrapper=styled.section`
  padding:2rem;
  display:flex;
  flex-direction:column;
  gap:.3rem;
  align-items:center;
  img{
    width:500px;
    height:400px;
    object-fit:scale-down:
  }
  .btn{
    font-size:1.1rem;
  }
`;
export default Success
