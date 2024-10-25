"use client"
import React from "react";
import WeatherWidget from "@/components/widget";
import Navbar from "@/components/navbar";
import {
	MDBContainer,
	MDBRow,
  } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Home() {
	const weatherData = [
		{
		  location: "Long Bien",
		  temp: 13,
		  humid: 84,
		  time: "15:07",
		  raining: 1
		},
		{
		  location: "Hai Ba Trung",
		  temp: 18,
		  humid: 70,
		  time: "12:30",
		  raining: 0
		},
		{
			location: "Ha Dong",
			temp: 18,
			humid: 70,
			time: "12:30",
			raining: 0
		}
	  ];
  return (
    <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
		<Navbar></Navbar>
          
		<MDBContainer className="h-100">
        	<MDBRow className="justify-content-center align-items-center h-100">
				{weatherData.map((data, index) => (
            	<WeatherWidget
            	  key={index}
            	  location={data.location}
            	  temp={data.temp}
            	  humid={data.humid}
            	  time={data.time}
            	  raining={data.raining}
            	/>))}
			</MDBRow>
		</MDBContainer>
	</section>
  );
}
