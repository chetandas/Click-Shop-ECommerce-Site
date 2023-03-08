import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home page/Home";
import Products from "./pages/products page/Products";
import About from "./pages/about page/About";
import Contact from "./pages/contact page/Contact";
import Header from "./common/Header";
import { ThemeProvider } from "styled-components"; //we are using this bcoz all the css is present in this
//and we are delcaring it in app.js bcoz we want all the components and pages to have the access of css
import { Globalstyle } from "./Globalstyle";
import Footer from "./common/Footer";
import Registration from "./pages/registration page/Registration";
import Login from "./pages/login page/Login";
import { useEffect, useState } from "react";
import ScrollToTop from "./ScrollToTop";//this will scroll to top after routing to other page
import Singleproduct from "./pages/products page/Singleproduct";
import Cart from "./pages/cart page/Cart";
import axios from "axios";
import Success from "./Success";
import Orders from "./Orders";
import Adminhome from "./Admin Side/Adminhome";
import Viewproducts from "./Admin Side/Viewproducts";
import Vieworders from "./Admin Side/Vieworders";
import Orderstatus from "./Admin Side/Orderstatus";
import Addproduct from "./Admin Side/Addproduct";
import Editproduct from "./Admin Side/Editproduct";

//this func will fetch the cart items from local storage
const getlocalcartdata=()=>{
  const list=localStorage.getItem("Mycart")
  if(list)
  {
    return JSON.parse(list)
  }
  else
  {
    return []
  }
}

