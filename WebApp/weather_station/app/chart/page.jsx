"use client"
import React from "react";
import Navbar from "@/components/navbar";
import {
	MDBContainer,
	MDBRow,
  } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import LineChart from "@/components/chart";

export default function Chart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: 'HD',
        data: [38, 37, 35, 34, 32, 21, 20]
      },
      {
        label: 'LB',
        data: [37, 36, 34, 36, 33, 20, 19]
      },
      {
        label: 'HBT',
        data: [36, 35, 36, 35, 32, 21, 19]
      },
    ],
  };
  return (
      <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
        <Navbar></Navbar>
        <MDBContainer className="h-700 mt-3">
          <MDBRow className="justify-content-center align-items-center h-100">
            <LineChart data={data} chartName="Temp"></LineChart>
            <LineChart data={data} chartName="Humid"></LineChart>
          </MDBRow>
        </MDBContainer>
      </section>
  );
}
