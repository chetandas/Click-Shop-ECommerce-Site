import React from "react";
import styled from "styled-components";
import Navigatesection from "./Navigatesection";
import { usePagination, useTable } from "react-table";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";
const Vieworders = () => {
  const [orders, setorders] = useState([]);
  /*whenver the page is loaded we must fetch all the products from our products table so call the func inside useEffect and for
  displaying records we are using react-table component */
  useEffect(() => {
    getorders();
  }, []);
  const getorders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setorders(res.data);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "order_id",
      },
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
        Header: "Price",
        accessor: "product_price",
      },
      {
        Header: "Order Date",
        accessor: "order_datetime",
      },
      {
        Header: "Quantity",
        accessor: "order_quantity",
      },
      {
        Header: "Total Amount",
        accessor: "order_amount",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        Cell: (tableprops) => (
          /*whenver user clicks on the orders status we must redirect him to orderstatus page so that he can change the order status
          of it */
          <Link to={`/orderstatus/${tableprops.row.original.order_id}`}>
            <div
              style={
                tableprops.row.original.order_status !== "Delivered"
                  ? { color: "red", cursor: "pointer" }
                  : { color: "green", cursor: "pointer" }
              }
            >
              {tableprops.row.original.order_status}
            </div>
          </Link>
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
  } = useTable({ columns, data: orders }, usePagination);
  state.pageSize = 5;
  const { pageIndex } = state;
  // console.log(state)
  return (
    <Wrapper>
      <div className="container">
        <Navigatesection section={"view orders"} />
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
          {orders.length > 5 && (
            <div className="pagination">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} Of {pageOptions.length}
                </strong>
              </span>
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </Button>
              <Button onClick={() => nextPage()} disabled={!canNextPage}>
                Next
              </Button>
            </div>
          )}
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
export default Vieworders;
