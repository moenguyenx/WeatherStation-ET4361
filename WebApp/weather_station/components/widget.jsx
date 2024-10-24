import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";


export default function WeatherWidget({location, temp, feellikeTemp, humid, time, pm25, raining}) {
    const imgurl = raining === 1 ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu2.webp"
  return (
    <>
      <MDBCol md="8" lg="6" xl="4">
        <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
          <MDBCardBody className="p-4">
            <div className="d-flex">
              <MDBTypography tag="h6" className="flex-grow-1">
                {location}
              </MDBTypography>
              <MDBTypography tag="h6">{time}</MDBTypography>
            </div>
            <div className="d-flex flex-column text-center mt-5 mb-4">
              <MDBTypography
                tag="h6"
                className="display-4 mb-0 font-weight-bold"
                style={{ color: "#1C2331" }}
              >
                {" "}
                {temp}°C{" "}
              </MDBTypography>
              <span className="small" style={{ color: "#868B94" }}>
                {raining === 1 ? "Raining" : "Clear Sky"}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                <div className="ms-1">
                  <span>Humidity: {humid}% </span>
                </div>
                <div className="ms-1">
                  PM2.5:   <span >{pm25}</span> PPM 
                </div>
                <div className="ms-1">
                  <span>Feel like:  {feellikeTemp}°C </span>
                </div>
              </div>
              <div>
                <img
                  src={imgurl}
                  width="100px"
                />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </>
  );
}