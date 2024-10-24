"use client"
import React from "react";
import WeatherWidget from "@/components/widget";
import Navbar from "@/components/navbar";
import {
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBTypography,
  } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Home() {
  return (
    <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
		<Navbar></Navbar>
          
		<MDBContainer className="h-100">
        	<MDBRow className="justify-content-center align-items-center h-100">
				<WeatherWidget location="Long Bien" 
								temp={37}
								humid={90}
								raining={1}
								pm25={190}
								feellikeTemp={35}
								time="22:00"
								/>
				<WeatherWidget location="Hai Ba Trung" temp={38}></WeatherWidget>
				<WeatherWidget location="Ha Dong" temp={39}></WeatherWidget>
			</MDBRow>
		</MDBContainer>
	</section>
  );
}
