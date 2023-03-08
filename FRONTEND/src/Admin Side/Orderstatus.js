import React from "react";
import styled from "styled-components";
import Navigatesection from "./Navigatesection";
import { useParams, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "../styles/Button";
import swal from "sweetalert";
const Orderstatus = () => {
  let navigate=useNavigate();
  const { id } = useParams();
  const [orderdata, setorderdata] = useState([]);
  const [orderstatus, setorderstatus]= useState("");
  useEffect(() => {
    getorder();
  }, []);
  const getorder = async () => {
    const res = await axios.get(`http://localhost:5000/updatestatus/${id}`);
    setorderdata(res.data);
  };
  const updatestatus=async()=>{
    const res=await axios.post("http://localhost:5000/updatestatus",{
        order_id:id,
        order_status:orderstatus,
    })
    console.log(res.data);
    //when the status is changed then display a message saying updated successfully
    swal({
      title: "Updated Order Status Successfully",
      icon: "success",
      button: {
        text:"Continue",
        value:"button",
      },
    }).then((value)=>{
      navigate("/vieworders");
    })
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
        Header: "Price",
        accessor: "product_price",
      },
      {
        Header: "Quantity",
        accessor: "order_quantity",
      },
      {
        Header: "Total",
        accessor: "order_amount",
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: orderdata });
  return (
    <Wrapper>
      <div className="container">
        <Navigatesection section={"None"} />
        <div className="box2">
          <h3>Order Id:{id}</h3>
          <h3>Order Amount:{orderdata.length > 0 ?orderdata[0].order_amount:0}</h3>
          <h3>Order Status:{orderdata.length > 0 ?orderdata[0].order_status:"Order Placed..."}</h3>
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
          <div className="status-box">
            <h3>Update Status</h3>
            <select name="status" id="status" onChange={e=>setorderstatus(e.target.value)}>
                <option>Select Status</option>
                <option>Order Placed...</option>
                <option>Processing...</option>
                <option>Shipped</option>
                <option>Delivered</option>
            </select>
            <Button className="btn" onClick={()=>updatestatus()}>Update Status</Button>
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
      padding:1.4rem 1.5rem;
      table {
        // padding:1rem 1rem;
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
      .status-box{
        width:35%;
        margin:1.5rem;
        padding:1rem 1.2rem;
        border:2px solid gray;
        border-radius:.7rem;
        background-color:${({ theme }) => theme.colors.bg};
        h3{
            text-align:center;
        }
        select{
            margin:1.5rem;
            padding:.9rem;
            margin-left:5rem;
        }
        .btn{
            font-size:1.1rem;
            margin-left:4.5rem;
        }
      }
    }
  }
`;
export default Orderstatus;
