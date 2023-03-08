import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Products = (props) => {
  const {addproduct}=props

  /*all products will store all the products present in database and initially it is an empty array */
  const [allproducts, setallproducts] = useState([]);
  /*currproducts will store the curr category or brand wise products that the user is willing to view and it is also initially
  an empty array */
  const [currproducts, setcurrproducts] = useState([]);
  //will store all the categories available and initially it is also an empty array
  const [category, setcategory] = useState([]);
  //categoryval will store the particular category value the user is trying to view and initially it is set to "All"
  const [categoryval, setcategoryval] = useState("All");
  //pageno will store the currpageno the user is and by default its value is 1
  const [pageno, setpageno] = useState(1);
  //perpage is the no of products we are trying to display in one page and we chose it as 9
  const [perpage] = useState(9);
  //brands array will store all the products brands of currproducts
  const [brands, setbrands]=useState([]);
  //brandval store the brand that the user trying to view
  const [brandval, setbrandval]= useState("None");//initially it is none
  
  //this will store the value on which we need to store the currproducts by default it is set to none
  const [sortvalue, setsortvalue]=useState("None");


  /*when the page initially loads we need to fetch all the products from database bcoz by default the selected category is all
  so we use useeffect so that we fetch all the products only once
  the logic is declare two arrays 1->Allproducts 2->currproducts
  Allproducts stores all the products list initially when the page loads
  currproducts stores the currproducts which the user is willing to view lyk it can be mobile, or based on particular brand as such
  */
  useEffect(() => {
    // console.log("initial load");
    loadallproducts(); //so initially as page loads call this func to fetch all products
  }, []); //and it shld happen nly when once i.e when the page is rendered so use empty array as dependency

  /*now we provide different product categories so the user may lyk view any particular category products so everytime
  the category is changed we need to fetch that particular category products so we need to monitor the category value
  so for that use useeffect and give category value as dependency*/
  useEffect(() => {
    // console.log("filter load");
    //we will be passing that category value selected by the user to the func to fetch products of that category
    getcategoryproducts(categoryval);
  }, [categoryval]); //shld call this func wheneveer the category value changes so add it as dependency

  /*whenever the brandval changes we need to fetch the products of users wish or default all so we need to monitor the value
  of brandval so that's why use useEffect for it
  */
  useEffect(()=>{
    // console.log(brandval)
    //whenver der is a change in value of the brand it means user has selected particular brand so call the below func
    getbrandwiseproducts(brandval);
  },[brandval])

  /*whenver the sortvalues changes then it means we need to show products based on that value so we need to monitor it to display
  so thats why use useeffect and give sortvalue as dependency and whenver it changes we need to sort the products so call the 
  sort products function*/
  useEffect(()=>{
    sortproducts(sortvalue);
  },[sortvalue])


  /*this func will sort according to the users wish i.e by highest price or lowest price
  the cases that arise are 
  1->if ntng is selected then the value is none so we need to fetch products based on current category and brand wise
  so simple call getbrandwise products which will fetch the products
  2->if user selects sort by 'highest price then we need to sort the current products in descending order by price'
  3->similarly fr lowest price sort in ascending order
  and everytime uh sort uh dunno how many products will be der and how many pages so always set pageno to 1
  */
  const sortproducts=(value)=>{
    console.log(value);
    if(value==="None")
    {
        getbrandwiseproducts(brandval);
        setsortvalue("None");
    }
    else
    {
        if(value === "Highest Price")
        {
            const newarr=[...currproducts];
            newarr.sort((a,b)=>(a.product_price < b.product_price) ? 1: -1);
            // console.log(newarr);
            setcurrproducts(newarr);
        }
        else
        {
          const newarr=[...currproducts];
          newarr.sort((a,b)=>(a.product_price > b.product_price) ? 1: -1);
          // console.log(newarr);
          setcurrproducts(newarr);
        }
    }
    setpageno(1);
  }

  /*this func will fetch the products accoring to the selected brand 
  cases are
  1->if no brand is selected then we will fetch products accoring to category selected
  now if the categoryval='All' it means we need to fetch all products 
  else fetch according to the category selected also uh need to set the pageno to 1 bcoz we need to show products
  from start to end

  2->if brand is selected then we need to fetch products according to the selected brand
  here also if category value is all then nly filter according to brand selected
  else filter according to both category and brand wise
  and dont forget to set pageno to 1 
  */
  const getbrandwiseproducts=(brandname)=>{
    if(brandname !== "None")
    {
      if(categoryval === "All")
      {
        const newarr=allproducts.filter((elem)=>{
          return elem.product_brand === brandname
        })
        setcurrproducts(newarr);
      }
      else
      {
        const newarr=allproducts.filter((elem)=>{
          return elem.product_brand===brandname && elem.product_category===categoryval
        })
        console.log(newarr)
        setcurrproducts(newarr)
      }
    }
    else
    {
      if(categoryval !== "All")
      {
        const newarr=allproducts.filter((elem)=>{
          return elem.product_category === categoryval
        })
        setcurrproducts(newarr);
      }
      else
      {
        setcurrproducts(allproducts);
      }
    }
    setpageno(1);
    setsortvalue("None");
  }
  //this below function will fetch all products and also all categories initially from the database
  const loadallproducts = async () => {
    const result = await axios.get("http://localhost:5000/getcategories");
    const res = await axios.get("http://localhost:5000/getproducts");
    const ans=await axios.get("http://localhost:5000/getallbrands");
    setcategory(result.data); //store all the categories of the products available in category array
    setallproducts(res.data); //store all product details in allproducts array
    //initially the default category value is "ALL it means we need to fetch all the products so store the products in currproducts too"
    setcurrproducts(res.data);
    setcategoryval("All");
    setbrands(ans.data);
    setbrandval("None");
    setpageno(1);
  };

  /*this func will fetch products based on the category selected
  if the category value is "ALL then it means we need all the products so no need to fetch again frm database we already have
  all the products in our allproducts array we will be using that nly*/
  const getcategoryproducts = async(name) => {
    if (name === "All") {
      setcurrproducts(allproducts);
      const ans=await axios.get("http://localhost:5000/getallbrands");
      setbrands(ans.data);
    } else {
      const newdata = allproducts.filter((elem) => {
        return elem.product_category === name;
      });
      setcurrproducts(newdata);
      const res=await axios.post("http://localhost:5000/getbrands",{
        category:categoryval
      })
      setbrands(res.data);
    }
    setpageno(1);
    setbrandval("None");
    setsortvalue("None");
  };

  /*this func sets the pageno to selectedpage
  cases are the selected page must lie in between 1 and totalpages available 
  and also if the user clicks on same page no which is equal to currpage no we shld not again fetch the products
  so selectedpage shldnt be equal to currpage
  */ 
  const pangehandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= Math.ceil(currproducts.length / perpage) &&
      pageno !== selectedpage
    ) {
      setpageno(selectedpage);
    }
  };
  const showtoast=()=>{
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
  return (
    <Wrapper>
      <div className="container">
        <div className="left-container">
          <div className="search-filter">
            <form action="">
              <input type="text" placeholder="Search" />
              <FcSearch size="2rem" className="search-icon" />
            </form>
          </div>
          <div className="category-section">
            <h2>Category</h2>
            <p
              className="category"
              value="All"
              name="All"
              style={
                categoryval === "All"
                  ? { "text-decoration": "underline", color: "#8490ff" }
                  : null
              }
              onClick={() => setcategoryval("All")}
            >
              All
            </p>
            {category.map((elem) => {
              return (
                <p
                  key={elem.category_id}
                  className="category"
                  onClick={() => setcategoryval(elem.category_name)}
                  style={
                    categoryval === elem.category_name
                      ? { "text-decoration": "underline", color: "#8490ff" }
                      : null
                  }
                >
                  {elem.category_name}
                </p>
              );
            })}
          </div>
          <div className="brand-section">
            <h2>Brands</h2>
            <select value={brandval} onChange={e=>setbrandval(e.target.value)}>
              <option>None</option>
              {brands.map((elem) => {
                return (
                  <option key={elem.product_brand}>
                    {elem.product_brand}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="clear-filters">
            <Button
              className="filter-btn"
              onClick={() =>{ setcategoryval("All"); setbrandval("None")}}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        <div className="right-container">
          <div className="box1">
            <p style={{ "margin-left": "3.5rem" }}>
              {currproducts.length} Products Found
            </p>
            <div className="sort-section">
              <p>Sort By</p>
              <select name="sortby" id="sortby" value={sortvalue} onChange={e=>setsortvalue(e.target.value)}>
                <option>None</option>
                <option>Highest Price</option>
                <option>Lowest Price</option>
              </select>
            </div>
          </div>
          <div className="box2">
            {currproducts
              .slice(pageno * perpage - perpage, pageno * perpage)
              .map((i) => {
                return (
                  <div className="card" key={i.product_id}>
                    <Link to={`/singleproduct/${i.product_id}`}>
                      <img src={i.product_img} alt={i.product_id} />
                    </Link>
                    <h2 className="title">{i.product_sname}</h2>
                    <h2 className="price">₹{i.product_price}</h2>
                    <Button className="btn" onClick={()=>{addproduct(i) ; showtoast() }}>Add to Cart</Button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/*here we need pages only if we have products greater than perpage bcoz if we have 7products we dont need any
      page they can shown to user in single page only */}
      {currproducts.length > perpage && (
        <div className="pages">
           {/*in next btn if the user is on 1st page then we must make the prev page btn disabled*/}
          <span
            className={pageno > 1 ? "prevbtn" : "disable_btn"}
            onClick={() => pangehandler(pageno - 1)}
          >
            ◀
          </span>
          {[...Array(Math.ceil(currproducts.length / perpage))].map(
            (_, indx) => {
              return (
                <span
                  style={
                    pageno === indx + 1
                      ? { "background-color": "rgb(220,220,200)" }
                      : null
                  }
                  onClick={() => pangehandler(indx + 1)}
                >
                  {indx + 1}
                </span>
              );
            }
          )}
          {/*in next btn if the user reaches the last page then we must make the next page btn disabled*/}
          <span
            className={
              pageno < Math.ceil(currproducts.length / perpage)
                ? "nextbtn"
                : "disable_btn"
            }
            onClick={() => pangehandler(pageno + 1)}
          >
            ▶
          </span>
          <ToastContainer/>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .pages {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    .disable_btn {
      opacity: 0;
      cursor: default;
    }
    .prevbtn {
      color: ${({ theme }) => theme.colors.blue};
    }
    .nextbtn {
      color: ${({ theme }) => theme.colors.blue};
    }
    span {
      padding: 0.5rem;
      margin: 0 0.3rem;
      border: 2px solid gray;
      cursor: pointer;
    }
  }
  .container {
    padding: 4rem 0rem;
    display: grid;
    grid-template-columns: 0.25fr 1fr;
  }
  .left-container {
    padding: 0.3rem 1.8rem;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 3.5rem;
    .search-filter {
      form {
        margin-left: 1.4rem;
      }
      input {
        text-align: center;
        border-radius: 0.5rem;
        width: 85%;
      }
      .search-icon {
        padding-top: 0.7rem;
      }
    }
    .category-section {
      h2 {
        font-weight: 400;
      }
      p {
        text-align: center;
      }
      .category {
        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
          cursor: pointer;
        }
      }
    }
    .brand-section {
      h2 {
        font-weight: 400;
      }
      select {
        text-align: center;
        margin: 0.4rem;
        height: 50px;
        width: 130px;
      }
    }
    .clear-filters {
      .filter-btn {
        font-size: 1.3rem;
      }
    }
  }
  .right-container {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    .box1 {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 1.6rem;
      }
      .sort-section {
        padding-right: 8%;
        display: flex;
        select {
          text-align: center;
          margin: 0.5rem;
          height: 50px;
          width: 110px;
        }
      }
    }
    .box2 {
      padding: 0.5rem 0.6rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 0.6rem;
      grid-row-gap: 1.6rem;
      grid-auto-rows: minmax(auto, auto);
      .card {
        padding: 0.4rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        align-items: center;
        img {
          width: 250px;
          height: 200px;
          object-fit: scale-down;
          &:hover {
            transform: scale(1.1);
          }
        }
        .btn {
          font-size: 1.1rem;
          margin-top: auto;
        }
      }
    }
  }
`;
export default Products;