function App() {
  const [cartproducts, setcartproducts]=useState(getlocalcartdata());//get the cart items from the localstorage
  /*this is to know whether the user that has logged in admin or not coz if admin has logged in then we need to display admin on
  button on header so that when he clicks on it he will be redirected to admin page frm where he can manage the website */
  const[ isadmin, setadmin]=useState(false);
  //this is for knowing whether the user has logged in or not
  const [isuserloggedin, setuserlogin]=useState(false)//initially the user is not loggeed in so set the login state to false
  const [userdetails, setuserdetails]=useState({//this is for displaying user name and his details so that after logging in
    //we can fetch all his orders and other stuff using his details from database
    id:0,
    name:"",
    email:"",
    phone:"",
    password:"",
  })
  const userlogin=()=>{
    setuserlogin(!isuserloggedin)
  }
  const setuser=(data)=>{
    setuserdetails({id:data.id, name:data.name, email:data.email, phone:data.email, password:data.password});
    // console.log(userdetails.id+" "+userdetails.name+" "+userdetails.email+" "+userdetails.phone+" "+userdetails.password);
  }


  /*this func will add product to cart... while adding we must check whether the product is present in the cart or not
  if present increase its quantity if not add the product and set its quantity as 1*/
  const addproduct=(product)=>{
    const indx=cartproducts.findIndex(function(item){
      return item.product_id === product.product_id
    })
    if(indx === -1)
    {
      console.log("product not found");
      const item={
        product_id: product.product_id,
        product_sname:product.product_sname,
        product_name:product.product_name,
        product_category:product.product_category,
        product_brand:product.product_brand,
        product_desc:product.product_desc,
        product_price:product.product_price,
        product_img:product.product_img,
        product_quantity:1,
        product_subtotal:product.product_price,
      }
      setcartproducts([...cartproducts, item])
    } 
    else
    {
      console.log("product found");
      for(let i=0;i<cartproducts.length;i++)
      {
        if(cartproducts[i].product_id === product.product_id)
        {
           cartproducts[i].product_quantity=cartproducts[i].product_quantity+1;
           cartproducts[i].product_subtotal=cartproducts[i].product_quantity * cartproducts[i].product_price;
           break;
        }
      }
    }
    // console.log("no of items in cart=", cartproducts.length +" they are-")
    // console.log(cartproducts);
  }

  /*store the cart items in localstorage bcoz we dont want to loose the products from the cart bcoz assume the user cancels the 
  payment now when payment is initiated the page is reloaded i.e application is restarted and the data is lost so to avoid that
  we store the cart items in localstorage and we will add dependency as cart items bcox whenver any product is added we will
  add that to local storage also */
  useEffect(()=>{
    localStorage.setItem("Mycart", JSON.stringify(cartproducts));
  },[cartproducts])


  //now to start a session and store session variable we must enable dis
  axios.defaults.withCredentials=true;
  

  /*this is for checking session is started or not we place it inside useEffect bcoz whnever the page is reloaded we dont want user to
  be logged out so place it inisde useeffect so whenver page loads it will be called*/
  useEffect(()=>{
    axios.get("http://localhost:5000/check").then((res)=>{
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
        if(res.data.user[0].admin === 1)
         setadmin(true);
      }
    })
  },[])

  const theme={
    //all colors that we use in our website are defined here
    colors:{
      heading:"rgb(24 24 29)",
      text:"rgb(24 24 29)",
      white:"#fff",
      red:"#FF0000",
      blue:"#0000FF",
      black:"#212529",
      helper:"#8490ff",
      bg:"rgb(249 249 255)",
      footer_bg:"#0a1435",
      btn:"rgb(98 84 243)",
      border:"rgba(98, 84, 243, 0.5)",
      hr:"#ffffff",
      gradident:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
      "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0xp 0px 1px;",
      shadowSupport:"rgba(0, 0, 0, 0.16) 0xp 1px 4px",
    },
    media:{
      mobile:"768px",
      tab:"998px"
    },
  };
  return (
    <div className="app">
      <ThemeProvider theme={theme}>{/* we are sending theme props that is data to all pages now inside theme we define all our 
      custom css and then by using props we can access dat css data in all pages*/}
        <Globalstyle/>
        <Router>
          <ScrollToTop/>
          {/*in header we are sending the login status bcoz when user icon is clicked we need to display sign and sign up
          if user is not logged in. If the user logs in the we need to change the login status and display my account,my cart
          and logout options to him... so for this purpose we are sending the usestate of login to header*/}
          <Header isuserloggedin={isuserloggedin} userlogin={userlogin} userdetails={userdetails}
           isadmin={isadmin} setcartproducts={setcartproducts}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/*send addproduct func to product page bcoz if we click on add to cart it must be added to cartitems array*/}
            <Route exact path="/products" element={<Products addproduct={addproduct}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/registration" element={<Registration/>} />
            {/*when user logs in we need to change the login status and set user details so thats why we are sending
            userlogin fuction which will toggle the state of login and setuser will set all the details of the user  */}
            <Route exact path="/login"  element={<Login userlogin={userlogin} setuser={setuser} setadmin={setadmin}/>}/>
            {/*also send addproduct to single product page and also send setcartproducts and cartproducts array too
            bcoz we have quantity increasing and decreasing functionality too so if user decreases it entirely it must be removed
            so for managing all such thing send array and funcs*/}
            <Route exact path="/singleproduct/:id" element={<Singleproduct addproduct={addproduct} 
             cartproducts={cartproducts} setcartproducts={setcartproducts} />}/>
            {/*now inside cart page we will display all the items in the cart and we also provide remove option to remove any item from
            the cart so we need to manage the array so send the state to cartpage */}
            <Route exact path="/cart" element={<Cart cartproducts={cartproducts} 
             setcartproducts={setcartproducts}/>}/> 
             {/*inside success page we insert the orders placed into the database for that we need to know what were the item
             present in the cart and also the userdetails so send those to success page*/}
            <Route exact path="/success" element={<Success setcartproducts={setcartproducts} userdetails={userdetails}
              cartproducts={cartproducts} setuserlogin={setuserlogin} setuser={setuser}/>}/>
            {/* in orders page we need to display all the orders placed by the user and also we will empty the cart bcoz orders
            got placed and we dont need them anymore*/}
            <Route exact path="/orders" element={<Orders setcartproducts={setcartproducts} userdetails={userdetails}
             setuserlogin={setuserlogin} setuser={setuser}/>}/>
             {/*below are the admin side routes */}
            <Route exact path="/admindashboard" element={<Adminhome/>}/>  
            <Route exact path="/viewproducts" element={<Viewproducts/>}/>
            <Route exact path="/vieworders" element={<Vieworders/>}/>
            <Route exact path="/orderstatus/:id" element={<Orderstatus/>}/>
            <Route exact path="/addproduct" element={<Addproduct/>}/>
            <Route exact path="/editproduct/:id" element={<Editproduct/>}/>
          </Routes>
          <Footer/>
        </Router>
      </ThemeProvider>
    </div>
  );
}
export default App;