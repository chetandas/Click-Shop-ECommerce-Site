//this file will display the categories section in our home page
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
const Wrapper = styled.section`
  h2 {
    font-size: 2.6rem;
    font-weight: 500;
  }
  .container {
    // background-color: ${({ theme }) => theme.colors.bg};
    padding: 1.5rem 4rem;
    display: grid;
    grid-template-columns: repeat(5, 260px);
    grid-column-gap: 1rem;
    .box1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 250px;
        object-fit: cover;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
`;

const Categories = () => {
  const [data, setdata] = useState([]);//this will store the fetched data from database
  useEffect(() => {
    getdata();//we use useeffect to monitor changes so everytime the page loads call the func to get the data
  }, []);

  //this func will fetch all the categories available from database
  const getdata = async () => {
    const result = await axios.get("http://localhost:5000/categories");//makes a req to backend to fetch the data
    setdata(result.data);//after successfully fetching store in the array delcared
  };
  return (
    <Wrapper>
      <h2>Our Categories</h2>
      <div className="container">
        {data.map((currelem) => {
          return (
            <div className="box1" key={currelem.category_id}>
              {/* <Link to="/about"> */}
                <img src={currelem.imagesrc} alt={currelem.category_name} />
              {/* </Link> */}
              <p>{currelem.category_name}</p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default Categories;
