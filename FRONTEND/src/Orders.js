import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
const Orders = (props) => {
  const { userdetails } = props;
  const [orders, setorders] = useState([]);

  /*whenever order page is loaded we need to fetch orders placed by the user from databse so we call a func to fetch orders and we
  place is inside useEffect */
  useEffect(() => {
    getorders();
  }, []);

  /*this will fetch orders placed by the user*/
  const getorders = async () => {
    const res = await axios.post("http://localhost:5000/getorders", {
      user_id: userdetails.id,
    });
    console.log(res.data);
    setorders(res.data);
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
        Header: "Item Name",
        accessor: "product_sname",
      },
      {
        Header: "Price in ₹",
        accessor: "product_price",
      },
      {
        Header: "Quantity",
        accessor: "order_quantity",
      },
      {
        Header: "Amount",
        accessor: "order_amount",
      },
      {
        Header: "Ordered Date",
        accessor: "order_datetime",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
        Cell: (tableprops) => (
          <div
            style={
              tableprops.row.original.order_status !== "Delivered"
                ? { color: "red", cursor: "pointer" }
                : { color: "green", cursor: "pointer" }
            }
          >
            {tableprops.row.original.order_status}
          </div>
        ),
      },
    ],
    []
  );
  // const columns = [
  //   {
  //     name: "Item",
  //     selector: (row) => (
  //       <img
  //         style={{
  //           width: "110px",
  //           height: "130px",
  //           "object-fit": "scale-down",
  //         }}
  //         src={row.product_img}
  //         alt={row.product_id}
  //       />
  //     ),
  //   },
  //   // {
  //   //   name:"Item Name",
  //   //   selector:(row) => <p style={{color:"black","font-size":"1.2rem",padding:"0",margin:"0","overflow":"hidden"}}>{row.product_sname}</p>
  //   // },
  //   {
  //     name: "Price",
  //     selector: (row) => (
  //       <p
  //         style={{
  //           color: "black",
  //           "font-size": "1.2rem",
  //           padding: "0",
  //           margin: "0",
  //         }}
  //       >
  //         ₹{row.product_price}
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "Quantity",
  //     selector: (row) => (
  //       <p
  //         style={{
  //           color: "black",
  //           "font-size": "1.2rem",
  //           padding: "0",
  //           margin: "0",
  //         }}
  //       >
  //         {row.order_quantity}
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "Order Amount",
  //     selector: (row) => (
  //       <p
  //         style={{
  //           color: "black",
  //           "font-size": "1.2rem",
  //           padding: "0",
  //           margin: "0",
  //         }}
  //       >
  //         ₹{row.order_amount}
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "Ordered Date and Time",
  //     selector: (row) => (
  //       <p
  //         style={{
  //           color: "black",
  //           "font-size": ".85rem",
  //           "padding-right": ".5rem",
  //           margin: "0",
  //         }}
  //       >
  //         {row.order_datetime}
  //       </p>
  //     ),
  //   },
  //   {
  //     name: "Order Status",
  //     selector: (row) => (
  //       <p
  //         style={
  //           row.order_status === "Order Placed..."
  //             ? {
  //                 color: "red",
  //                 "font-size": "1.2rem",
  //                 "padding-bottom": ".35rem",
  //                 margin: "0",
  //               }
  //             : {
  //                 color: "Green",
  //                 "font-size": "1.2rem",
  //                 "padding-bottom": ".35rem",
  //                 margin: "0",
  //               }
  //         }
  //       >
  //         {row.order_status}
  //       </p>
  //     ),
  //   },
  // ];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: orders });
  return (
    <Wrapper>
      {orders.length > 0 ? (
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
      ) : (
        <h2>No Orders</h2>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 1.5rem;
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
`;
export default Orders;
