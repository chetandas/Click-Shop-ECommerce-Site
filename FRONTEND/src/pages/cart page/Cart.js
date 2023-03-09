import React from "react";
import styled from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useTable } from "react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../../styles/Button";
import axios from "axios";
// import { Link } from "react-router-dom";
const Cart = (props) => {
  const { cartproducts, setcartproducts } = props;
  const [subtotal, setsubtotal] = useState(0);

  const handlecheckout = () => {
    axios
      .post("http://localhost:5000/create-checkout-session", {
        cartitems: cartproducts,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      });
  };
  useEffect(() => {
    let ans = 0;
    for (let i = 0; i < cartproducts.length; i++) {
      ans =
        ans + cartproducts[i].product_price * cartproducts[i].product_quantity;
    }
    setsubtotal(ans);
  }, []);
  const delproduct = (id) => {
    const newarr = cartproducts.filter((item) => {
      return item.product_id !== id;
    });
    setcartproducts(newarr);
    toast.info("Item Removed From The Cart", {
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
  const decrease = (id) => {
    for (let i = 0; i < cartproducts.length; i++) {
      if (cartproducts[i].product_id === id) {
        if (cartproducts[i].product_quantity === 1) {
          delproduct(id);
          break;
        } else {
          cartproducts[i].product_quantity =
            cartproducts[i].product_quantity - 1;
          cartproducts[i].product_subtotal=cartproducts[i].product_subtotal-cartproducts[i].product_price;
          const newarr = [...cartproducts];
          setcartproducts(newarr);
          toast.info("Item Quantity Decreased", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          break;
        }
      }
    }
  };
  const increase = (id) => {
    for (let i = 0; i < cartproducts.length; i++) {
      if (cartproducts[i].product_id === id) {
        cartproducts[i].product_quantity = cartproducts[i].product_quantity + 1;
        cartproducts[i].product_subtotal=cartproducts[i].product_subtotal + cartproducts[i].product_price;
        break;
      }
    }
    const newarr = [...cartproducts];
    setcartproducts(newarr);
    toast.info("Item Quantity Increased", {
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
  const columns = React.useMemo(
    () => [
      {
        Header: "Item",
        accessor: "product_id",
        Cell: (tableprops) => (
          <img
            src={tableprops.row.original.product_img}
            alt={tableprops.row.original.product_id}
            style={{
              width: "200px",
              height: "130px",
              "object-fit": "scale-down",
            }}
          />
        ),
      },
      {
        Header:"Item Name",
        accessor:"product_sname"
      },
      {
        Header: "Price in ₹",
        accessor: "product_price",
      },
      {
        Header: "Quantity",
        accessor: "product_quantiy",
        Cell: (tableprops) => (
          <div>
            <AiOutlineMinus
              size={"1.5rem"}
              style={{ "padding-top": ".9rem", cursor: "pointer" }}
              onClick={() => {
                decrease(tableprops.row.original.product_id);
                setsubtotal(subtotal - tableprops.row.original.product_price);
              }}
            />
            {tableprops.row.original.product_quantity}
            <AiOutlinePlus
              size={"1.5rem"}
              style={{ "padding-top": ".9rem", cursor: "pointer" }}
              onClick={() => {
                increase(tableprops.row.original.product_id);
                setsubtotal(subtotal + tableprops.row.original.product_price);
              }}
            />
          </div>
        ),
      },
      {
        Header: "Sub-Total in ₹",
        accessor: "product_subtotal",
      },
      {
        Header: "Remove",
        Cell: (tableprops) => (
          <div>
            <RiDeleteBin5Line
              size={"1.5rem"}
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                delproduct(tableprops.row.original.product_id);
                setsubtotal(
                  subtotal - tableprops.row.original.product_price * tableprops.row.original.product_quantity
                );
              }}
            />
          </div>
        ),
      },
    ],
    [subtotal]
  );
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow }=useTable({columns,data:cartproducts});
  return (
    <Wrapper>
      {cartproducts.length > 0 ? (
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      ):<h2>Cart is Empty</h2>}
      {cartproducts.length > 0 && (
        <div className="checkout">
          <div className="checkout-data">
            <p>Cart items:{cartproducts.length}</p>
            <div className="bill">
              <h3>Total Bill:</h3>
              <h3>{subtotal}</h3>
            </div>
            <Button className="btn" onClick={() => handlecheckout()}>
              Check Out
            </Button>
          </div>
        </div>
      )}
      <ToastContainer />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 2rem;
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  table td, table th {
    border: 1px solid #ddd;
    padding: 2px;
    text-align:center;
  }
  
  // table tr:nth-child(even){background-color: #f2f2f2;}
  
  // table tr:hover {background-color: #ddd;}
  
  table th {
    padding-top: .4rem;
    padding-bottom: .4rem;
    text-align: center;
    background-color: #04AA6D;
    color: white;
  }
  .checkout {
    padding: 2rem;
    display: flex;
    justify-content: end;
    padding-right: 5.5rem;
    .checkout-data {
      padding: 1.2rem 1.2rem;
      background-color: ${({ theme }) => theme.colors.white};
      border: 2px solid black;
      border-radius: 0.5rem;
      p {
        text-align: center;
      }
      .bill {
        display: flex;
        justify-content: space-around;
        gap: 0.1rem;
      }
      .btn {
        font-size: 1rem;
        max-width: 9rem;
        margin: 1rem;
        margin-left: 2.2rem;
      }
    }
  }
`;
export default Cart;
