import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import axios from 'axios';
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSoftUIController} from "context";
import SoftButton from "components/SoftButton";
import { formEdit, initOpenDialog, openDialog, setSamplingDateExport } from "..";
import StartIcon from '@mui/icons-material/Start';
import api from "services/api";
import { toast } from "react-toastify";
import TodayIcon from '@mui/icons-material/Today';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TextField } from "@mui/material";

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

function AuthorTableData() {
  const [analysisRequestData, setAnalysisRequestData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadingData, setRealoadingData] = useState(true);
  const [isSearch, setisSearch,] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);



  async function reloadData() {
    setRealoadingData(true);
  }

  async function setSearch(identification) {
    setisSearch(true);
    fetchDataSearch(identification);
  }

  async function startAnalysis(analysisRequestId){
    api
    .put(`/analysisRequest/start/${analysisRequestId}`)
    .then((response) => {
      toast.success("Requisição de Analise Iniciada.");
      console.log("sucesso")
      reloadData();
    })
    .catch((error) => {
      toast.error("Um erro ocorreu durante a Atualização", error);
      console.error("Error:", error);
    });
  }

  async function removeAnalysis(analysisRequestId){
    api
    .put(`/analysisRequest/delete/${analysisRequestId}`)
    .then((response) => {
      toast.success("Requisição de Analise Removida.");
      reloadData();
    })
    .catch((error) => {
      toast.error("Um erro ocorreu durante a Remoção", error);
      console.error("Error:", error);
    });
  }

  async function setSamplingDate(analysisRequestId, samplingDate) {
    api
    .put(`/analysisRequest/samplingDate/${analysisRequestId}`, { samplingDate })
    .then((response) => {
      toast.success("Data de coleda inserida.");
      reloadData();
    })
    .catch((error) => {
      toast.error("Um erro ocorreu durante a execução", error);
      console.error("Error:", error);
    });
  }

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await api.get('analysisRequest/actives')
      setAnalysisRequestData(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRealoadingData(false);
    }
  }

  async function fetchDataSearch(identification) {
    try {
      const { data } = await api.get(`/analysisRequest/identification/${identification}`)
      setAnalysisRequestData(data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRealoadingData(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [reloadingData]);

  const handleEditClick = (id) => {
    const item = analysisRequestData.find((data) => data._id === id);
    setSelectedItem(item);
    formEdit(item);
    setShowForm(true);
  }

  const initAction  =(id, isRemove) =>{
    const item = analysisRequestData.find((data) => data._id === id);
    setSelectedItem(item);
    if(isRemove) {
      initOpenDialog(item, isRemove);
    }else{
      initOpenDialog(item);
    }
    
  }

  const authorsTableData = {
    columns: [
      { name: "User", align: "left" },
      { name: "Identificação", align: "left" },
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
    
    rows:  analysisRequestData.length > 0 ? analysisRequestData.map((data) => ({
      Identificação:(
        <SoftTypography variant="caption" color="primary" fontWeight="larger">
          {data.identification}

        </SoftTypography>
      ),
      User: <Author image={team2} name={data.userId.name} email={data.userId.email} />,
       Empresa: <Function job={data.companyId.name} org={data.companyId.phone} />,
       Iniciada: (
        <SoftBox> 
            <SoftBadge variant="gradient" 
            badgeContent={data.isStartedAnalysis ? "sim" : "não"} 
            color={data.isStartedAnalysis ? "success" : "error"} 
            size="xs" container />
             {!data.isStartedAnalysis  && (           
                <IconButton size="large" color="dark" title="Iniciar Análise"  onClick={() =>  initAction(data._id, false)} >
                      <StartIcon />
                </IconButton>
             )}
        </SoftBox>
       ),
       "Produto": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.products}

        </SoftTypography>
      ),
      "Espécie": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.species}
        </SoftTypography>
      ),
      "Origem do Leite": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.originMilk}
        </SoftTypography>
      ),
       "Tipo do Leite": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.typeMilk}
        </SoftTypography>
      ),
       "Data De Coleta": (
         <SoftBox>
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {data.samplingDate}
          </SoftTypography>
          {data.samplingDate == "SEM DATA"  && (   
              <IconButton size="large" color="dark" title="Inserir data de coleta"  onClick={() => setSamplingDateExport(data._id)}>
                  <TodayIcon />
              </IconButton>
           )}
         </SoftBox>
       ),
       "Data De Entrega": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.deliveryDate}
        </SoftTypography>
      ),
       action: (
        <SoftBox>
          {!data.isStartedAnalysis  && (                       
              <IconButton size="large" color="dark" title="Iniciar Análise"   onClick={() => handleEditClick(data._id)} >
                    <EditIcon />
              </IconButton>
            )}
              <IconButton size="large" color="error" title="Remover Requisição Análise" onClick={() => initAction(data._id, true)} >
                    <DeleteIcon />
              </IconButton>
         </SoftBox>
       ),
     })): [
      {
        author: (
          <SoftTypography variant="caption" color="secondary">
            Sem requisições de análises encontradas
          </SoftTypography>
        ),
        function: null,
        status: null,
        employed: null,
        action: null,
      },
    ]};

  return { authorsTableData, loading, reloadData, setSearch, startAnalysis, removeAnalysis,setSamplingDate};
}

export default AuthorTableData;
