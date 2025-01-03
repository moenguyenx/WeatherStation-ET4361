"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import {
	MDBContainer,
	MDBRow,
  } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import LineChart from "@/components/chart";
import axios from "axios";

export default function Chart() {
  const [tempData, setTempData] = useState(null);
  const [pm25Data, setPM25Data] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get("http://127.0.0.1:5000/latest10temp");
        const response2 = await axios.get("http://127.0.0.1:5000/latest10pm25");
        console.log(response1.data); // Logs API response
        setTempData(response1.data);
        setPM25Data(response2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function here
    console.log('bug here');
    console.log(tempData);
  }, []); // Empty dependency array to run only once on component mount

  return (
      <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
        <Navbar></Navbar>
        <MDBContainer className="h-700 mt-3">
          <MDBRow className="justify-content-center align-items-center h-100">
          {tempData && <LineChart data={tempData} chartName="Temperature" />}
          {pm25Data && <LineChart data={pm25Data} chartName="PM2.5 Levels" />}
          </MDBRow>
        </MDBContainer>
      </section>
  );
}
