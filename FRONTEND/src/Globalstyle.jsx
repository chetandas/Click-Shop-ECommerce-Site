//to use the theme providers i.e css we need to create a .js file and import the globalstyle from styled components and then we can
//simply use it lyk a js moduke
import { createGlobalStyle } from "styled-components";
export const Globalstyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Work Sans', sans-serif;
}
html{
    font-size:62.5%
    overflow-x:hidden;
}
h1{
    color:${({ theme }) => theme.colors.heading};
    font-size:3rem;
    font-weight:900;
}
h2{
    color:${({ theme }) => theme.colors.heading};
    font-size:1.6rem;
    font-weight:300;
    white-space:normal;
    text-align:center;
}
h3{
    font-size:1.8rem;
    font-weight:400;
}
p{
    color:${({ theme }) => theme.colors.text};
    opacity:.7;
    font-size:1.4rem;
    line-height:1.5;
    margin-top:1rem;
    font-weight:400;
}
a{
    text-decoration:none;
}
li{
    list-style:none;
}
.container{
    max-width:120rem;
    margin:0 auto;
}
.grid{
    display:grid;
    gap:4rem;
}
.grid-two-column{
    grid-template-columns:repeat(2, 1fr);
}
.grid-three-column{
    grid-template-columns:repeat(3, 1fr);
}
.grid-four-columns{
    grid-template-columns:1fr 1.2fr .5fr .8fr;
}
.common-heading {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 4rem;
    text-transform: capitalize;
  }
  input, textarea{
  max-width: 50rem;
  color: ${({ theme }) => theme.colors.black};
  padding: 1.6rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
 box-shadow: ${({ theme }) => theme.colors.shadowSupport};
}

  input[type="submit"]{
  max-width: 16rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.btn};
  color: ${({ theme }) => theme.colors.white};
  padding: 1.4rem 2.2rem;
  border-style: solid;
  border-width: .1rem;
  text-transform: uppercase;
  font-size: 1.8rem;
  cursor: pointer;
  }
/* ===========================================
/* media queries  
======================================= */
/* px  */
/* rem  */
/* em  */
/* 1500px */
//998px
@media (max-width:${({ theme }) => theme.media.tab}) {
    .container{
      padding: 0 3.2rem;
    }
      .grid-three-column {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width:${({ theme }) => theme.media.mobile}) {
    html{
      font-size: 50%;
    }
    .grid{
      gap: 3.2rem;
    }
    .grid-two-column, .grid-three-column, .grid-four-column{
      grid-template-columns: 1fr;
    }
}
`;