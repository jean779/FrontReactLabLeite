/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from 'axios';
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSoftUIController} from "context";
import { collapseIconBox } from "examples/Sidenav/styles/sidenavCollapse";


export const colors = {
  primary: ['#7928ca', '#ff0080'],
  secondary: ['#627594', '#a8b8d8'],
  info: ['#2152ff', '#21d4fd'],
  success: ['#17ad37', '#98ec2d'],
  warning: ['#f53939', '#fbcf33'],
  error: ['#ea0606', '#ff667c'],
  light: ['#ced4da', '#ebeff4'],
  dark: ['#141727', '#3a416f']
};

function Author({ image, name, email }) {
  const [controller, dispatch] = useSoftUIController();
  const { sidenavColor } = controller;
  const colorCode = sidenavColor && colors[sidenavColor] ? colors[sidenavColor][0] : '';

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <AccountCircleIcon fontSize="large" style={{ color: colorCode  }} />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}


function Function({ job, org }) {

  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

function AnaylisResult() {
  const [analysisResultstData, setAnalysisResultsData] = useState({});


  useEffect(() => {
    axios
      .get('http://localhost:8080/analysisResults')
      .then((response) => {
        setAnalysisResultsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const authorsTableData = {
    columnsAnalysisResult: [
      { name: "User", align: "left" },
      { name: "Empresa", align: "left" },
      { name: "Iniciada", align: "center" },
      { name: "Tipo do Leite", align: "left" },
      { name: "Produto", align: "left" },
      { name: "Espécie", align: "left" },
      { name: "Origem do Leite", align: "left" },
      { name: "Data De Coleta", align: "center" },
      { name: "Data De Entrega", align: "center" },
      { name: "action", align: "center" },
    ],
    
    rowsAnalysisResult:  analysisResultstData.length > 0 ? analysisResultstData.map((data) => ({
      
      User: <Author image={team2} name={data.sif} email="{ss" />,
       Empresa: <Function job="sss" org="sss" />,
     })): [
      {
        author: (
          <SoftTypography variant="caption" color="secondary">
            Sem resultado de análises encontradas
          </SoftTypography>
        ),
        function: null,
        status: null,
        employed: null,
        action: null,
      },
    ]};

  return authorsTableData;
}

export default AnaylisResult;


