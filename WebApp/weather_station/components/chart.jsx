import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBTypography
  } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function LineChart({data, chartName})
{
  
  return (
    <MDBCol md="10" lg="8" xl="6">
            <MDBCard style={{ color: "#4B515D", borderRadius: "20px", width: "100%"}}>
              <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-center mb-2">
                    <MDBTypography tag="h6" className="flex-grow-1 text-center fw-bold">
                      {chartName}
                    </MDBTypography>
                  </div>
                  <div className="mb-2">
                    <Line data={data}/>
                  </div>    
              </MDBCardBody>
            </MDBCard>
    </MDBCol>
  )
};