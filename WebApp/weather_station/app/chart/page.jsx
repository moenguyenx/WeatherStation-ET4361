"use client"
import React from "react";
import Navbar from "@/components/navbar";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Chart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Line Chart',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Set legend text color to white
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Set x-axis text color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Light white grid color
        },
      },
      y: {
        ticks: {
          color: 'white', // Set y-axis text color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Light white grid color
        },
      },
    },
  };
  return (
      <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
        <Navbar></Navbar>
        <div style={{ width: '700px', height: '700px', color: 'white', margin: 'auto', textAlign: 'center' }}>
          <h1>Example 1: Line Chart</h1>
          <Line data={data} options={options}/>
        </div>
      </section>
  );
}
