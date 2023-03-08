/*this will display order status chart in admin dashboard */
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as Chartjs, LinearScale, CategoryScale, BarElement ,Title, Tooltip, Legend} from 'chart.js'
Chartjs.register(
    LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend
)
const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Order Status Chart',
      },
    },
  };
const Orderschart = () => {
    const [data ,setdata]=useState({
        labels:["Orders"],
        datasets:[
            {
                label:"Order Placed",
                data:[],
                backgroundColor:'red',
            },
            {
                label:"Processing",
                data:[],
                backgroundColor:'brown',
            },
            {
                label:"Shipped",
                data:[],
                backgroundColor:'grey',
            },
            {
                label:"Delivered",
                data:[],
                backgroundColor:'green',
            }
        ]
    })
    useEffect(()=>{
        getorderstatus();
    },[])
    const getorderstatus=async()=>{
        const res=await axios.get("http://localhost:5000/getorderstatus")
        // console.log(res.data);
        let op=0,pro=0,ship=0,del=0;
        for(let i=0;i<res.data.length;i++)
        {
            if(res.data[i].order_status === "Order Placed...")
             op++;
            else if(res.data[i].order_status === "Processing...")
             pro++;
            else if(res.data[i].order_status === "Shipped")
             ship++;
            else
             del++;
        }
        setdata({
            labels:["Orders"],
            datasets:[
                {
                    label:'Order Placed',
                    data:[op],
                    backgroundColor:'red',
                },
                {
                    label:'Processing',
                    data:[pro],
                    backgroundColor:'brown',
                },
                {
                    label:'Shipped',
                    data:[ship],
                    backgroundColor:'grey',
                },
                {
                    label:'Delivered',
                    data:[del],
                    backgroundColor:'green',
                }
            ]
        })
    }
  return (
    <div style={{width:'80%', height:'85%', margin:"3.2rem 5rem"}}>
        <Bar data={data} options={options}/>
    </div>
  )
}
export default Orderschart