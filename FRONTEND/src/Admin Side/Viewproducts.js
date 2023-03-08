import React from "react";
import styled from "styled-components";
import Navigatesection from "./Navigatesection";
import { usePagination, useTable } from "react-table";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const Viewproducts = () => {
  const [products, setproducts] = useState([]);
  /*whenver the page is loaded we must fetch all the products from our products table so call the func inside useEffect and for
  displaying records we are using react-table component */
  useEffect(() => {
    getproducts();
  }, []);
  const getproducts = async () => {
    const res = await axios.get("http://localhost:5000/getproducts");
    setproducts(res.data);
  };

  const deleteproduct=async(id)=>{
      //we are using sweet alert
     swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    //now once user clicks the button then we will call a will delete function
    .then(async (willDelete) => {//make this async bcoz axios is asynchronous
      if (willDelete) {
          await axios.delete(`http://localhost:5000/deleteproduct/${id}`)
          //after sending delete request then again we need to fetch products from database so that's y call getproducts
          getproducts();  
          swal("Poof! Product removed Successfully!", {
          icon: "success",
        });
      } 
      else {
        swal("Product is not deleted!");
      }
    });
}
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
        Header: "Item Name",
        accessor: "product_sname",
      },
      {
        Header: "Category",
        accessor: "product_category",
      },
      {
        Header: "Brand",
        accessor: "product_brand",
      },
      {
        Header: "Price",
        accessor: "product_price",
      },
      {
        Header: "Actions",
        Cell: (tableprops) => (
          <div>
            <Link to={`/editproduct/${tableprops.row.original.product_id}`}>
              <BiEdit
                size={"1.5rem"}
                style={{ cursor: "pointer", color: "green" }}
              />
            </Link>
            <RiDeleteBin5Line onClick={()=>deleteproduct(tableprops.row.original.product_id)}
              size={"1.5rem"}
              style={{ cursor: "pointer", color: "red" }}
            />
          </div>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable({ columns, data: products }, usePagination);
  state.pageSize = 5;
  const { pageIndex } = state;
  // console.log(state);
  return (
    <Wrapper>
      <div className="container">
        <Navigatesection section={"view products"} />
        <div className="box2">
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
              {page.map((row) => {
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
          <div className="pagination">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} Of {pageOptions.length + 1}
              </strong>
            </span>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    padding: 1.2rem;
    display: grid;
    grid-template-columns: 0.25fr 1fr;
    .box2 {
      table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      table td,
      table th {
        border: 1px solid #ddd;
        padding: 2px;
        text-align: center;
      }

      // table tr:nth-child(even){background-color: #f2f2f2;}

      // table tr:hover {background-color: #ddd;}

      table th {
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        text-align: center;
        background-color: #04aa6d;
        color: white;
      }
      .pagination {
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        gap: 0.4rem;
      }
    }
  }
`;
export default Viewproducts;
