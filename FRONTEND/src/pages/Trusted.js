import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    margin:1.6rem;
    background-color:${({ theme }) => theme.colors.bg};
    border-radius:1rem;
    border:2px translucent black;
    h2{
        padding:1.2rem;
        font-weight:400;
    }
    .container{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        grid-column-gap:1rem;
        .box1{
            img{
                width:250px;
                object-fit:cover;
            }
        }
    }
`;
const Trusted = () => {
  return (
    <Wrapper>
      <h2>Trusted By 100+ Capital Ventures</h2>
      <div className="container">
        <div className="box1">
          <img src="/images/cap1.png" alt="cap1" />
        </div>
        <div className="box1">
          <img src="/images/cap2.jpg" alt="cap1" />
        </div>
        <div className="box1">
          <img src="/images/cap3.png" alt="cap1" />
        </div>
        <div className="box1">
          <img src="/images/cap4.jpeg" alt="cap1" />
        </div>
      </div>
    </Wrapper>
  );
};
export default Trusted;